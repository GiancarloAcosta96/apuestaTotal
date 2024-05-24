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
        Schema::create('recargas', function (Blueprint $table) {
            $table->decimal('saldoTotal', 8, 2);
            $table->string('canalAtencion');
            $table->id('recargaId');
            $table->string('playerId');
            $table->foreign('playerId')->references('playerId')->on('clientes')->onDelete('cascade');
            $table->decimal('monto_recarga', 8, 2);
            $table->string('banco');
            $table->date('fecha');
            $table->time('hora');
            $table->string('imagen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recargas', function (Blueprint $table) {
            $table->dropColumn('saldoTotal');
            $table->dropColumn('canalAtencion');
        });
    }
};
