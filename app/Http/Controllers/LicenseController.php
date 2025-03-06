<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\BalanceTransaction;
use App\Models\License;
use App\Models\ResellerApp;
use App\Models\ResellerTimeType;
use Carbon\CarbonInterval;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\RateLimiter;

class LicenseController extends Controller
{

    public static $DURATION_UNITS = [
        'hours' => 1,           // 1 hour
        'days' => 24,           // 24 hours in a day
        'weeks' => 168,         // 168 hours in a week
        'months' => 720,        // 720 hours in a month
        'years' => 8760,        // 8760 hours in a year
        'lifetime' => 0,        // lifetime
    ];

    public static function generateKey(): string
    {
        $key = bin2hex(random_bytes(24));
        return $key;
    }

    public static function calculateDuration(string $unit, int $value): int
    {
        return LicenseController::$DURATION_UNITS[$unit] * $value * 3600;
    }

    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();
        if (!$user->hasPermissionTo('KEYS_READ')) {
            return redirect()->route('dashboard')->with('error', 'Not allowed.');
        }

        /*
            Pre-mke the query to get the licenses
        */
        $licenses = License::with('application:id,name', 'issuer:id,name')
            ->whereHas('application', function ($query) use ($user) {
                $query->where('owner_id', $user->real_owner_id);
            });

        /*
            Make the query to get the applications for the owners/managers
        */
        $applications = Application::where('owner_id', $user->real_owner_id)->get(['id', 'name']);

        $timeOptions = [];

