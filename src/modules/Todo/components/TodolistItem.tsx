import React  from 'react';
import TodoHeader from './TodoHeader';
import { TodoFooter } from './TodoFooter';
import { TodoListItem, useUpdateTodoListItemMutation } from '../store/api';


interface Props {
    todo: TodoListItem;
    onDelete: (id: string) => Promise<void>;
}

export const TodoListItemComponent:React.FC<Props> = ({todo, onDelete}) => {
    const [updateTodoListItem] = useUpdateTodoListItemMutation();

    const onUpdateTodo = async (payload: TodoListItem) => {
        const resp = await updateTodoListItem(payload).unwrap();
    }

    return (
        <div style={{'marginBottom': '20px', 'border': '1px solid #000', 'width': '400px', 'padding': '10px', 'borderRadius': '4px'}}>
            <TodoHeader todo={todo} editTodo={onUpdateTodo} onDelete={onDelete} />
            <TodoFooter/>
        </div>
    );
};