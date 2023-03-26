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
        Schema::create('barangs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_kategori_barang');
            $table->string('nama_barang');
            $table->string('ukuran');
            $table->string('harga');
            $table->integer('diskon');
            $table->integer('stok');
            $table->string('foto_barang');
            $table->foreign('id_kategori_barang')->references('id')->on('kategori_barangs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangs');
    }
};
