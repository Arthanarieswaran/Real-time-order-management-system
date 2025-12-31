<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

Route::resource('/orders', OrderController::class);
Route::put('/updateStatus/{id}', [OrderController::class, 'updateStatus']);
Route::get('products', [ProductController::class, 'index']);
