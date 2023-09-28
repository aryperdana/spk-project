<?php

namespace App\Http\Controllers;

use App\Models\SubKriteria;
use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubKriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $sub_kriteria = SubKriteria
            ::orderBy('created_at', 'DESC')->with('kriteria')->where('nama_sub_kriteria', 'LIKE', '%' . $key . '%')
            ->paginate(10);

        $kriteria = Kriteria::all();
        return Inertia::render('AdminPanel/Pages/Master/SubKriteria/SubKriteria', [
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
            'nama_sub_kriteria' => 'required'
        ],
        [
            'nama_sub_kriteria.required' => 'SubKriteria Tidak Boleh Kosong',
        ]);


        $sub_kriteria = new SubKriteria;
        $sub_kriteria->nama_sub_kriteria = $request->nama_sub_kriteria;
        $sub_kriteria->id_kriteria = $request->id_kriteria;
        $sub_kriteria->kode = $request->kode;
        $sub_kriteria->priority = $request->priority;
        $sub_kriteria->save();

        return to_route('sub-kriteria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(SubKriteria $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_sub_kriteria' => 'required'
        ],
        [
            'nama_sub_kriteria.required' => 'SubKriteria Tidak Boleh Kosong',
        ]);
        
        $sub_kriteria = SubKriteria::find($id);
        $sub_kriteria->nama_sub_kriteria = $request->nama_sub_kriteria;
        $sub_kriteria->id_kriteria = $request->id_kriteria;
        $sub_kriteria->kode = $request->kode;
        $sub_kriteria->priority = $request->priority;
        $sub_kriteria->save();

        return to_route('sub-kriteria.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubKriteria  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $sub_kriteria = SubKriteria::find($id);
        $sub_kriteria->delete();
        return to_route('sub-kriteria.index');
    }
}
