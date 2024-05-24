<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    use HasFactory;

    protected $fillable = [
        'playerId',
        'imagen',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'playerId', 'playerId');
    }
}
