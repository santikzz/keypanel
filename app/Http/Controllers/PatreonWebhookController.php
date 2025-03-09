<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PatreonWebhookController extends Controller
{

    public function handle(Request $request)
    {

        // verify the patreon signature
        $signature = $request->header('X-Patreon-Signature');
        if (!$this->verifyWebhookSignature($request->getContent(), $signature)) {
            return response()->json(['error' => 'Invalid signature'], 403);
        }

        $payload = $request->all();
        $event = $payload['data']['type'];
        
        $pledgeAmountCents = $payload['data']['attributes']['amount_cents'] ?? 0;
        $patronId = $payload['data']['relationships']['patron']['data']['id'];

        $response = Http::withHeaders(['Authorization' => 'Bearer ' . env('PATREON_API_ACCESS_TOKEN')])
            ->get("https://www.patreon.com/api/oauth2/v2/user/$patronId", ['fields[user]' => 'email'])->json();
        $patronEmail = $response['data']['attributes']['email'] ?? null;

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
