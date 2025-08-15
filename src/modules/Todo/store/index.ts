import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodolistType } from '../types';



export const todoSlice = createSlice({
    name: "todo",
    initialState: [] as TodolistType[],
    reducers: {
        getTodolistsList: (state, action: PayloadAction<TodolistType[]>) => {
            return action.payload
        },
        addTodolist: (state, action: PayloadAction<Omit<TodolistType, 'id' | 'addedDate'>>) => {
            const NewTodo = {
                ...action.payload,
                id: Date.now(),
                addedDate: new Date()
            }

            state.push(NewTodo);
        },
        updateTodolist: (state, action: PayloadAction<TodolistType[]>) => {
            state.find((item) => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title
                }
            })
        }
    },
    selectors: {

    }
});

export const {} = todoSlice.selectors;