import React, { useState } from "react";
import ReactDOM from 'react-dom';

interface ITodoListItems {
    title: string;
    description: string;
};

const TodoList:React.FC = () => {
    const [todoList, setTodoList] = useState<Array<ITodoListItems>>([
        {
            title: "Task 1",
            description: "Testing lorem ipsum",
        },
        {
            title: "Task 2",
            description: "Testing lorem ipsum"
        },
    ]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Todo List</div>
                        <div className="card-body">I'm an example component!</div>
                        {todoList.map((todo) => {
                            return (<h1>{todo.title}</h1>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;

if (document.getElementById('todo-list')) {
    ReactDOM.render(<TodoList />, document.getElementById('todo-list'));
}
