import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import { TodoFooter } from './TodoFooter';
import { useUpdateTodoListItemMutation } from '../store/api';


export const TodoListItem:React.FC<TodoListItem> = ({todoList}) => {
    const [updateTodoListItem] = useUpdateTodoListItemMutation();

    return (
        <div style={{'marginBottom': '20px', 'border': '1px solid #000', 'width': '400px', 'padding': '10px', 'borderRadius': '4px'}}>
            <TodoHeader todo={todoList} editTodo={updateTodoListItem} />
            <TodoFooter/>
        </div>
    );
};