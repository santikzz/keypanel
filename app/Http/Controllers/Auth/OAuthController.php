<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\UserController;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->user();

        $user = User::updateOrCreate(
            ['email' => $socialUser->getEmail()],
            [
                'name' => UserController::parseUsername($socialUser->getName() ?? $socialUser->getNickname()),
                'password' => Hash::make(uniqid()), // Random password (not used)
                'role' => 'owner', // Default role
            ]
        );

        /*
            Assign the owner role to the user.
        */
        $user->assignRole('owner');

        /*
            Set the subscription plan to the Free tier
        */
        $user->assignFreePlan();

        Auth::login($user);

        return redirect('/dashboard');
    }
}
