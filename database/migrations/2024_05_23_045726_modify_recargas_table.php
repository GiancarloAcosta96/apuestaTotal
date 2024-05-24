<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recargas', function (Blueprint $table) {
            $table->decimal('saldoTotal', 8, 2)->nullable()->change();
            $table->string('imagen')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recargas', function (Blueprint $table) {
            $table->decimal('saldoTotal', 8, 2)->nullable(false)->change();
            $table->string('imagen')->nullable(false)->change();
        });
    }
};
