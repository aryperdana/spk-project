<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SubKriteria;
use App\Models\AtributKriteria;
use App\Models\HasilPerhitungan;

class HasilPerhitunganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $hasilPerhitungan = HasilPerhitungan
            ::with('detail')->where('nama_projects', 'LIKE', '%' . $key . '%')
            ->paginate(10);
        return Inertia::render('AdminPanel/Pages/Master/HasilPerhitungan/HasilPerhitungan', [
            'hasil_perhitungan_data' => $hasilPerhitungan,
        ]);
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $alternatif = Alternatif::all();
        // $id_user = Auth::user()->id;
        return Inertia::render('AdminPanel/Pages/Master/KriteriaNew/TambahKriteria', [
            // 'alternatif_dropdown' => $alternatif,
            // 'id_user' => $id_user
        ]);
    }

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
        $kriteria->kode = $request->kode;
        $kriteria->priority = $request->priority;
        $kriteria->save();

        foreach ($request->detail as $key => $value) {
            $detail = array(
                'id_kriteria' => $kriteria->id,
                'nama_sub_kriteria' => $value['nama_sub_kriteria'],
                'kode' =>  $value['kode'],
                'priority' => $value['priority'],
                'is_header' => $value['is_header']
            );

           
            $detail = SubKriteria::create($detail);
    


            foreach ($value['sub_atribut'] as $val) {
                $sub_atribut = array(
                    'id_sub_kriteria' => $detail->id,
                    'id_kriteria' => $kriteria->id,
                    'nama_atribut_kriteria' => $val['nama_atribut_kriteria'],
                    'kode' => $val['kode'],
                    'priority' => $val['priority'],
                    'score' => $val['score']
                );
    
                $sub_atribut = AtributKriteria::create($sub_atribut);
            }
        }

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
    {
        $kriteria = Kriteria::with('subKriteria')->find($id);

        return Inertia::render('AdminPanel/Pages/Master/KriteriaNew/UbahKriteria', [
            'singleData' => $kriteria,
       
        ]);
    }

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
        $kriteria->kode = $request->kode;
        $kriteria->priority = $request->priority;
        $kriteria->save();

        foreach ($request->detail as $key => $value) {
            $detail = array(
                'id' => $$value['id'],
                'id_kriteria' => $kriteria->id,
                'nama_sub_kriteria' => $value['nama_sub_kriteria'],
                'kode' =>  $value['kode'],
                'priority' => $value['priority'],
                'is_header' => $value['is_header']
            );

           
            $detail = SubKriteria::save($detail);
    


            foreach ($value['sub_atribut'] as $val) {
                $sub_atribut = array(
                    'id' => $$value['id'],
                    'id_sub_kriteria' => $detail->id,
                    'id_kriteria' => $kriteria->id,
                    'nama_atribut_kriteria' => $val['nama_atribut_kriteria'],
                    'kode' => $val['kode'],
                    'priority' => $val['priority'],
                    'score' => $val['score']
                );
    
                $sub_atribut = AtributKriteria::save($sub_atribut);
            }
        }

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
