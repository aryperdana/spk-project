<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    use HasFactory;
    protected $table = 'keranjangs';
    protected $guarded = ['id'];

    public function barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang');
    }
}
