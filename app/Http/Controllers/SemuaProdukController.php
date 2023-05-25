<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Barang;
use App\Models\Keranjang;

class SemuaProdukController extends Controller
{
    public function index(Request $request)
    {
        $id_customer = Auth::user()->id ?? 0;
        // dd($id_customer);
        $keranjang = Keranjang::where('is_checkout', 0)->where('id_customer', $id_customer)->with('barang')->get();
      
        $key = $request->key;
        $barang = Barang::with('kategori')
            ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')  
            ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
            'keranjang' => $keranjang
        ]);
    }

    public function udeng(Request $request)
    {
        $key = $request->key;
        $id_customer = Auth::user()->id ?? 0;
        
        $keranjang = Keranjang::where('is_checkout', 0)->where('id_customer', $id_customer)->with('barang')->get();
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'Udeng');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
            'keranjang' => $keranjang
        ]);
    }

    public function saput(Request $request)
    {
        $key = $request->key;
        $id_customer = Auth::user()->id ?? 0;
        $keranjang = Keranjang::where('is_checkout', 0)->where('id_customer', $id_customer)->with('barang')->get();
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'saput');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
            'keranjang' => $keranjang,
        ]);
    }

    public function kamen(Request $request)
    {
        $key = $request->key;
        $id_customer = Auth::user()->id ?? 0;
        $keranjang = Keranjang::where('is_checkout', 0)->where('id_customer', $id_customer)->with('barang')->get();
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'kamen');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
            'keranjang' => $keranjang
        ]);
    }

    public function baju(Request $request)
    {
        $key = $request->key;
        $id_customer = Auth::user()->id ?? 0;
        $keranjang = Keranjang::where('is_checkout', 0)->where('id_customer', $id_customer)->with('barang')->get();
        $barang = Barang::whereHas('kategori', function($query) {
            $query->where("nama_kategori_barang", 'baju');})->with('kategori')
        ->orderBy('created_at', 'DESC')->where('nama_barang', 'LIKE', '%' . $key . '%')
        ->paginate(10);
        return Inertia::render('LandingPage/Pages/SemuaProduk/SemuaProduk', [
            'barang_data' => $barang,
            'user' => Auth::user(),
            'keranjang' => $keranjang
        ]);
    }
}
