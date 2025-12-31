<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');
Broadcast::routes();