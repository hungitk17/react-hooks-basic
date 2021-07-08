import logo from './logo.svg';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import PostFiltersForm from './components/PostFiltersForm';
import Pagination from './components/Pagination';
import React, { useState, useEffect } from 'react';
import queryString from "query-string";
//https://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1

function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: "Hello 1" },
        { id: 2, title: "Hello 2" },
        { id: 3, title: "Hello 3" },
    ]);

    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
       _page: 1,
       _limit: 10,
       _totalRows: 1,
    });
    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
    });
    const [showClock, setShowClock] = useState(true);

    useEffect(() => {
        async function fetchPostList() {
            try {
                //npm i --save query-tring chuyen object -> query string
                const paramsString = queryString.stringify(filters);
                const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON });

                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch(error) {
                console.log("Failed to fetch post list: ", error.message);
            }
        }

        fetchPostList();
    }, [filters]);

    useEffect(() => {
        console.log("Effect 2");
    });

    function handleTodoClick(todo) {
        const index = todoList.findIndex(x => x.id === todo.id);
        if(index < 0) return;

        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(fomrValues) {
        //add new todo to current todo list
        const newTodo = {
            id: todoList.length + 1,
            ...fomrValues
        }
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage,
        });
    }

    function handleFiltersChange(newFilters) {
        console.log({newFilters})
        setFilters({
            ...filters,
            page: 1,
            title_like: newFilters.searchTerm
        });
    }

    return (
        <div className="app">
            <h1>React hooks - PostList</h1>
            {showClock && <Clock />}
            <BetterClock />
            <button onClick={() => setShowClock(false)}>Hide Clock</button>

            {/*
            <PostFiltersForm onSubmit={handleFiltersChange} />

            <PostList posts={postList}/>

            <TodoForm onSubmit={handleTodoFormSubmit} />

            <TodoList todos={todoList} onTodoClick={handleTodoClick}/ >

            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />
            */}
        </div>
    );
}

export default App;
