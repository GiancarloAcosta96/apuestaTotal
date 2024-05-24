<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::withSum('recargas', 'monto_recarga')->get();

        return response()->json($clientes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'dni' => 'required|string|max:255|unique:clientes',
        ]);
        $validatedData['playerId'] = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        //fecha de creación
        $validatedData['fecha_creacion'] = now();

        $cliente = Cliente::create($validatedData);

        return response()->json($cliente, 201);
    }
}