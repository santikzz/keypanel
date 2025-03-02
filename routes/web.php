<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\UserController;

Route::get('/auth/{provider}', [OAuthController::class, 'redirect'])->where('provider', 'google|discord');
Route::get('/auth/{provider}/callback', [OAuthController::class, 'callback'])->where('provider', 'google|discord');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
        Applications
    */
    // listing applications
    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    // creating applications
    Route::get('/application/create', [ApplicationController::class, 'create'])->name('applications.create');
    Route::post('/application', [ApplicationController::class, 'store'])->name('applications.store');
    // editing applications
    Route::get('/application/{application}/edit', [ApplicationController::class, 'edit'])->name('applications.edit');
    Route::put('/application/{application}', [ApplicationController::class, 'update'])->name('applications.update');
    // deleting applications
    Route::delete('/application/{application}', [ApplicationController::class, 'delete'])->name('applications.delete');

    /*
        Licenses
    */
    Route::get('/licenses', [LicenseController::class, 'index'])->name('licenses.index');
    Route::get('/licenses/{license}', [LicenseController::class, 'show'])->name('licenses.show');
    Route::post('/license', [LicenseController::class, 'store'])->name('licenses.store');
    Route::put('/license/{license}', [LicenseController::class, 'update'])->name('licenses.update');
    Route::post('/license/{license}/addtime', [LicenseController::class, 'addtime'])->name('licenses.addtime');
    Route::post('/license/{license}/resethwid', [LicenseController::class, 'resethwid'])->name('licenses.resethwid');
    Route::delete('/license/{license}', [LicenseController::class, 'delete'])->name('licenses.delete');

    /*
        Users (mamagers/resellers)
    */
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/manager/{manager}', [UserController::class, 'showManager'])->name('users.showManager');
    Route::get('/reseller/{reseller}', [UserController::class, 'showReseller'])->name('users.showReseller');
    // create
    Route::post('/user/manager', [UserController::class, 'storeManager'])->name('users.storeManager');
    Route::post('/user/reseller', [UserController::class, 'storeReseller'])->name('users.storeReseller');
    // update
    Route::put('/user/manager/{manager}', [UserController::class, 'updateManager'])->name('users.updateManager');
    Route::put('/user/reseller/{reseller}', [UserController::class, 'updateReseller'])->name('users.updateReseller');
    // delete
    Route::delete('/user/{user}', [UserController::class, 'delete'])->name('users.delete');
    // balance
    Route::post('/reseller/{reseller}/setbalance', [UserController::class, 'setBalance'])->name('users.setBalance');
    Route::post('/reseller/{reseller}/addbalance', [UserController::class, 'addBalance'])->name('users.addBalance');

});

require __DIR__ . '/auth.php';
