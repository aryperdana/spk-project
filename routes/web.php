<?php
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', [LayoutController::class, 'index'])->name('layout')->middleware('auth');

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware('access.without.login');


Route::controller(LoginController::class)->group(function () {
    Route::get('login', 'index')->name('login');
    Route::post('login/proses', 'proses')->name("login.proses");
    Route::get('logout', 'logout');
});

Route::group(['middleware' => ['auth']], function () {
    Route::group(['middleware' => ['checkUserLogin:1']], function () {
        Route::get('/admin', [DashboardController::class, 'index']);
        Route::resource('/alternatif', AlternatifController::class);
        Route::resource('/kriteria', KriteriaController::class);
    });
});


// require __DIR__.'/auth.php';
