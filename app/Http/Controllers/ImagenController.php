<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagenController extends Controller
{
    public function subirImagen(Request $request)
    {
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'playerId' => 'required', 
        ]);

        $imagen = $request->file('imagen')->store('imagenes');

        
        $imagen = new Imagen();
        $imagen->playerId = $request->playerId;
        $imagen->imagen = $imagen;
        $imagen->save();

        return response()->json(['url' => asset($imagen)], 200); 
    }
}
