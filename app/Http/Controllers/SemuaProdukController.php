<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Barang;

class SemuaProdukController extends Controller
{
    public function index(Request $request)
    {
        $key = $request->key;
        $barang = Barang::with('kategori')
            ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')  
            ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
        ]);
    }

    public function udeng(Request $request)
    {
        $key = $request->key;
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'Udeng');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
        ]);
    }

    public function saput(Request $request)
    {
        $key = $request->key;
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'saput');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
        ]);
    }

    public function kamen(Request $request)
    {
        $key = $request->key;
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'kamen');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
        ]);
    }

    public function baju(Request $request)
    {
        $key = $request->key;
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'baju');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
        ]);
    }
}
