<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kriteria;
use App\Models\Alternatif;
use App\Models\Projects;
use App\Models\SubKriteria;
use App\Models\AtributKriteria;
use App\Models\HasilPerhitungan;
use App\Models\HasilPerhitunganDetail;
use Inertia\Inertia;

class PerhitunganSmarterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $key = $request->key;
        $alternatif = Alternatif::all();
        $kriteria = Kriteria::with('subKriteria')->with('atributKriteria')->get();
        $project = Projects::with('detailAlternatif')->get();
        $subKriteria = SubKriteria::with('atributKriteria')->where('id_kriteria', '=', 4)->get();
        $atributKriteria = AtributKriteria::all();
        $subKriteriaAll = SubKriteria::with('atributKriteria')->get();
        

        return Inertia::render('AdminPanel/Pages/Master/PerhitunganSmarter/PerhitunganSmarter', [
            'kriteria_data' => $kriteria,
            'alternatif_data' => $alternatif,
            'project_dropdown' => $project,
            'sub_kriteria_dropdown' => $subKriteria,
            'atribut_kriteria_all' => $atributKriteria,
            'sub_kriteria_all' => $subKriteriaAll,
            'id_project' => $request->id
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

        $hasilPerhitungan = new HasilPerhitungan;
        $hasilPerhitungan->id_projects = $request->id_projects;
        $hasilPerhitungan->nama_projects = $request->nama_projects;
        $hasilPerhitungan->save();

        foreach ($request->detail as $key => $value) {
            $detail = array(
                'id_hasil_perhitungan'   => $hasilPerhitungan->id,
                'hasil_perhitungan'=> $value['hasil_perhitungan'],
                'saran_perbaikan_bangunan'=> $value['saran_perbaikan_bangunan'],
                'nama_bangunan'=> $value['nama_bangunan'],
                'kategori_bangunan'=> $value['kategori_bangunan'],
                'saran_revitalisasi'=> $value['saran_revitalisasi'],
                'bagian_yang_dicek'=> $value['bagian_yang_dicek'],
                'bagian_yang_direvitalisasi'=> $value['bagian_yang_direvitalisasi'],
                'bahan_yang_digunakan'=> $value['bahan_yang_digunakan'],
                'estimasi_biaya_dibutuhkan'=> $value['estimasi_biaya_dibutuhkan'],
                'dana_dimiliki'=> $value['dana_dimiliki'],
                'status_dana'=> $value['status_dana'],
                'estimasi_pengerjaan'=> $value['estimasi_pengerjaan'],
            );
            
            $detail = HasilPerhitunganDetail::create($detail);
        }

        return to_route('laporan-hasil-perhitungan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
