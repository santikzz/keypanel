<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationRequest;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class ApplicationController extends Controller
{

    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();
        if (!$user->hasPermissionTo('APPS_READ')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        return Inertia::render('Applications/Index', [
            'applications' => Inertia::defer(
                fn() =>
                Application::with('owner')
                    ->where('owner_id', $user->real_owner_id)
                    ->get()
            ),
        ]);
    }

    public function show(Application $application): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to read applications
            and is the owner of the application.
        */
        if (!$user->hasPermissionTo('APPS_READ') || $application->owner_id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        return Inertia::render('Applications/Show', [
            'application' => Inertia::defer(
                fn() =>
                $application->load('owner')
            ),
            'licenses' => Inertia::defer(
                fn() => $application->licenses()->get()
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Applications/Create');
    }

    public function store(): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to create applications
        */
        if (!$user->hasPermissionTo('APPS_CREATE')) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        if (!$user->owner()->canCreateMoreApplications()) {
            return to_route('applications.index')->with('error', 'You have reached the maximum number of applications allowed.');
        }

        request()->validate([
            'name' => 'required|string',
            'status' => 'required|string',
            'download_url' => 'nullable|url',
        ]);

        $application = Application::create([
            'owner_id' => $user->real_owner_id,
            'app_hash_id' => bin2hex(random_bytes(8)),
            'app_secret' => bin2hex(random_bytes(32)),
            'name' => request('name'),
            'status' => request('status'),
            'download_url' => request('download_url'),
        ]);

        return to_route('applications.show', $application->id)
            ->with('success', 'Application created successfully.');
    }

    public function update(Request $request, Application $application): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to update applications
            and is the owner of the application.
        */
        if (!$user->hasPermissionTo('APPS_UPDATE') || $application->owner_id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $request->validate([
            'name' => 'required|string',
            'status' => 'required|string',
            'download_url' => 'nullable|url',
        ]);

        $application->update([
            'name' => request('name'),
            'status' => request('status'),
            'download_url' => request('download_url'),
        ]);

        return to_route('applications.show', $application->id)
            ->with('success', 'Application updated successfully.');
    }

    public function delete(Application $application): RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to delete applications
            and is the owner of the application.
        */
        if (!$user->hasPermissionTo('APPS_DELETE') || $application->owner_id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $application->delete();
        return to_route('applications.index')
            ->with('success', 'Application deleted successfully.');
    }

    public function renewSecret(Application $application): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->isOwner()) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $application->update([
            'app_secret' => bin2hex(random_bytes(32)),
        ]);

        return to_route('applications.show', $application->id)
            ->with('success', 'Application secret renewed successfully.');
    }
}
