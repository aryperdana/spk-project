<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
Schema::table('atribut_kriterias', function (Blueprint $table) {
    $table->unsignedBigInteger('id_kriteria')->nullable()->change();
    $table->unsignedBigInteger('id_sub_kriteria')->nullable()->change();
    $table->string('score')->nullable()->change();
});