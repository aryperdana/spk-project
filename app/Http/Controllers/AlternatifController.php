<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlternatifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $alternatif = Alternatif
            ::orderBy('created_at', 'DESC')->where('nama_alternatif', 'LIKE', '%' . $key . '%')
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Master/Alternatif/Alternatif', [
            'alternatif_data' => $alternatif,
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
            'nama_alternatif' => 'required'
        ],
        [
            'nama_alternatif.required' => 'Alternatif Tidak Boleh Kosong',
        ]);


        $alternatif = new Alternatif;
        $alternatif->nama_alternatif = $request->nama_alternatif;
        $alternatif->kategori = $request->kategori;
        $alternatif->save();

        return to_route('alternatif.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Alternatif  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(Alternatif $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Alternatif  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Alternatif  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_alternatif' => 'required'
        ],
        [
            'nama_alternatif.required' => 'Alternatif Tidak Boleh Kosong',
        ]);
        
        $alternatif = Alternatif::find($id);
        $alternatif->nama_alternatif = $request->nama_alternatif;
        $alternatif->kategori = $request->kategori;
        $alternatif->save();

        return to_route('alternatif.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Alternatif  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $alternatif = Alternatif::find($id);
        $alternatif->delete();
        return to_route('alternatif.index');
    }
}
