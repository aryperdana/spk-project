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
        $laporan_rekap_penjualan = DetailPesanan::with('pesanan')->with('detail_barang')->whereHas('pesanan.detail_pesanan', function ($q) use ($request) {
            $start_date = $request->start_date;
            $end_date = $request->end_date;
            $q->wherebetween('tanggal', [$start_date, $end_date])->where("is_online", $request->is_online);
        })
        ->where("id_barang", $request->id_barang)
        ->orderBy('created_at', 'DESC')  
        ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Dashboard', [ 'user' => Auth::user(),]);
    }
}
