import React from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
    todos: Todo[];
    updateTodos: Function
}

const pendingTodos = (
    todos: Todo[],
    updateTodos: Function
) => {
    return todos
        .filter((todo) => !todo.isDone)
        .map((todo) => {
            return <SingleTodo todo={todo} key={todo.id} todos={todos}  updateTodos={updateTodos}/>;
        });
};
const completedTodos = (
    todos: Todo[],
    updateTodos: Function
) => {
    return todos
        .filter((todo) => todo.isDone)
        .map((todo) => {
            return <SingleTodo todo={todo} key={todo.id} todos={todos}  updateTodos={updateTodos} />;
        });
};

const TodoList = ({ todos, updateTodos }: Props) => {
    return (
        <div className="todos">
            {/* {todos.map((todo:Todo) => (
                <SingleTodo 
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                />     
            ))} */}
            <div className="pending">{pendingTodos(todos, updateTodos)}</div>
            <div className="done">{completedTodos(todos,  updateTodos)}</div>
        </div>
    );
};

export default TodoList;
