import React, { useState } from 'react';
import { TodoListItem } from '../store/api';

interface Props {
    todo: TodoListItem;
    editTodo: (payload: TodoListItem) => void;
    onDelete: (id: string) => Promise<void>;
}

const TodoHeader = ({todo, editTodo, onDelete}: Props) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);

    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const editTodoItem = () => {
        setEditMode(prev => !prev);
        setNewTitle(editMode ? todo.title : '');
    }

    const saveNewTitle = () => {
        const trimTitle = newTitle.trim();

        if (!trimTitle || trimTitle === todo.title) {
            setEditMode(false);
            setNewTitle(todo.title);
            return
        }

        if (trimTitle !== "") {
            editTodo(todo);
            setNewTitle("");
            setEditMode(false);
        }
    }

    return (
        <div style={{'marginBottom': '16px', 'borderBottom': '1px solid #000', 'paddingBottom': '10px'}}>
            {!editMode && todo.title }
            {editMode && <input type="text" value={newTitle} onChange={changeTitleHandler}
            onBlur={saveNewTitle}/>}
            <button style={{ 'padding': '4px 8px', 'marginLeft': '20px' }} onClick={editTodoItem}>{!editMode? 'Edit' : 'Cancel' }</button>
            <button style={{ 'padding': '4px 8px', 'marginLeft': '20px' }} onClick={() => onDelete(todo.id)}>{'Delete'}</button>
        </div>
    );
};

export default TodoHeader;