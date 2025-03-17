<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaddleController extends Controller
{
    public function subscribe(Request $request)
    {
        $checkout = $request->user()->checkout('pri_01jphtdhjw2tj408kzvgn5yybp')
            ->returnTo(route('dashboard'));

        return view('paddle-checkout', ['checkout' => $checkout]);
    }

    public function webhook(Request $request)
    {
        Log::info('===================== Paddle Webhook =====================');
        Log::info($request);
    }
}
