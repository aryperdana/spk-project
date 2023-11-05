<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

    protected $table = 'projects';
    protected $guarded = ['id'];

    public function detailAlternatif()
    {
        return $this->hasMany(ProjectAlternatif::class, "id_project", 'id')->with('detailBagianBangunan')->with('alternatif');
    }
}
