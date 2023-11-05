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
        Schema::create('bagian_bangunan_alternatifs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_project_alternatif')->nullable();
            $table->string('nama_bagian_bangunan');
            $table->foreign('id_project_alternatif')->references('id')->on('project_alternatifs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bagian_bangunan_alternatifs');
    }
};
