<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
use App\Models\BalanceTransaction;
use App\Models\ResellerApp;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /*
        Converts any string to lowercase alphanumeric without spaces
    */
    public static function parseUsername($string)
    {
        return strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $string));
    }

    /*
        Index page for managers and resellers.
        Loads the owner's manager and resellers to display in a single page separeted with tabs.
    */
    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();

        $managers = [];
        $resellers = [];

        // if the user has permission to read managers, load all managers
        if ($user->hasPermissionTo('MANAGER_READ')) {
            $managers = User::where('owner_id', $user->real_owner_id)
                ->where('role', 'manager')
                ->get();
        }

        // if the user has permission to read resellers, load all resellers
        if ($user->hasPermissionTo('RESELLER_READ')) {
            $resellers = User::where('owner_id', $user->real_owner_id)
                ->where('role', 'reseller')
                ->get();
        }

        return Inertia::render('Users/Index', [
            'managers' => Inertia::defer(fn() => $managers),
            'resellers' => Inertia::defer(fn() =>  $resellers),
        ]);
    }

    public function showManager(User $manager): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to read managers
        */
        if (!$user->hasPermissionTo('MANAGER_READ') || $manager->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }
        return Inertia::render('Users/Manager/Show', [
            'manager' => Inertia::defer(fn() => $manager),
        ]);
    }

    public function showReseller(User $reseller): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to read resellers
        */
        if (!$user->hasPermissionTo('RESELLER_READ') || $reseller->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        $reseller->load([
            'licenses',
            'licenses.application',
            'transactions' => fn($query) => $query->orderBy('created_at', 'desc')
        ]);

        $applications = Application::where('owner_id', $user->real_owner_id)->get();

        $resellerApps = ResellerApp::where('user_id', $reseller->id)
            ->with('app', 'timeTypes')
            ->get();

        return Inertia::render('Users/Reseller/Show', [
            'reseller' => Inertia::defer(fn() => $reseller),
            'resellerApps' => Inertia::defer(fn() => $resellerApps),
            'applications' => Inertia::lazy(fn() => $applications),
        ]);
    }

    public function storeManager(): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to create managers
        */
        if (!$user->hasPermissionTo('MANAGER_CREATE')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        if (!$user->owner()->canCreateMoreManagers()) {
            return to_route('applications.index')->with('error', 'You have reached the maximum number of managers allowed.');
        }

        request()->validate([
            'name' => 'required|string|min:6|max:24',
            'password' => 'required|string|min:8|max:64',
            'permissions' => 'sometimes|array',
        ]);

        // get only valid permissions
        $validPermissions = Permission::whereIn('name', request('permissions', []))->pluck('name')->toArray();

        // create user
        $manager = User::create([
            'name' => $this->parseUsername(request('name')),
            'password' => request('password'),
            'role' => 'manager',
            'owner_id' => $user->real_owner_id,
        ]);

        // assign permissions
        $manager->givePermissionTo($validPermissions);

        return to_route('users.showManager', $manager->id)
            ->with('success', 'Manager created successfully.');
    }

    public function storeReseller(): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to create resellers
        */
        if (!$user->hasPermissionTo('RESELLER_CREATE')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        if (!$user->owner()->canCreateMoreResellers()) {
            return to_route('applications.index')->with('error', 'You have reached the maximum number of resellers allowed.');
        }

        request()->validate([
            'name' => 'required|string|min:6|max:24',
            'password' => 'required|string|min:8|max:64',
        ]);

        $permissions = ['KEYS_READ', 'KEYS_CREATE', 'KEYS_UPDATE', 'KEYS_DELETE', 'KEYS_RESET_HWID'];

        // create user
        $reseller = User::create([
            'name' => $this->parseUsername(request('name')),
            'password' => request('password'),
            'role' => 'reseller',
            'owner_id' => $user->real_owner_id,
        ]);

        // assign permissions
        $reseller->givePermissionTo($permissions);

        return to_route('users.showReseller', $reseller->id)
            ->with('success', 'Reseller created successfully.');
    }

    public function updateManager(Request $request, User $manager): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update managers
            and is the owner of the manager.
        */
        if (!$user->hasPermissionTo('MANAGER_UPDATE') || $manager->owner_id !== $user->real_owner_id || !$manager->isManager()) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        /*
            Check if the user is trying to update itself.
            (May attempt to update their permissions abusing IDOR)
        */
        if ($manager->id === $user->id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        // allowed fields to be updated
        $allowedFields = ['password', 'disabled'];

        $validated = request()->validate([
            'password' => 'sometimes|string|min:8|max:64',
            'permissions' => 'sometimes|array',
            'disabled' => 'sometimes|boolean'
        ]);

        // update only allowed and present fields in the request
        $manager->update(array_intersect_key($validated, array_flip($allowedFields)));

        // update permissions if provided
        if (isset($validated['permissions'])) {
            $validPermissions = Permission::whereIn('name', $validated['permissions'])->pluck('name')->toArray();
            $manager->syncPermissions($validPermissions);
        }

        return to_route('users.showManager', $manager->id)
            ->with('success', 'Manager updated successfully.');
    }

    public function updateReseller(Request $request, User $reseller): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update resellers
            and is the owner of the reseller.
        */
        if (!$user->hasPermissionTo('RESELLER_UPDATE') || $reseller->owner_id !== $user->real_owner_id || !$reseller->isReseller()) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        // allowed fields to be updated
        $allowedFields = ['password', 'disabled'];

        $validated = request()->validate([
            'password' => 'sometimes|string|min:8|max:64',
            'disabled' => 'sometimes|boolean',
        ]);

        // update only allowed and present fields in the request
        $reseller->update(array_intersect_key($validated, array_flip($allowedFields)));

        return to_route('users.showReseller', $reseller->id)
            ->with('success', 'Reseller updated successfully.');
    }

    public function delete(User $user): Response|RedirectResponse
    {
        // idk i named the request user and the auth user the same im dumb

        $authUser = Auth::user();
        /*
            If the user role is a manager, check if the user has permissions to delete managers
            and is the owner of the manager
        */
        if ($user->role === 'manager') {
            if (!$authUser->hasPermissionTo('MANAGER_DELETE') || $user->owner_id !== $authUser->real_owner_id || $user->id === $authUser->id) {
                return to_route('dashboard')->with('error', 'Not allowed.');
            }
            $user->delete();
            return to_route('users.index')->with('success', 'Manager deleted successfully.');
        }

        /*
            If the user role is a reseller, check if the user has permissions to delete resellers
            and is the owner of the reseller
        */
        if ($user->role === 'reseller') {
            if (!$authUser->hasPermissionTo('RESELLER_DELETE') || $user->owner_id !== $authUser->real_owner_id) {
                return to_route('dashboard')->with('error', 'Not allowed.');
            }
            $user->delete();
            return to_route('users.index')->with('success', 'Reseller deleted successfully.');
        }

        return to_route('users.index');
    }

    public function setBalance(Request $request, User $reseller): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update resellers
            and is the owner of the reseller.
        */
        if (!$user->hasPermissionTo('RESELLER_ADD_BALANCE') || $reseller->owner_id !== $user->real_owner_id || !$reseller->isReseller()) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $validated = request()->validate(['balance' => 'required|numeric|min:0']);

        $reseller->update(['balance' => $validated['balance']]);

        //create a balance set type transaction
        BalanceTransaction::create([
            'user_id' => $reseller->id,
            'type' => 'set',
            'amount' => $validated['balance'],
            'total' => $validated['balance'],
            'description' => 'Set balance',
        ]);

        return to_route('users.showReseller', $reseller->id)->with('success', 'Balance updated successfully.');
    }

    public function addBalance(Request $request, User $reseller): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update resellers
            and is the owner of the reseller.
        */
        if (!$user->hasPermissionTo('RESELLER_ADD_BALANCE') || $reseller->owner_id !== $user->real_owner_id || !$reseller->isReseller()) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $validated = request()->validate(['balance' => 'required|numeric|gt:0']);

        $newBalance = $reseller->balance + $validated['balance'];

        $reseller->update(['balance' => $reseller->balance + $validated['balance']]);

        //create a balance credit type transaction
        BalanceTransaction::create([
            'user_id' => $reseller->id,
            'type' => 'credit',
            'amount' => $validated['balance'],
            'total' => $newBalance,
            'description' => 'Added balance',
        ]);

        return to_route('users.showReseller', $reseller->id)->with('success', 'Balance added successfully.');
    }
}
