import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import { TodoFooter } from './TodoFooter';
import { useUpdateTodolistItemMutation } from '../store/api';


export const TodolistItem = ({todolist, editTodo}) => {
    const [updateTodolistItem] = useUpdateTodolistItemMutation();

    return (
        <div style={{'marginBottom': '20px', 'border': '1px solid #000', 'width': '400px', 'padding': '10px', 'borderRadius': '4px'}}>
            <TodoHeader todo={todolist} editTodo={updateTodolistItem} />
            <TodoFooter/>
        </div>
    );
};