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
        return $this->hasMany(SubKriteria::class, "id_kriteria", 'id');
    }

    public function atributKriteria()
    {
        return $this->hasMany(AtributKriteria::class, "id_kriteria", 'id');
    }
}
