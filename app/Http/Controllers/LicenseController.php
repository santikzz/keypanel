<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\License;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class LicenseController extends Controller
{

    private $DURATION_UNITS = [
        'hours' => 1,           // 1 hour
        'days' => 24,           // 24 hours in a day
        'weeks' => 168,         // 168 hours in a week
        'months' => 720,        // 720 hours in a month
        'years' => 8760,        // 8760 hours in a year
        'lifetime' => 0,        // lifetime
    ];

    private function generateKey(): string
    {
        $key = bin2hex(random_bytes(24));
        return $key;
    }

    private function calculateDuration(string $unit, int $value): int
    {
        return $this->DURATION_UNITS[$unit] * $value * 3600;
    }

    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();
        if (!$user->hasPermissionTo('KEYS_READ')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        return Inertia::render('Licenses/Index', [
            'licenses' => Inertia::defer(
                fn() =>
                License::with('application:id,name', 'issuer:id,name')
                    ->whereHas('application', function ($query) use ($user) {
                        $query->where('owner_id', $user->real_owner_id);
                    })->get(),
            ),
            'applications' => Inertia::defer(
                fn() =>
                Application::where('owner_id', $user->real_owner_id)
                    ->get(['id', 'name'])
            )
        ]);
    }

    public function show(License $license): Response|RedirectResponse
    {
        $user = Auth::user();
        /*
            Check if the user has permissions to read licenses
            and is the owner of the license.
        */
        $license->load('application', 'application.owner', 'issuer');

        if (!$user->hasPermissionTo('KEYS_READ') || $license->application->owner->id !== $user->real_owner_id) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        return Inertia::render('Licenses/Show', [
            'license' => Inertia::defer(fn() => $license),
        ]);
    }

    public function store(): Response|RedirectResponse
    {
        $user = Auth::user();

        request()->validate([
            'app_id' => 'required|numeric',
            'duration_unit' => 'required|string|in:hours,days,weeks,months,years,lifetime',
            'duration_value' => 'required|numeric|min:1',
            'note' => 'nullable|string',
            'is_bulk' => 'nullable|boolean',
            'bulk_amount' => 'nullable|numeric',
        ]);

        $application = Application::with('owner')->where('id', request('app_id'))->first();

        /*
            Check if the user has permissions to create applications
        */
        if (!$user->hasPermissionTo('KEYS_CREATE') || $application->owner->id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $duration = $this->calculateDuration(request('duration_unit'), request('duration_value'));
        $isLifetime = request('duration_unit') == 'lifetime';

        /*
            If it's a bulk create, create all keys then return a json with the keys to
            display them in a modal to easy copy to clipboard
        */
        if (request('is_bulk') === true) {

            $createdLicenses = [];
            $bulkAmount = request('bulk_amount') ?? 1;

            for ($i = 0; $i < $bulkAmount; $i++) {
                $licenseKey = $this->generateKey();
                $license = License::create([
                    'app_id' => request('app_id'),
                    'license_key' => $licenseKey,
                    'duration' => $duration,
                    'lifetime' => $isLifetime,
                    'issued_by' => $user->id,
                    'note' => request('note'),
                ]);
                $createdLicenses[] = $license;
            }

            $application = Application::with('owner')->where('id', request('app_id'))->first();
            return Inertia::render('Licenses/BulkResult', [
                'licenses' => $createdLicenses,
                'application' => $application,
            ]);
        }

        /*
            If not bulk, just create one license and redirect to the license.show
        */
        $licenseKey = $this->generateKey();
        $license = License::create([
            'app_id' => request('app_id'),
            'license_key' => $licenseKey,
            'duration' => $duration,
            'lifetime' => $isLifetime,
            'issued_by' => $user->id,
            'note' => request('note'),
        ]);

        return to_route('licenses.show', $license->id);
    }

    public function update(Request $request, License $license): RedirectResponse
    {
        $user = Auth::user();
        $license->load('application', 'application.owner');

        /*
            Check if the user has permissions to update applications
        */
        if (!$user->hasPermissionTo('KEYS_UPDATE') || $license->application->owner->id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $allowedFields = ['status', 'note'];
        $validated = $request->validate([
            'status' => ['sometimes', 'string', 'in:active,expired,revoked'],
            // 'duration' => ['sometimes', 'integer', 'min:1'],
            // 'hwid' => ['sometimes', 'in:RESET'],
            'note' => ['sometimes', 'string', 'max:255'],
            // 'lifetime' => ['sometimes', 'boolean']
        ]);

        $license->update(array_intersect_key($validated, array_flip($allowedFields)));
        return to_route('licenses.show', $license->id)
            ->with('success', 'License updated successfully');
    }

    public function delete(License $license): RedirectResponse
    {
        $user = Auth::user();
        $license->load('application', 'application.owner');
        /*
            Check if the user has permissions to delete applications
            and is the owner of the application.
        */
        if (!$user->hasPermissionTo('KEYS_DELETE') || $license->application->owner_id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $license->delete();
        return to_route('licenses.index')
            ->with('success', 'License deleted successfully.');
    }

    public function resethwid(License $license): RedirectResponse
    {
        $user = Auth::user();
        $license->load('application', 'application.owner');

        /*
            Check if the user has permissions to reset licenses hwid
        */
        if (!$user->hasPermissionTo('KEYS_RESET_HWID') || $license->application->owner->id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $license->update(['hwid' => 'RESET']);

        return to_route('licenses.show', $license->id)
            ->with('success', 'License HWID reseted successfully');
    }

    public function addtime(Request $request, License $license): RedirectResponse
    {
        $user = Auth::user();
        $license->load('application', 'application.owner');

        /*
            Check if the user has permissions to add time to licenses
        */
        if (!$user->hasPermissionTo('KEYS_ADD_TIME') || $license->application->owner->id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        $request->validate([
            'duration_unit' => 'required|string|in:hours,days,weeks,months,years',
            'duration_value' => 'required|numeric|min:1',
        ]);

        $duration = $license->duration + $this->calculateDuration(request('duration_unit'), request('duration_value'));

        $license->update(['duration' => $license->duration + $duration,]);

        return to_route('licenses.show', $license->id)
            ->with('success', 'License updated successfully');
    }
}
