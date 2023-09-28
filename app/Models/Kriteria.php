<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kriteria extends Model
{
    use HasFactory;

    protected $table = 'kriterias';
    protected $guarded = ['id'];

    public function subKriteria()
    {
        return $this->hasMany(Kriteria::class, "id_kriteria");
    }
}
