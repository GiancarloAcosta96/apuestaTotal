<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recarga extends Model
{
    use HasFactory;

    protected $primaryKey = 'recargaId';

    protected $fillable = ['playerId', 'monto_recarga', 'banco', 'fecha', 'hora', 'imagen', 'saldoTotal', 'canalAtencion'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'playerId', 'playerId');
    }
}
