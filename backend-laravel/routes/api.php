<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

// Ruta de salud
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Laravel API',
        'version' => '1.0',
        'timestamp' => now()
    ]);
});

// Rutas API RESTful para productos
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// O también puedes usar apiResource si prefieres:
// Route::apiResource('products', ProductController::class);