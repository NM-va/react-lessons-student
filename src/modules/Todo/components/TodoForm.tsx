import React, { useState } from 'react';
import { BaseResponse, TodoListItemDto } from '../types';

interface TodoFormProps {
    createTodo: (title: string) => Promise<BaseResponse<{ item: TodoListItemDto }>>;
}

export const TodoForm:React.FC<TodoFormProps> = ({createTodo}) => {
    const [title, setTitle] = useState<string>("");

    const createTodoItem = () => {
        const trimTitle = title.trim();
        if (trimTitle !== "") {
            createTodo(trimTitle);
            setTitle("");
        }
    }

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        <div>
            <input type="text" value={title} onChange={changeTitleHandler}/>
            <button onClick={createTodoItem}>Create</button>
        </div>
    );
};
