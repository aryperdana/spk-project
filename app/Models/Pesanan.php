<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;
    protected $table = 'pesanans';
    protected $guarded = ['id'];

    public function detail_pesanan()
    {
        return $this->hasMany(DetailPesanan::class, 'id')->with('detail_barang');
    }
}
