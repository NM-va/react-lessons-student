import 'react';
import { TodoListItem } from './TodoListItem';
import { useCreateTodoListItemMutation, useGetTodoListsQuery } from '../store/api';
import { TodoListItemDto } from '../types';
import { TodoForm } from './TodoForm';
import { useEffect } from 'react';
import { dispatch } from '../../../store';
import { selectState, setTodoList } from '../store';
import { useSelector } from 'react-redux';

//todo убрать ошибки типов и обработать ошибку zod

export const TodoList = () => {
    const {data: todoLists = [], isLoading, error} = useGetTodoListsQuery();
    const [createTodoListItem] = useCreateTodoListItemMutation();
    const { data } = useSelector(selectState)


    //todo ты работаешь с живым поиском и делаешь dispatch для store.ts
    useEffect(() => {
        todoLists.length > 0 && dispatch(setTodoList(todoLists));
    }, [todoLists])

    useEffect(() => {
        error && console.warn(error);
    }, [error]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div style={{'marginBottom': '20px'}}>
                <TodoForm createTodo={createTodoListItem}/>
            </div>
            <div>
                {/* todo использовать filteredData */}
                {data?.map((todo: TodoListItemDto) => {
                    // починить ошибки типов
                    return <TodoListItem key={todo.id} todoList={todo}/>
                })}
            </div>
        </div>
    );
};
