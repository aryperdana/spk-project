<?php

namespace App\Http\Controllers;

use App\Models\KategoriBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriBarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $kategori_barang = KategoriBarang
            ::orderBy('created_at', 'DESC')->where('nama_kategori_barang', 'LIKE', '%' . $key . '%')
            ->orWhere('keterangan', 'LIKE', '%' . $key . '%')
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Master/Kategori/Kategori', [
            'kategori_data' => $kategori_barang,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'nama_kategori_barang' => 'required'
        ],
        [
            'nama_kategori_barang.required' => 'Kategori Tidak Boleh Kosong',
        ]);


        $kategori_barang = new KategoriBarang;
        $kategori_barang->nama_kategori_barang = $request->nama_kategori_barang;
        $kategori_barang->keterangan = $request->keterangan;
        $kategori_barang->save();

        return to_route('kategori.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KategoriBarang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(KategoriBarang $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\KategoriBarang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KategoriBarang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_kategori_barang' => 'required'
        ],
        [
            'nama_kategori_barang.required' => 'Kategori Tidak Boleh Kosong',
        ]);
        
        $kategori_barang = KategoriBarang::find($id);
        $kategori_barang->nama_kategori_barang = $request->nama_kategori_barang;
        $kategori_barang->keterangan = $request->keterangan;
        $kategori_barang->save();

        return to_route('kategori.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KategoriBarang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $kategori_barang = KategoriBarang::find($id);
        $kategori_barang->delete();
        return to_route('kategori.index');
    }
}
