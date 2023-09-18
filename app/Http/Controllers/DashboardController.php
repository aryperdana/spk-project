<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('AdminPanel/Pages/Dashboard',
         ['user' => Auth::user()]
        );
    }
}
