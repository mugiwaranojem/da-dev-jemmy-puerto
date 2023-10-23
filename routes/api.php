<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoListController;

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
Route::controller(TodoListController::class)->group(function () {
    Route::get('/todo-lists', 'all');
    Route::post('/todo-lists', 'store');
    Route::patch('/todo-lists/{id}', 'update');
    Route::delete('/todo-lists/{id}', 'delete');
});
