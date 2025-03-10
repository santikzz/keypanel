<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class UserSubscriptionController extends Controller
{
    public function redirectToPatreon()
    {
        return Socialite::driver('patreon')
            ->scopes(['identity', 'campaigns', 'pledges-to-me'])
            ->redirect();
    }

    public function handlePatreonCallback()
    {
        $user = Auth::user();
        $patreonUser = Socialite::driver('patreon')->user();

        $user->update([
            'patreon_id' => $patreonUser->id,
            'patreon_access_token' => $patreonUser->token,
            'patreon_refresh_token' => $patreonUser->refreshToken,
            'patreon_expires_at' => now()->addSeconds($patreonUser->expiresIn)
        ]);

        return redirect()->route('account.billing');
    }
}
