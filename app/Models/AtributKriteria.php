<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtributKriteria extends Model
{
    use HasFactory;

    protected $table = 'atribut_kriterias';
    protected $guarded = ['id'];

    public function subKriteria()
    {
        return $this->belongsTo(SubKriteria::class, 'id_sub_kriteria');
    }
}
