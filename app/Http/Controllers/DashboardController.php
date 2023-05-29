<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $barang = Barang::all();
        $dataDetail = DetailPesanan::with('pesanan')->with('detail_barang')->get();
        return Inertia::render('AdminPanel/Pages/Dashboard', [ 'user' => Auth::user(), 'dataDetail' => $dataDetail]);
    }
}
