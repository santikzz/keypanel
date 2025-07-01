<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PaddleController extends Controller
{
    public function subscribe(Request $request)
    {
        $user = Auth::user();
        // $user = $request->user();
        $paddlePriceId = $request->input('paddlePriceId');

        $checkout = $request->user()
            // ->subscribe('pri_01jphtdhjw2tj408kzvgn5yybp', 'default')
            ->subscribe($paddlePriceId, 'default')
            ->customData(['user_id' => $user->id])
            ->returnTo(route('dashboard'));

        // Store the paddle_id in the database
        // $user->paddle_customer_id = $paddleId;
        // $user->save();

        // var_dump($user->subssubscribedToPricecribed('pri_01jphtdhjw2tj408kzvgn5yybp'));

        return view('paddle-checkout', ['checkout' => $checkout]);
    }

    public function webhook(Request $request)
    {
        Log::info('############## Paddle Webhook ##############');
        Log::info(json_encode($request->all()));

        if ($request->event_type == 'subscription.activated') {

            // $subscriptionId = $request['data']['id'];
            $priceId = $request['data']['items'][0]['price']['id'];
            $userId = $request['data']['custom_data']['user_id'];
            $nextBill = $request['data']['next_billed_at'];

            $plan = SubscriptionPlan::where('paddle_price_id', '=', $priceId)->get();
            $user = User::find($userId);

            Log::info($plan);
            Log::info($user);

            $user->update([
                'plan_id' => $plan[0]['id'],
                'paddle_json' => json_encode($request->all()),
                'plan_ends_at' => $nextBill
            ]);

            // Log::info($data);
        }

        if ($request->alert_name == 'subscription_payment_succeeded') {



        }
    }
}
