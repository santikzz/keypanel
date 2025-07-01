<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\UserController;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    /*
        socialite se encarga de manejar la autenticacion con proveedores externos
    */
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /*
        este callback logea y/o registra al usuario que se
        ha autenticado con un proveedor externo (Google, Discord, etc.).
    */
    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->user(); // datos del usuario autenticado con el proveedor

        $user = User::where('email', $socialUser->getEmail())->first(); // busco si existe usuario con ese email

        // si el usuario no existe, lo creo
        // si ya existe, lo logeo directamente
        if (!$user) {

            $user = User::updateOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name' => $socialUser->getName() ?? $socialUser->getNickname(), // obtengo el nombre o nickname del usuario
                    'password' => Hash::make(uniqid()), // password aleatoria (no se usa)
                    // 'role' => 'owner',
                    // 'plan_id' => SubscriptionPlan::getFreePlan()->id
                ]
            );

            // $user->assignRole('owner');
        }

        // logeo al usuario existente o recién creado
        Auth::login($user);
        return redirect('/dashboard');
    }


}
