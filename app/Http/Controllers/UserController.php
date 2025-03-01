<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
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
    private function parseUsername($string)
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

        $reseller->load('licenses', 'licenses.application');

        return Inertia::render('Users/Reseller/Show', [
            'reseller' => Inertia::defer(fn() => $reseller)
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
        if (!$user->hasPermissionTo('MANAGER_UPDATE') || $manager->owner_id !== $user->real_owner_id) {
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

        return to_route('users.show', $manager->id)
            ->with('success', 'Manager updated successfully.');
    }

    public function updateReseller(Request $request, User $reseller): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update resellers
            and is the owner of the reseller.
        */
        if (!$user->hasPermissionTo('RESELLER_UPDATE') || $reseller->owner_id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        // allowed fields to be updated
        $allowedFields = ['password', 'disabled'];

        $validated = request()->validate([
            'password' => 'sometimes|string|min:8|max:64',
            'disabled' => 'sometimes|boolean'
        ]);

        // update only allowed and present fields in the request
        $reseller->update(array_intersect_key($validated, array_flip($allowedFields)));

        return to_route('users.show', $reseller->id)
            ->with('success', 'Reseller updated successfully.');
    }

    public function delete(User $_user): RedirectResponse
    {
        $user = Auth::user();
        /*
            If the user role is a manager, check if the user has permissions to delete managers
            and is the owner of the manager
        */
        if ($_user->role === 'manager') {
            if (!$user->hasPermissionTo('MANAGERS_DELETE') || $_user->owner_id !== $user->real_owner_id || $_user->id === $user->id) {
                return to_route('dashboard')->with('error', 'Not allowed.');
            }
            $_user->delete();
            return to_route('users.index')->with('success', 'Manager deleted successfully.');
        }

        /*
            If the user role is a reseller, check if the user has permissions to delete resellers
            and is the owner of the reseller
        */
        if ($_user->role === 'reseller') {
            if (!$user->hasPermissionTo('RESELLER_DELETE') || $_user->owner_id !== $user->real_owner_id) {
                return to_route('dashboard')->with('error', 'Not allowed.');
            }
            $_user->delete();
            return to_route('users.index')->with('success', 'Reseller deleted successfully.');
        }
    }
}
