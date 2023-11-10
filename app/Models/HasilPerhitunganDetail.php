<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilPerhitunganDetail extends Model
{
    use HasFactory;

    protected $table = 'detail_hasil_perhitungan';
    protected $guarded = ['id'];


    
}
