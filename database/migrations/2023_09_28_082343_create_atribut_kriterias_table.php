<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('atribut_kriterias', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_sub_kriteria');
            $table->string('nama_atribut_kriteria');
            $table->string('kode');
            $table->integer('priority');
            $table->foreign('id_sub_kriteria')->references('id')->on('sub_kriterias')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atribut_kriterias');
    }
};
