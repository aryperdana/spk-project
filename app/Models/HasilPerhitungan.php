<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilPerhitungan extends Model
{
    use HasFactory;

    protected $table = 'hasil_perhitungan';
    protected $guarded = ['id'];

    public function detail()
    {
        return $this->hasMany(HasilPerhitunganDetail::class, "id_hasil_perhitungan", 'id');
    }
}
