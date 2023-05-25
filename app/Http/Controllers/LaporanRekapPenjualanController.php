<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanRekapPenjualanController extends Controller
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
        return Inertia::render('AdminPanel/Pages/Laporan/LaporanRekapPenjualan/LaporanRekapPenjualan', [
            'laporan_data' => $laporan_rekap_penjualan,
            'barang_dropdown' => $barang,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailPesanan $pengiriman)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailPesanan $pengiriman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DetailPesanan $pengiriman)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailPesanan $pengiriman)
    {
        //
    }
}
