<?php
use App\Http\Controllers\LoginController;
use App\Http\Controllers\KategoriBarangController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SemuaProdukController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('LandingPage/Pages/Welcome');
});

// Route::get('/semua-produk', function () {
//     return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk');
// });

Route::get('/semua-produk', [SemuaProdukController::class, 'index']);
Route::get('/udeng', [SemuaProdukController::class, 'udeng']);
Route::get('/saput', [SemuaProdukController::class, 'saput']);
Route::get('/kamen', [SemuaProdukController::class, 'kamen']);
Route::get('/baju', [SemuaProdukController::class, 'baju']);


Route::controller(LoginController::class)->group(function () {
    Route::get('login', 'index')->name('login');
    Route::post('login/proses', 'proses')->name("login.proses");
    Route::get('logout', 'logout');
});

Route::group(['middleware' => ['auth']], function () {
    Route::group(['middleware' => ['checkUserLogin:1']], function () {
        Route::get('/admin/dashboard', function () {
            return Inertia::render('AdminPanel/Pages/Dashboard');
        });
        Route::resource('/admin/user', UserController::class);
        Route::resource('/admin/kategori', KategoriBarangController::class);
        Route::resource('/admin/barang', BarangController::class);
    });
});


// require __DIR__.'/auth.php';
