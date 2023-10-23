<?php   

namespace App\Repositories;

use App\Models\TodoList;
use App\Http\Resources\TodoListResource;
use Illuminate\Database\Eloquent\Model;

class TodoListRepository
{
	/**
     * @var Model
     */
	protected $model;

	public function __construct()
	{
		$this->model = new TodoList;
	}

	/**
    * @param array $attributes
    *
    * @return Model
    */
    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    public function all()
    {
        return $this->model->all();
    }

	/**
    * @param int $id
    * @param array $attributes
    *
    * @return Model
    */
    public function update(int $id, array $attributes): Model
    {
        $model = $this->model->find($id);
        $model->update($attributes);
        return $model;
    }

	/**
    * @param $id
    * @return bool
    */
    public function delete(int $id): bool
    {
        $model = $this->model->find($id);
        return $model->delete($id);
    }
}