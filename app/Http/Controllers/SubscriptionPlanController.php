<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
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

    // public function create(Request $request): RedirectResponse
    // {
    //     $user = Auth::user();
    //     SubscriptionPlan::create($request->all());
    //     return redirect()->route('paypal.index');
    // }

    // public function update(Request $request, SubscriptionPlan $plan): RedirectResponse
    // {
    //     $user = Auth::user();
    //     $plan->update($request->all());
    //     return redirect()->route('paypal.index');
    // }

    // public function delete(SubscriptionPlan $plan): RedirectResponse
    // {
    //     $user = Auth::user();
    //     $plan->delete();
    //     return redirect()->route('paypal.index');
    // }


}
