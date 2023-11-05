<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
Schema::table('sub_kriterias', function (Blueprint $table) {
    $table->boolean('is_header')->nullable()->default(false)->change();
});