<?php

namespace App\Http\Controllers;

use App\Models\AtributKriteria;
use App\Models\SubKriteria;
use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtributKriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $atribut_kriteria = AtributKriteria
            ::orderBy('created_at', 'DESC')->with('kriteria')->with('subKriteria')->where('nama_atribut_kriteria', 'LIKE', '%' . $key . '%')
            ->paginate(10);

        $sub_kriteria = SubKriteria::all();
        $kriteria = Kriteria::all();
        return Inertia::render('AdminPanel/Pages/Master/AtributKriteria/AtributKriteria', [
            'atribut_kriteria_data' => $atribut_kriteria,
            'sub_kriteria_data' => $sub_kriteria,
            'kriteria_data' => $kriteria,
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
            'nama_atribut_kriteria' => 'required'
        ],
        [
            'nama_atribut_kriteria.required' => 'AtributKriteria Tidak Boleh Kosong',
        ]);


        $atribut_kriteria = new AtributKriteria;
        $atribut_kriteria->nama_atribut_kriteria = $request->nama_atribut_kriteria;
        $atribut_kriteria->id_sub_kriteria = $request->id_sub_kriteria;
        $atribut_kriteria->id_kriteria = $request->id_kriteria;
        $atribut_kriteria->kode = $request->kode;
        $atribut_kriteria->priority = $request->priority;
        $atribut_kriteria->score = $request->score;
        $atribut_kriteria->save();

        return to_route('atribut-kriteria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AtributKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(AtributKriteria $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AtributKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AtributKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_atribut_kriteria' => 'required'
        ],
        [
            'nama_atribut_kriteria.required' => 'AtributKriteria Tidak Boleh Kosong',
        ]);
        
        $atribut_kriteria = AtributKriteria::find($id);
        $atribut_kriteria->nama_atribut_kriteria = $request->nama_atribut_kriteria;
        $atribut_kriteria->id_sub_kriteria = $request->id_sub_kriteria;
        $atribut_kriteria->id_kriteria = $request->id_kriteria;
        $atribut_kriteria->kode = $request->kode;
        $atribut_kriteria->priority = $request->priority;
        $atribut_kriteria->score = $request->score;
        $atribut_kriteria->save();

        return to_route('atribut-kriteria.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AtributKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $atribut_kriteria = AtributKriteria::find($id);
        $atribut_kriteria->delete();
        return to_route('atribut-kriteria.index');
    }
}
