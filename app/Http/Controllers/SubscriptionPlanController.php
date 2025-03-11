<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;

class SubscriptionPlanController extends Controller
{

    public function index(): Response
    {
        $user = Auth::user();
        $plans = SubscriptionPlan::all();

        return Inertia::render('Billing/Index', [
            'plans' => Inertia::defer(
                fn() => $plans
            ),
        ]);
    }

    public function createPayPalPlan(SubscriptionPlan $plan)
    {

        $accessToken = $this->getPayPalAccessToken();
        $apiUrl = config('paypal.' . config('paypal.mode') . '.url');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $accessToken,
        ])->post($apiUrl . '/v1/billing/plans', [
            'product_id' => config('paypal.' . config('paypal.mode') . '.product_id'),
            'name' => $plan->name,
            'description' => $plan->name,
            'billing_cycles' => [
                [
                    'frequency' => [
                        'interval_unit' => strtoupper($plan->billing_interval), // MONTH, YEAR, etc.
                        'interval_count' => $plan->interval_count,
                    ],
                    'tenure_type' => 'REGULAR',
                    'sequence' => 1,
                    'total_cycles' => 0, // 0 for infinite
                    'pricing_scheme' => [
                        'fixed_price' => [
                            'value' => $plan->price,
                            'currency_code' => 'USD',
                        ],
                    ],
                ],
            ],
            'payment_preferences' => [
                'auto_bill_outstanding' => true,
                'setup_fee' => [
                    'value' => '0',
                    'currency_code' => 'USD',
                ],
                'setup_fee_failure_action' => 'CONTINUE',
                'payment_failure_threshold' => 3,
            ],
        ]);

        if ($response->successful()) {
            return $response->json()['id']; // Return the PayPal plan ID
        }
        return null;
    }

    public function subscribe(Request $request)
    {

        $user = Auth::user();
        $plan = SubscriptionPlan::findOrFail($request->plan_id)->first();
        $apiUrl = config('paypal.' . config('paypal.mode') . '.url');

        $paypalPlanId = $this->createPayPalPlan($plan);

        if (!$paypalPlanId) {
            return back()->withErrors(['error' => 'Failed to create PayPal plan.']);
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])
            ->post($apiUrl . '/v1/billing/subscriptions', [
                'plan_id' => $paypalPlanId,
                'start_time' => now()->addMinutes(5)->toIso8601String(),
                'subscriber' => [
                    'email_address' => $user->email,
                ],
                'application_context' => [
                    'return_url' => route('billing.index'),
                    'cancel_url' => route('billing.index'),
                ],
            ]);

        $subscription = $response->json();

        $user->update([
            'plan_id' => $plan->id,
            'paypal_subscription_id' => $subscription['id'],
            'subscription_ends_at' => $this->getPeriod($plan->billing_interval, $plan->interval_count),
        ]);

        $approvalUrl = collect($subscription['links'])->firstWhere('rel', 'approve')['href'];
        return redirect()->away($approvalUrl);
    }

    public function getPeriod(string $billingInterval, int $intervalCount)
    {
        $time = now();
        switch ($billingInterval) {
            case 'month':
                $time->addMonths($intervalCount);
                break;
            case 'year':
                $time->addYears($intervalCount);
                break;
            case 'week':
                $time->addWeeks($intervalCount);
                break;
            case 'day':
                $time->addDays($intervalCount);
                break;
        }
        return $time;
    }

    public function handleWebhook(Request $request)
    {
        $event = $request->all();

        /*
            If the event is a payment completed event, we extend the user's subscription end date
        */
        if ($event['event_type'] === 'PAYMENT.SALE.COMPLETED') {
            $user = User::where('paypal_subscription_id', $event['resource']['billing_agreement_id'])->first();
            if ($user) {
                $user->update([
                    'subscription_ends_at' => $this->getPeriod($user->plan->billing_interval, $user->plan->interval_count),
                ]);
            }
        }

        /*
            If the event is a subscription cancelled event, we delete the user's subscription id
        */
        if ($event['event_type'] === 'BILLING.SUBSCRIPTION.CANCELLED') {
            $user = User::where('paypal_subscription_id', $event['resource']['id'])->first();
            if ($user) {
                $user->update([
                    'paypal_subscription_id' => null,
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }

    private function getPayPalAccessToken()
    {
        $clientId = config('paypal.' . config('paypal.mode') . '.client_id');
        $clientSecret = config('paypal.' . config('paypal.mode') . '.client_secret');
        $apiUrl = config('paypal.' . config('paypal.mode') . '.url');

        $response = Http::withBasicAuth($clientId, $clientSecret)
            ->asForm()
            ->post($apiUrl . '/v1/oauth2/token', [
                'grant_type' => 'client_credentials',
            ]);
        return $response->json()['access_token'];
    }
}
