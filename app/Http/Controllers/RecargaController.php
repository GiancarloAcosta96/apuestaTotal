<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recarga;

class RecargaController extends Controller
{
    public function index()
    {
        $recargas = Recarga::all();
        $recargas = Recarga::with('cliente')->get();
        return response()->json($recargas);
    }

    public function getByPlayerId($playerId)
    {
        $recargas = Recarga::where('playerId', $playerId)->get();
        return response()->json($recargas);
    }

    public function update(Request $request, $playerId, $recargaId)
    {
        $validatedData = $request->validate([
            'monto_recarga' => 'required|numeric',
            'banco' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i:s',
            'imagen' => 'required|string|max:255'
        ]);

        $recarga = Recarga::where('playerId', $playerId)->where('recargaId', $recargaId)->first();

        if (!$recarga) {
            return response()->json(['message' => 'Recarga no encontrada'], 404);
        }

        $recarga->update($validatedData);
        return response()->json($recarga);
    }

    public function addRecarga(Request $request, $playerId)
    {
        $validatedData = $request->validate([
            'monto_recarga' => 'required|numeric',
            'banco' => 'required|string|max:255',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i:s',
            'canalAtencion' => 'required|string|max:255'
        ]);

        $recarga = Recarga::create(array_merge($validatedData, ['playerId' => $playerId]));
        return response()->json($recarga);
    }
}
