<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PatreonWebhookController extends Controller
{

    public function handle(Request $request)
    {

        try {



            // verify the patreon signature
            $signature = $request->header('X-Patreon-Signature');

            Log::channel('stack')->info('Patreon webhook received', ['signature' => $signature]);

            if (!$this->verifyWebhookSignature($request->getContent(), $signature)) {
                return response()->json(['error' => 'Invalid signature'], 403);
            }

            Log::channel('stack')->info('Patreon webhook verified');

            $payload = $request->all();
            $event = $payload['data']['type'];

            Log::channel('stack')->info('Patreon webhook event', ['event' => $event]);

            $pledgeAmountCents = $payload['data']['attributes']['amount_cents'] ?? 0;
            $patronId = $payload['data']['relationships']['patron']['data']['id'];

            Log::channel('stack')->info('Cents pledged', ['cents' => $pledgeAmountCents]);
            Log::channel('stack')->info('Patreon webhook patron', ['patronId' => $patronId]);

            $response = Http::withHeaders(['Authorization' => 'Bearer ' . env('PATREON_API_ACCESS_TOKEN')])
                ->get("https://www.patreon.com/api/oauth2/v2/user/$patronId", ['fields[user]' => 'email'])->json();
            $patronEmail = $response['data']['attributes']['email'] ?? null;

            Log::channel('stack')->info('Patreon webhook patron email', ['email' => $patronEmail]);

            if ($patronEmail) {
                // find the user by email
                $user = User::where('email', $patronEmail)->first();

                if ($user) {
                    // asign plan based on pledge amount
                    if ($event === 'pledges:create' || $event === 'pledges:update') {

                        $plan = $this->getPlanFromPledgeAmount($pledgeAmountCents);
                        $user->subscribeToPlan($plan);

                        // downgrade to free plan on cancellation
                    } elseif ($event === 'pledges:delete') {
                        $user->assignFreePlan();
                    }

                    $user->save();
                }
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json(['status' => 'ok']);
    }

    private function getPlanFromPledgeAmount($amountCents)
    {
        return SubscriptionPlan::where('price', $amountCents / 100)->first();
    }

    private function verifyWebhookSignature($payload, $signature)
    {
        $secret = env('PATREON_WEBHOOK_SECRET');
        $hash = hash_hmac('md5', $payload, $secret);
        return $hash === $signature;
    }
}
