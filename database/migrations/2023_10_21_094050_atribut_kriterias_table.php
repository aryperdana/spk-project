<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('atribut_kriterias', function (Blueprint $table) {
            $table->unsignedBigInteger('id_kriteria')->nullable()->change();
            $table->unsignedBigInteger('id_sub_kriteria')->nullable()->change();
            $table->string('score')->nullable()->change();
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