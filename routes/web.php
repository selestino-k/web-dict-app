<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;


Route::inertia('/', 'home')->name('home');

Route::inertia('welcome', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

Route::get('/api/dictionary/search', [App\Http\Controllers\DictionaryController::class, 'search']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('admin/dashboard', 'admin/dashboard')->name('dashboard');
    Route::inertia('admin/settings/profile', 'admin/settings/profile')->name('profile');
    Route::inertia('admin/settings', 'admin/settings')->name('settings');
    Route::inertia('admin/settings/appearance', 'admin/settings/appearance')->name('appearance');
});


require __DIR__ . '/settings.php';
