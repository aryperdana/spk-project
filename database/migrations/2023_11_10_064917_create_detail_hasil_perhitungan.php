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
        Schema::create('detail_hasil_perhitungan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_hasil_perhitungan')->nullable();
            $table->string('hasil_perhitungan');
            $table->string('saran_perbaikan_bangunan');
            $table->string('nama_bangunan');
            $table->string('kategori_bangunan');
            $table->string('saran_revitalisasi');
            $table->string('bagian_yang_dicek');
            $table->string('bagian_yang_direvitalisasi');
            $table->string('bahan_yang_digunakan');
            $table->string('estimasi_biaya_dibutuhkan');
            $table->string('dana_dimiliki');
            $table->string('status_dana');
            $table->string('estimasi_pengerjaan');
            $table->foreign('id_hasil_perhitungan')->references('id')->on('hasil_perhitungan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_hasil_perhitungan');
    }
};
