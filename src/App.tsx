import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

export enum ActionType {
    EDIT = "edit",
    DELETE = "delete",
    DONE = "done"
}

export enum InputFieldState {
    UPDATE_MODE = "update_mode",
    CREATE_MODE = "create_mode"
}

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputFieldState, setInputFieldState] = useState<InputFieldState>(InputFieldState.CREATE_MODE);
    const [editabletodo, setEditabletodo] = useState<Todo | null>(null);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo && inputFieldState === InputFieldState.CREATE_MODE) {
            setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
        } else if (todo && editabletodo && inputFieldState === InputFieldState.UPDATE_MODE) {
            const todosList = todos.map((d) => {
                if (d.id === editabletodo.id) {
                    return { ...d, todo };
                } else {
                    return d;
                }
            });
            setTodos(todosList);
        }
        setTodo("");
        setInputFieldState(InputFieldState.CREATE_MODE);
        setEditabletodo(null);
    };

    const updateTodos = (todo: Todo, actionType: ActionType) => {
        console.log("hello", todo, actionType);
        if (actionType === ActionType.DONE) {
            const todosList = todos.map((d) => {
                if (d.id === todo.id) {
                    return todo;
                } else {
                    return d;
                }
            });
            setTodos([...todosList]);
        } else if (actionType === ActionType.DELETE) {
            const todosList = todos.filter((d) => d.id !== todo.id);
            setTodos([...todosList]);
        } else if (actionType === ActionType.EDIT) {
            if (todo?.todo) {
                setTodo(todo.todo);
                setEditabletodo(todo);
                setInputFieldState(InputFieldState.UPDATE_MODE);
            }
        }
    };
    return (
        <div className="App">
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList todos={todos} updateTodos={updateTodos} />
        </div>
    );
};

export default App;
