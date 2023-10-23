<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index(Request $request)
    {
        return view('todo-list');
    }

    public function update(Request $request, int $id) {}

    public function delete(Request $request, int $i) {}

    public function store(Request $request) {}
}