        /*
            If the user is a reseller only show the licenses that they issued,
            and the applications they have access to.
        */
        if ($user->isReseller()) {

            // Add where statement to only the licenses that the reseller issued
            $licenses->where('issued_by', $user->id);

            // Get the applications that the reseller has access to
            $applications = ResellerApp::where('user_id', $user->id)
                ->with('app:id,name')
                ->get()
                ->pluck('app');

            $timeOptions = ResellerTimeType::whereHas('resellerApp', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
                ->with('resellerApp')
                ->get(['id', 'name', 'duration', 'cost', 'reseller_app_id']);
        }

        return Inertia::render('Licenses/Index', [
            'licenses' => Inertia::defer(
                // get only the needed fields for the Index table page
                fn() => $licenses->get(['id', 'license_key', 'status', 'duration', 'activated_at', 'note', 'lifetime']),
            ),
            'applications' => Inertia::defer(
                fn() => $applications,
            ),
            'timeOptions' => Inertia::lazy(
                fn() => $timeOptions,
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

        /*
            If the user is a reseller, check if the license was issued by them
        */
        if ($user->isReseller() && $license->issued_by !== $user->id) {
            return redirect()->route('licenses.index')->with('error', 'Not allowed.');
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
            'time_option' => 'sometimes|numeric',
        ]);

        $application = Application::with('owner')->where('id', request('app_id'))->first();

        /*
            Check if the user has permissions to create applications
        */
        if (!$application || !$user->hasPermissionTo('KEYS_CREATE') || $application->owner->id !== $user->real_owner_id) {
            return to_route('dashboard')->with('error', 'Not allowed.');
        }

        /*
            Calculate the duration in hours, and if it's lifetime (for owners/managers)
        */
        $duration = $this->calculateDuration(request('duration_unit'), request('duration_value'));
        $isLifetime = request('duration_unit') == 'lifetime';

        $cost = 0; // inital value for non resellers
        $isBulk = request('is_bulk') === true;
        $bulkAmount = request('bulk_amount') ?? 1;

        /*
            If the user is a reseller, check if they have access to the application,
            get the duration from the time options, and calculate the duration and cost
        */
        if ($user->isReseller()) {

            // get the relation of the reseller/application
            $resellerApp = ResellerApp::where('user_id', $user->id)->where('app_id', $application->id)->first();

            // get the time option type if exits
            $timeOption = ResellerTimeType::where('reseller_app_id', $resellerApp->id)
                ->where('id', request('time_option'))
                ->first();

            if (!$resellerApp || !$timeOption) {
                return to_route('licenses.index')->with('error', 'Not allowed.');
            }

            $duration = $timeOption->duration;                              // get the duration from the time option
            $isLifetime = false;                                            // resellers can't make lifetime keys ?

            $cost = $timeOption->cost;                                      // get the cost from the time option
            $cost = $isBulk ? $cost * $bulkAmount : $cost;                  // if it's bulk, multiply the cost by the amount of keys

            // check if the reseller has enough balance
            if ($user->balance < $cost) {
                return to_route('licenses.index')->with('error', 'Not enough balance.');
            }
        }

        /*
            If it's a bulk create, create all keys then return a json with the keys to
            display them in a modal to easy copy to clipboard
        */
        if ($isBulk) {

            $createdLicenses = [];

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

            // update the reseller balance
            if ($user->isReseller()) {
                $user->update(['balance' => $user->balance - $cost]);
                // create a transaction log
                BalanceTransaction::create([
                    'user_id' => $user->id,
                    'amount' => $cost,
                    'type' => 'debit',
                    'description' => 'Created (' . $bulkAmount . ') keys for ' . $application->name,
                    'total' => $user->balance - $cost,
                ]);
            }

            // get the application info, and redirect to the bulk display
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

        // update the reseller balance
        if ($user->isReseller()) {
            $user->update(['balance' => $user->balance - $cost]);
            // create a transaction log
            BalanceTransaction::create([
                'user_id' => $user->id,
                'amount' => $cost,
                'type' => 'debit',
                'description' => 'Created (1) keys for ' . $application->name,
                'total' => $user->balance - $cost,
            ]);
        }

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

    private function isValidSignature($license_key, $hwid, $timestamp, $app_secret, $provided_signature)
    {
        $message = $license_key . $hwid . $timestamp;
        $expected_signature = hash_hmac('sha256', $message, $app_secret);
        return hash_equals($expected_signature, $provided_signature);
    }

    public function verify(Request $request): JsonResponse
    {

        // Enforce HTTPS
        if (!$request->secure()) {
            return response()->json(['error' => 'insecure_mehtod_not_allowed'], 403);
        }

        // Rate limiting
        $rateLimitKey = "verify-license-" . $request->ip();
        if (RateLimiter::tooManyAttempts($rateLimitKey, 10)) {
            return response()->json(['error' => 'too_many_requests'], 429);
        }
        RateLimiter::hit($rateLimitKey, 60); // 10 requests per minute

        // Validate Request
        $validated = $request->validate([
            'app_id' => 'required|string',
            'license_key' => 'required|string',
            'hwid' => 'required|string|max:255',
            'timestamp' => 'required|integer',
            'signature' => 'required|string',
        ]);

        $license = License::where('license_key', $validated['license_key'])->first();
        $application = Application::where('app_hash_id', $validated['app_id'])->first();

        // Check if the license exists
        if (!$license) {
            return response()->json(['error' => 'invalid_license'], 404);
        }
        // Check if the application exists
        if (!$application) {
            return response()->json(['error' => 'invalid_application'], 404);
        }
        // Check if the license status is expired
        if ($license->status === 'expired') {
            return response()->json(['error' => 'license_expired'], 403);
        }
        // Check if the license status is revoked
        if ($license->status === 'revoked') {
            return response()->json(['error' => 'license_revoked'], 403);
        }
        // Check if the license is expired (if is not lifetime)
        if ($license->lifetime === false && $license->activated_at !== null && $license->activated_at->addHours($license->duration)->isPast()) {
            return response()->json(['error' => 'license_expired'], 403);
        }

        /*
            If the license is unused, activate it
            and bind the hwid to it.
        */
        if ($license->status === 'unused') {
            $license->update([
                'status' => 'active',
                'activated_at' => now(),
                'hwid' => $validated['hwid'],
            ]);
        }

        // Check hwid
        if ($license->hwid !== 'RESET' && $license->hwid !== $validated['hwid']) {
            return response()->json(['error' => 'hwid_mismatch'], 403);
        }

        // If the hwid is RESET, update it
        if ($license->hwid === 'RESET') {
            $license->update(['hwid' => $validated['hwid']]);
        }

        // Validate Signature (HMAC)
        $isValidSignature = $this->isValidSignature(
            $validated['license_key'],
            $validated['hwid'],
            $validated['timestamp'],
            $application->app_secret,
            $validated['signature']
        );

        if (!$isValidSignature) {
            return response()->json(['error' => 'invalid_signature'], 403);
        }

        $prettyTimeLeft = $license->lifetime ? 'lifetime' : CarbonInterval::seconds($license->time_left)->cascade()->forHumans();

        return response()->json([
            'status' => $license->status,
            'time_left' => $license->time_left,
            'pretty_time_left' => $prettyTimeLeft,
            'is_lifetime' => $license->lifetime,
        ], 200);
    }
}
