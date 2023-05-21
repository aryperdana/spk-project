<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPesanan extends Model
{
    use HasFactory;
    protected $table = 'detail_pesanans';
    protected $guarded = ['id'];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'id_pesanan');
    }

    public function detail_barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang');
    }

}
