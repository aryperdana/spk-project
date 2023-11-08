<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Alternatif;
use App\Models\ProjectAlternatif;
use App\Models\BagianBangunanAlternatif;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $id_user = Auth::user()->id;
        $key = $request->key;
        $projects = Projects
            ::orderBy('created_at', 'DESC')->where('nama_project', 'LIKE', '%' . $key . '%')->where('id_user', '=', $id_user)
            ->paginate(10);

        $user = User::all();
       
        return Inertia::render('AdminPanel/Pages/Master/Projects/Projects', [
            'projects_data' => $projects,
            'user_data' => $user,
            'id_user' => $id_user
        ]);
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    { 
        $alternatif = Alternatif::all();
        $id_user = Auth::user()->id;
        return Inertia::render('AdminPanel/Pages/Master/Projects/TambahProjects', [
            'alternatif_dropdown' => $alternatif,
            'id_user' => $id_user
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
            'nama_project' => 'required'
        ],
        [
            'nama_project.required' => 'Projects Tidak Boleh Kosong',
        ]);

        // dd($request);


        $projects = new Projects;
        $projects->nama_project = $request->nama_project;
        $projects->lokasi_pura = $request->lokasi_pura;
        $projects->deskripsi_project = $request->deskripsi_project;
        $projects->tanggal = $request->tanggal;
        $projects->id_user = $request->id_user;
        $projects->save();

        $detail_alternatif = array_filter($request->detail, function($k) {
            return $k['isUse'] == true;
        });

        foreach ($detail_alternatif as $key => $value) {
            $detail = array(
                'id_project'   => $projects->id,
                'id_alternatif' => $value['id'],
                'jumlah_jenis_bahan' => $value['jumlah_jenis_bahan'],
            );
            
            $detail = ProjectAlternatif::create($detail);
        }

        return to_route('perhitungan-smarter.index', ['id' => $projects->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Projects  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function show(Projects $kategoriBarang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Projects  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Projects  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'nama_project' => 'required'
        ],
        [
            'nama_project.required' => 'Projects Tidak Boleh Kosong',
        ]);
        
        $projects = Projects::find($id);
        $projects->nama_project = $request->nama_project;
        $projects->lokasi_pura = $request->lokasi_pura;
        $projects->deskripsi_project = $request->deskripsi_project;
        $projects->tanggal = $request->tanggal;
        $projects->id_user = $request->id_user;
        $projects->save();

        return to_route('projects.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Projects  $kategoriBarang
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $projects = Projects::find($id);
        $projects->delete();
        return to_route('projects.index');
    }
}
