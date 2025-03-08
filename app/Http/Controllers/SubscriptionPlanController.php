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
        $plans = SubscriptionPlan::get();

        return Inertia::render('Subscriptions/Index', [
            'plans' => Inertia::defer(
                fn() => $plans
            ),
        ]);
    }
    
}
