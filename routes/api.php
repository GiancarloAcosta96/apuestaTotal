<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\RecargaController;
use App\Http\Controllers\ImagenController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/clientes', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::get('/recargas', [RecargaController::class, 'index']);
Route::get('/recargas/{playerId}', [RecargaController::class, 'getByPlayerId']);
Route::put('/recargas/{playerId}/{recargaId}', [RecargaController::class, 'update']);
Route::post('/clientes/{playerId}/recargas', [RecargaController::class, 'addRecarga']);
Route::post('/clientes/imagenes', [ImagenController::class, 'subirImagen']);
