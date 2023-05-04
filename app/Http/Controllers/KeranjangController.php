<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use Illuminate\Http\Request;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        

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
        $request->validate([
            'qty' => 'required'
        ],
        [
            'qty.required' => 'Qty Tidak Boleh Kosong',
        ]);


        $keranjang = new Keranjang;
        $keranjang->id_barang = $request->id_barang;
        $keranjang->id_customer = $request->id_customer;
        $keranjang->qty = $request->qty;
        $keranjang->save();

        
    }

    /**
     * Display the specified resource.
     */
    public function show(Keranjang $keranjang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Keranjang $keranjang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->request->all());
        // $request->validate([
        //     'qty' => 'required'
        // ],
        // [
        //     'qty.required' => 'Qty Tidak Boleh Kosong',
        // ]);

        // Keranjang::whereIn('id', $request->request->all())->delete();

        foreach ($request->request->all() as $key => $value) {
            $detail = array(
                'id_barang'   =>  $value['id_barang'],
                'id_customer' => $value['id_customer'],
                'qty' => $value['qty'],
                'is_checkout' => $value['is_checkout']
            );
            Keranjang::where('id', $value['id'])->delete();
            $detail = Keranjang::create($detail);
        }
    
        // $keranjang = Keranjang::find($request->id);
        // $keranjang->id_barang = $request->id_barang;
        // $keranjang->id_customer = $request->id_customer;
        // $keranjang->qty = $request->qty;
        // $keranjang->is_checkout = $request->is_checkout;
        // $keranjang->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keranjang $keranjang)
    {
        //
    }
}
