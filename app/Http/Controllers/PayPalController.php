<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{

    private $API_URL;
    private $CLIENT_ID;
    private $CLIENT_SECRET;

    public function __construct()
    {
        $this->API_URL = config('paypal.' . config('paypal.mode') . '.url');
        $this->CLIENT_ID = config('paypal.' . config('paypal.mode') . '.client_id');
        $this->CLIENT_SECRET = config('paypal.' . config('paypal.mode') . '.client_secret');
    }

    public function index()
    {
        $pp_products = $this->getProducts();
        $pp_plans = $this->getPlans();
        // $pp_products = [];
        // $pp_plans = [];
        $plans = SubscriptionPlan::where('is_free', false)->get();

        return Inertia::render('PayPal/Index', [
            'pp_products' => Inertia::defer(
                fn() => $pp_products
            ),
            'pp_plans' => Inertia::defer(
                fn() => $pp_plans
            ),
            'plans' => Inertia::defer(
                fn() => $plans
            ),
        ]);
    }

    public function getProducts()
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])->get($this->API_URL . '/v1/catalogs/products');
        return $response->json();
    }

    public function getPlans()
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])->get($this->API_URL . '/v1/billing/plans');
        return $response->json();
    }

    public function createProduct(Request $request)
    {
        $user = Auth::user();
        $data = $request->all();

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])->post($this->API_URL . '/v1/catalogs/products', $data);

        if ($response->successful()) {
            return redirect()->route('paypal.index')->with('success', 'Product created successfully.');
        }
        return back()->withErrors(['error' => 'Failed to create product.']);
    }

    public function createPlan(Request $request)
    {
        $data = $request->all();

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])->post($this->API_URL . '/v1/billing/plans', $data);

        // return $response->json()['id']; // Return the PayPal plan ID

        if ($response->successful()) {
            return redirect()->route('paypal.index')->with('success', 'Plan created successfully.');
        }
        return back()->withErrors(['error' => 'Failed to create plan.']);
    }

    public function subscribe(Request $request)
    {
        $user = Auth::user();
        $plan = SubscriptionPlan::findOrFail(request('plan_id'));

        Log::info($request);
        Log::info('plan id: ' . request('plan_id'));
        Log::info('plan: ' . $plan);

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->getPayPalAccessToken(),
        ])
            ->post($this->API_URL . '/v1/billing/subscriptions', [
                'plan_id' => $plan->paypal_plan_id,
                'start_time' => now()->addMinutes(30)->toIso8601String(),
                'subscriber' => [
                    'email_address' => $user->email,
                ],
                'application_context' => [
                    'return_url' => route('billing.index'),
                    'cancel_url' => route('billing.index'),
                ],
            ]);

        // ============ REQUEST ============
        // {
        //     "plan_id": "P-5ML4271244454362WXNWU5NQ",
        //     "start_time": "2025-11-11T00:00:00Z",
        //     "subscriber": {
        //       "email_address": "customer@example.com"
        //     },
        //     "application_context": {
        //       "brand_name": "keycore",
        //       "return_url": "https://example.com/returnUrl",
        //       "cancel_url": "https://example.com/cancelUrl"
        //     }
        //   }

        // ============ RESPONSE ============
        // {
        //     "status": "APPROVAL_PENDING",
        //     "id": "I-37FWBT6U05LU",
        //     "create_time": "2025-03-12T18:18:33Z",
        //     "links": [
        //       {
        //         "href": "https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=BA-3JS71114TF809332K",
        //         "rel": "approve",
        //         "method": "GET"
        //       },
        //       {
        //         "href": "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-37FWBT6U05LU",
        //         "rel": "edit",
        //         "method": "PATCH"
        //       },
        //       {
        //         "href": "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-37FWBT6U05LU",
        //         "rel": "self",
        //         "method": "GET"
        //       }
        //     ]
        //   }

        // PAYMENT APPROVE
        // returnUrl? subscription_id=I-37FWBT6U05LU &ba_token=BA-3JS71114TF809332K &token=2C126125X9437240T

        $subscription = $response->json();

        Log::info($subscription);

        $user->update([
            'pending_plan_id' => $plan->id,
            'paypal_subscription_id' => $subscription['id'],
            // 'subscription_ends_at' => $this->getPeriod($plan->billing_interval, $plan->interval_count),
        ]);

        $approvalUrl = $subscription['links'][0]['href'];
        redirect()->route('billing.index')->with('approval_url', $approvalUrl);
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

        Log::info('==== PAYPAL WEBHOOK =================================================================================================================================');
        Log::info($event);

        /*
            If the event is a payment completed event, we extend the user's subscription end date
        */
        if ($event['event_type'] === 'PAYMENT.SALE.COMPLETED') {
            $user = User::where('paypal_subscription_id', $event['resource']['billing_agreement_id'])->first();
            if ($user) {
                $user->update([
                    'plan_id' => $user->pending_plan_id,
                    'pending_plan_id' => null,
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
