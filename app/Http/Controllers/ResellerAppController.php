<?php

namespace App\Http\Controllers;

use App\Models\ResellerApp;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResellerAppController extends Controller
{

    public function store(): RedirectResponse
    {
        $user = Auth::user();

        $reseller = User::where('owner_id', $user->real_owner_id)->find(request('user_id'));

        /*
            Check if user has permission to update resellers.
        */
        if (!$reseller || !$user->hasPermissionTo('RESELLER_UPDATE')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        /*
            Validate the request data.
        */
        request()->validate([
            'app_id' => 'required|exists:applications,id',
            'user_id' => 'required|exists:users,id',
        ]);

        /*
            Check if a relation already exists.
            maybe add a unique constraint to the database ?
        */
        $alreadyExists = ResellerApp::where('app_id', request('app_id'))->where('user_id', $reseller->id)->exists();
        if ($alreadyExists) {
            return to_route('users.showReseller', $reseller->id)
                ->with('error', 'Relation already exists.');
        }

        /*
        Create the reseller/application relation
       */
        ResellerApp::create([
            'user_id' => $reseller->id,
            'app_id' => request('app_id'),
        ]);

        return to_route('users.showReseller', $reseller->id)
            ->with('success', 'Relation created successfully.');
    }

    public function delete(ResellerApp $resellerApp): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('RESELLER_UPDATE') || $resellerApp->user->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        $userId = $resellerApp->user_id;
        $resellerApp->delete();

        return to_route('users.showReseller', $userId)
            ->with('success', 'Relation deleted successfully.');
    }
}
