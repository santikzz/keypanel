<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionPlanController extends Controller
{

    public function index(): Response
    {   
        $user = Auth::user();
        $plan = $user->subscription()->get();

        return Inertia::render('Billing/Index', [
            'plan' => Inertia::defer(
                fn() => $plan
            ),
        ]);
    }
    
}
