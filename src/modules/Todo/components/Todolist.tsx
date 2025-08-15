import React from 'react';
import { TodolistItem } from './TodolistItem';
import { useCreateTodolistItemMutation, useGetTodolistsQuery } from '../store/api';
import { TodolistType } from '../types';
import { TodoForm } from './TodoForm';

export const Todolist = () => {
    const {data: todolists = [], isLoading} = useGetTodolistsQuery();
    const [createTodolistItem] = useCreateTodolistItemMutation();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div style={{'marginBottom': '20px'}}>
                <TodoForm createTodo={createTodolistItem}/>
            </div>
            <div>
                {todolists?.map((todo: TodolistType) => {
                    return <TodolistItem key={todo.id} todolist={todo}/>
                })}
            </div>
        </div>
    );
};
