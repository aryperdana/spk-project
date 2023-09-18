<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $kriteria = Kriteria
            ::orderBy('created_at', 'DESC')->where('nama_kriteria', 'LIKE', '%' . $key . '%')
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Master/Kriteria/Kriteria', [
            'alternatif_data' => $kriteria,
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
            'nama_kriteria' => 'required'
        ],
        [
            'nama_kriteria.required' => 'Kriteria Tidak Boleh Kosong',
        ]);


        $kriteria = new Kriteria;
        $kriteria->nama_kriteria = $request->nama_kriteria;
        $kriteria->bobot_kriteria = $request->bobot_kriteria;
        $kriteria->kode = $request->kode;
        $kriteria->priority = $request->priority;
        $kriteria->save();

        return to_route('kriteria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(Kriteria $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Kriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Kriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_kriteria' => 'required'
        ],
        [
            'nama_kriteria.required' => 'Kriteria Tidak Boleh Kosong',
        ]);
        
        $kriteria = Kriteria::find($id);
        $kriteria->nama_kriteria = $request->nama_kriteria;
        $kriteria->bobot_kriteria = $request->bobot_kriteria;
        $kriteria->kode = $request->kode;
        $kriteria->priority = $request->priority;
        $kriteria->save();

        return to_route('kriteria.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $kriteria = Kriteria::find($id);
        $kriteria->delete();
        return to_route('kriteria.index');
    }
}
