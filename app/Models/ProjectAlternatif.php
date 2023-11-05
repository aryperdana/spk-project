<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectAlternatif extends Model
{
    use HasFactory;

    protected $table = 'project_alternatifs';
    protected $guarded = ['id'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'id_project');
    }

    public function alternatif()
    {
        return $this->belongsTo(Alternatif::class, 'id_alternatif');
    }

    public function detailBagianBangunan()
    {
        return $this->hasMany(BagianBangunanAlternatif::class, "id_project_alternatif", 'id');
    }
}
