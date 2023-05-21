<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Barang;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class KasirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $kasir = Pesanan::with('detail_pesanan')->orderBy('created_at', 'DESC')->where('is_online', 0)->where('nama_pemesan', 'LIKE', '%' . $key . '%')  
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Transaksi/Kasir/Kasir', [
            'kasir_data' => $kasir,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $barang = Barang::all();
        return Inertia::render('AdminPanel/Pages/Transaksi/Kasir/TambahKasir', [
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
        // dd($request);


        $kasir = new Pesanan();
        $kasir->no_transaksi = $request->no_transaksi;
        $kasir->tanggal = $request->tanggal;
        $kasir->nama_pemesan = $request->nama_pemesan;
        $kasir->alamat_pengiriman = $request->alamat_pengiriman;
        $kasir->keterangan = $request->keterangan;
        $kasir->is_online = $request->is_online;
        $kasir->terkirim = $request->terkirim;
        $kasir->save();


        foreach ($request->detail as $key => $value) {
            $detail = array(
                'id_pesanan'   => $kasir->id,
                'id_barang' => $value['id'],
                'qty' => $value['qty']
            );

            $detail = DetailPesanan::create($detail);
        }
        

        foreach ($request->detail as $key => $value) {
            $data_barang = Barang::find($value['id']); 
            $data_barang->diskon = $value['diskon']; 
            $data_barang->foto_barang = $value['foto_barang'];
            $data_barang->harga = $value['harga'];
            $data_barang->id_kategori_barang = $value['id_kategori_barang'];
            $data_barang->nama_barang = $value['nama_barang'];
            $data_barang->stok = $value['stok'] - $value['qty'];
            $data_barang->ukuran = $value['ukuran'];
      
            $data_barang->save();
            
            // dd($data_barang);
        }

        if (Auth::user()->level === '1') {
            return to_route('kasir.index');
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $kasir)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $kasir)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pesanan $kasir)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesanan $kasir)
    {
        //
    }

    public function genrateNo(Request $request)
    {
        // dd($request->date);
        $date = $request->date;
        $year = Carbon::createFromFormat('Y-m-d', $date)->format('Y');
        $month = Carbon::createFromFormat('Y-m-d', $date)->format('m');
        $prefix = $year . '/' . $month . '/PNJ/';
        $id = IdGenerator::generate(['table' => 'pesanans', 'field' =>'no_transaksi', 'length' => 16, 'prefix' => $prefix, 'reset_on_prefix_change' => true]);

        // dd($randomItems);

        return response()->json([
            'message' => 'success',
            'data' => $id,
        ], 200);
    }
}
