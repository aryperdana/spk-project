<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\KategoriBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $kategori_barang = KategoriBarang::all();
        $barang = Barang::with('kategori')
            ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')  
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Master/Barang/Barang', [
            'barang_data' => $barang,
            'dropdown_kategori' => $kategori_barang,
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
            'nama_barang' => 'required',
            'id_kategori_barang' => 'required',
            'ukuran' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'foto_barang' => 'mimes:jpeg,png,jpg,gif,svg|max:2048',
        ],
        [
            'nama_barang.required' => 'Nama Barang Tidak Boleh Kosong',
            'id_kategori_barang.required' => 'Kategori Tidak Boleh Kosong',
            'ukuran.required' => 'Ukuran Tidak Boleh Kosong',
            'harga.required' => 'Harga Tidak Boleh Kosong',
            'stok.required' => 'Stok Tidak Boleh Kosong',
        ]);

        if ($request->hasFile('foto_barang')) {
            $image = $request->file('foto_barang')->store('uploads');
        } else {
            $image = '';
        }

        $barang = new Barang;
        $barang->nama_barang = $request->nama_barang;
        $barang->id_kategori_barang = $request->id_kategori_barang;
        $barang->ukuran = $request->ukuran;
        $barang->harga = $request->harga;
        $barang->stok = $request->stok;
        $barang->diskon = $request->diskon;
        $barang->foto_barang = $image;
        $barang->save();

        return to_route('barang.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Barang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(Barang $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Barang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Barang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request);  
        $request->validate([
            'nama_barang' => 'required',
            'id_kategori_barang' => 'required',
            'ukuran' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'foto_barang' => 'mimes:jpeg,png,jpg,gif,svg|max:2048',
        ],
        [
            'nama_barang.required' => 'Nama Barang Tidak Boleh Kosong',
            'id_kategori_barang.required' => 'Kategori Tidak Boleh Kosong',
            'ukuran.required' => 'Ukuran Tidak Boleh Kosong',
            'harga.required' => 'Harga Tidak Boleh Kosong',
            'stok.required' => 'Stok Tidak Boleh Kosong',
        ]);

        if ($request->hasFile('foto_barang')) {
            $image = $request->file('foto_barang')->store('uploads');
        } else {
            $image = '';
        }

        
        $barang = Barang::find($id);
        $path = $barang->foto_barang;

        if ($path != null || $path != '') {
            Storage::delete($path);
        }
        $barang->nama_barang = $request->nama_barang;
        $barang->id_kategori_barang = $request->id_kategori_barang;
        $barang->ukuran = $request->ukuran;
        $barang->harga = $request->harga;
        $barang->stok = $request->stok;
        $barang->diskon = $request->diskon;
        $barang->foto_barang = $image;
        $barang->save();

        return to_route('barang.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Barang  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $barang = Barang::find($id);
        $path = $barang->foto_barang;

        if ($path != null || $path != '') {
            Storage::delete($path);
        }

        $barang->delete();
        return to_route('barang.index');
    }
}
