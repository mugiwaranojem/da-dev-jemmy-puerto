<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TodoListRepository;
use App\Http\Resources\TodoListResource;

class TodoListController extends Controller
{
    private TodoListRepository $todoListRepository;

    public function __construct(TodoListRepository $todoListRepository)
    {
        $this->todoListRepository = $todoListRepository;
    }

    public function index(Request $request)
    {
        return view('todo-list');
    }

    public function all(Request $request)
    {
        $todoList = $this->todoListRepository->all();
        return TodoListResource::collection($todoList);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'description' => 'sometimes|required|min:3',
        ]);

        $record = $this->todoListRepository->update($id, $request->all());
        return response()->json($record, 201);
    }

    public function delete(int $id)
    {
        $record = $this->todoListRepository->delete($id);
        return response()->json($record, 201);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required||min:3',
        ]);

        $record = $this->todoListRepository->create($request->all());
        return response()->json($record, 201);
    }
}
