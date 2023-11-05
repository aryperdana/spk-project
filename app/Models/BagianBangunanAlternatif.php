<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BagianBangunanAlternatif extends Model
{
    use HasFactory;

    protected $table = 'bagian_bangunan_alternatifs';
    protected $guarded = ['id'];

    public function projectAlternatif()
    {
        return $this->belongsTo(ProjectAlternatif::class, 'id_project_alternatif');
    }
}
