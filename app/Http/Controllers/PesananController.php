<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Barang;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $pesanan = Pesanan::orderBy('created_at', 'DESC')->where('nama_pemesan', 'LIKE', '%' . $key . '%')  
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Transaksi/Pesanan/Pesanan', [
            'pesanan_data' => $pesanan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $barang = Barang::all();
        return Inertia::render('AdminPanel/Pages/Transaksi/Pesanan/TambahPesanan', [
            'barang_dropdown' => $barang
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_pemesan' => 'required',
            'alamat_pengiriman' => 'required'
        ],
        [
            'nama_pemesan.required' => 'Nama Pemesan Tidak Boleh Kosong',
            'alamat_pengiriman.required' => 'Alamat Tidak Boleh Kosong',
        ]);


        $pesanan = new Pesanan();
        $pesanan->nama_pemesan = $request->nama_pemesan;
        $pesanan->alamat_pengiriman = $request->alamat_pengiriman;
        $pesanan->keterangan = $request->keterangan;
        $pesanan->save();


        foreach ($request->detail as $key => $value) {
            $detail = array(
                'id_pesanan'   => $pesanan->id,
                'id_barang' => $value['id'],
                'qty' => $value['qty']
            );

            $detail = DetailPesanan::create($detail);
        }

        if (Auth::user()->level === 1) {
            return to_route('pesanan.index');
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $pesanan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $pesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pesanan $pesanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesanan $pesanan)
    {
        //
    }
}
