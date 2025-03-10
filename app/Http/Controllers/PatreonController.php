<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PatreonController extends Controller
{

    private function verifyWebhookSignature($payload, $signature)
    {
        $secret = config('services.patreon.webhook_secret');
        $computed = hash_hmac('sha256', $payload, $secret);
        return hash_equals($signature, $computed);
    }

    private function getPlanFromPledgeAmount($amountCents)
    {
        return SubscriptionPlan::where('patreon_cents', $amountCents)
            ->firstOrFail();
        // ->orWhereHas('tiers', fn($q) => $q->where('cents_amount', $amountCents))
    }

    public function handle(Request $request)
    {
        try {
            // verify the patreon signature
            $signature = $request->header('X-Patreon-Signature');

            if (!$this->verifyWebhookSignature($request->getContent(), $signature)) {
                return response()->json(['error' => 'Invalid signature'], 403);
            }

            Log::info('Patreon webhook verified');

            $payload = $request->all();
            $event = $payload['data']['type'];

            Log::info('Patreon webhook event', ['event' => $event]);

            $pledgeAmountCents = $payload['data']['attributes']['amount_cents'] ?? 0;
            $patronId = $payload['data']['relationships']['patron']['data']['id'];

            Log::info('Cents pledged', ['cents' => $pledgeAmountCents]);
            Log::info('Patreon webhook patron', ['patronId' => $patronId]);

            $user = User::where('patreon_id', $patronId)->first();

            if ($user) {
                // asign plan based on pledge amount
                if ($event === 'pledges:create' || $event === 'pledges:update') {

                    $plan = $this->getPlanFromPledgeAmount($pledgeAmountCents);

                    $user->update([
                        'plan_id' => $plan->id,
                        'patreon_expires_at' => now()->addMonth()
                    ]);

                    // downgrade to free plan on cancellation
                } elseif ($event === 'pledges:delete') {

                    $user->update([
                        'plan_id' => SubscriptionPlan::getFreePlan()->id,
                        'patreon_expires_at' => null
                    ]);
                }

                $user->save();
            }
            
        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }

        return response()->json(['status' => 'ok']);
    }
}
