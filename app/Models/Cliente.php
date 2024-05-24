<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $primaryKey = 'playerId';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['playerId', 'nombre', 'apellidos', 'dni'];

    public function recargas()
    {
        return $this->hasMany(Recarga::class, 'playerId', 'playerId');
    }
}
