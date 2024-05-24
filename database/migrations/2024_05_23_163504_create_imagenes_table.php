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
        Schema::create('imagenes', function (Blueprint $table) {
            $table->id('imagenId');
            $table->string('playerId', 255);
            $table->foreign('playerId')->references('playerId')->on('clientes')->onDelete('cascade');
            $table->string('imagen');
            $table->timestamps();
        });

        Schema::table('recargas', function (Blueprint $table) {
            $table->dropColumn('saldoTotal');
            $table->dropColumn('imagen');
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
            $table->decimal('saldoTotal', 8, 2)->nullable();
            $table->string('imagen')->nullable();
        });

        Schema::dropIfExists('imagenes');
    }
};
