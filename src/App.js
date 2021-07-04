import logo from './logo.svg';
import './App.scss';
import TodoList from './components/TodoList';
import React, { useState } from 'react';

function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: "Hello 1" },
        { id: 2, title: "Hello 2" },
        { id: 3, title: "Hello 3" },
    ]);

    function handleTodoClick(todo) {
        const index = todoList.findIndex(x => x.id === todo.id);
        if(index < 0) return;

        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    return (
        <div className="app">
            <h1>React hooks - TodoList</h1>

            <TodoList todos={todoList} onTodoClick={handleTodoClick}/ >
        </div>
    );
}

export default App;
