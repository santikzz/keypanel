<?php

namespace App\Http\Controllers;

use App\Models\ResellerApp;
use App\Models\ResellerTimeType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ResellerTimeTypeController extends Controller
{

    public function store()
    {
        $user = Auth::user();

        /*
            Check if user has permission to update resellers.
        */
        if (!$user->hasPermissionTo('RESELLER_UPDATE')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        /*
            Validate the request data.
        */
        request()->validate([
            'reseller_app_id' => 'required|exists:reseller_apps,id',
            'name' => 'required|string',
            'duration_unit' => 'required|string',
            'duration_value' => 'required|numeric|gt:0',
            'cost' => 'required|numeric|gt:0',
        ]);


        /*
            Get the reseller/app relation and the reseller user.
        */
        $resellerApp = ResellerApp::find(request('reseller_app_id'));
        $reseller = User::find($resellerApp->user_id);

        /*
            If the reseller nor the reseller/app relation exists, or if the reseller is not owned by the user, return an error.
        */
        if (!$reseller || !$resellerApp || $reseller->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        $duration = LicenseController::calculateDuration(request('duration_unit'), request('duration_value'));
        $isLifetime = request('duration_unit') == 'lifetime';

        ResellerTimeType::create([
            'reseller_app_id' => request('reseller_app_id'),
            'name' => request('name'),
            'duration' => $duration,
            'lifetime' => $isLifetime,
            'cost' => request('cost'),
        ]);

        return to_route('users.showReseller', $reseller->id)
            ->with('success', 'Relation created successfully.');
    }

    public function delete(ResellerTimeType $resellerTimeType): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->hasPermissionTo('RESELLER_UPDATE') || $resellerTimeType->resellerApp->user->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        $resellerTimeType->delete();

        return to_route('users.showReseller', $resellerTimeType->resellerApp->user->id)
            ->with('success', 'Relation deleted successfully.');
            
    }
}
