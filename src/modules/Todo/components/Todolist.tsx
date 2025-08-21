import 'react';
import { TodoListItem } from './TodoListItem';
import { useCreateTodoListItemMutation, useGetTodoListsQuery } from '../store/api';
import { TodoListItemDto } from '../types';
import { TodoForm } from './TodoForm';
import React, { useEffect, useState } from 'react';
import { dispatch } from '../../../store';
import { selectState, setSearch, setTodoList } from '../store';
import { useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';

//todo убрать ошибки типов и обработать ошибку zod

export const TodoList:React.FC = () => {
    const {data: todoLists = [], isLoading, error} = useGetTodoListsQuery();
    const [createTodoListItem] = useCreateTodoListItemMutation();
    const { filteredData } = useSelector(selectState);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.currentTarget.value));
    }
    const onCloseModal = () => {
        setIsOpenModal(false);
    }


    //Done ты работаешь с живым поиском и делаешь dispatch для store.ts
    useEffect(() => {
        todoLists.length > 0 && dispatch(setTodoList(todoLists));
    }, [todoLists])

    useEffect(() => {
        if (error) {
            setIsOpenModal(true);
        }
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
                <input type="search" onChange={handleSearch}/>
                <button>Найти</button>
            </div>
            <div>
                {/* Done использовать filteredData */}
                {filteredData?.map((todo: TodoListItemDto) => {
                    // починить ошибки типов
                    return <TodoListItem key={todo.id} todoList={todo}/>
                })}
            </div>

            <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                <div>

                    {(() => {
                        try {
                            const parsedError = typeof error === 'string' ? JSON.parse(error) : error;

                            if (typeof parsedError === 'object' && !Array.isArray(parsedError) && parsedError !== null) {
                                let errorObject = parsedError?.message
                                let parseErrorObject = JSON.parse(errorObject);

                                return parseErrorObject[0].message;
                            }

                            if (Array.isArray(parsedError)) {
                                return parsedError[0].message;
                            }

                            return parsedError?.message || 'Unknown error';
                        } catch {
                            return String(error);
                        }
                    })()}

                </div>
            </Modal>
        </div>
    );
};
