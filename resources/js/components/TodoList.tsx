import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

interface ITodoListItem {
  id?: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const baseUrl: string = "/api/todo-lists";

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Array<ITodoListItem>>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [fetching, setIsFetching] = useState<boolean>(false);
  const [saving, setIsSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ description: string }>({
    description: "",
  });
  const fetchList = async () => {
    setIsFetching(true);
    await axios.get(baseUrl).then((response: any) => {
      const { data } = response.data;
      setTodoList(data);
    });
    setIsFetching(false);
  };
  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchList();
      setReload(false);
    }
  }, [reload]);

  const handleMarkAsComplete = (id?: number) => {
    axios
      .patch(`${baseUrl}/${id}`, { is_complete: true })
      .then((response: any) => {
        setReload(true);
      });
  };

  const handleDelete = (id?: number) => {
    axios.post(`${baseUrl}/${id}`, { _method: "DELETE" }).then(() => {
      setReload(true);
    });
  };

  const handleAddTodo = async () => {
    setIsSaving(true);
    await axios
      .post(baseUrl, { title, description })
      .then(() => {
        setTitle("");
        setDescription("");
        setReload(true);
      })
      .catch((error: any) => {
        const errors = error.response?.data?.errors;
        if (errors?.description) {
          setErrors({ description: errors.description[0] });
        }
      });
    setIsSaving(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    setErrors({ description: "" });
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="mb-4">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                onChange={handleTitleChange}
                type="text"
                className="form-control"
                id="title"
                placeholder="Add title"
                value={title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={handleDescriptionChange}
                required={true}
                value={description}
                placeholder="Add description"
                className={
                  errors?.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="description"
                rows={2}
              ></textarea>
              {errors?.description ? (
                <div className="invalid-feedback">{errors.description}</div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
        <div className="d-grid gap-2">
          <button
            disabled={saving}
            onClick={() => handleAddTodo()}
            type="submit"
            className="btn btn-primary btn-sm me-3"
          >
            {saving ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              ""
            )}
            Add item
          </button>
        </div>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-7">
        {fetching ? (
          <div className="spinner-border m-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {todoList.map((todo) => {
              return (
                <li
                  key={`todo-${todo.id}`}
                  className={
                    todo?.is_complete
                      ? "list-group-item d-flex justify-content-between align-items-start list-group-item-light"
                      : "list-group-item d-flex justify-content-between align-items-start"
                  }
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{todo.title}</div>
                    {todo.description}
                  </div>
                  {todo?.is_complete ? (
                    <span className="badge bg-success">Completed</span>
                  ) : (
                    <div className="p-3">
                      <button
                        onClick={() => handleMarkAsComplete(todo.id)}
                        type="button"
                        className="btn btn-primary btn-sm me-3"
                      >
                        Mark as complete
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        type="button"
                        className="btn btn-secondary btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;

if (document.getElementById("todo-list")) {
  ReactDOM.render(<TodoList />, document.getElementById("todo-list"));
}
