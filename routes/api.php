<?php

use App\Http\Controllers\LicenseController;
use App\Http\Controllers\PatreonWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('health', function () {
    return response()->json(['status' => 'ok']);
});

Route::post('/v1/verify', [LicenseController::class, 'verify'])->name('api.verify');

// Route::post('patreon/webhook', [PatreonWebhookController::class, 'handle']);
