import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListItemDto } from '../types';
import { rootReducer } from '../../../store/reducers';
import _cloneDeep from 'lodash/cloneDeep';

export interface TodoState {
    data: TodoListItemDto[];
    // добавить filteredData
    // добавить поле search string по которому живой поиск будет
}

const initialState: TodoState = {
    data: [] as TodoListItemDto[],
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoList: (state, action: PayloadAction<TodoListItemDto[]>) => {
            state.data = action.payload;
            //todo добавить логику фильтрации
            //state.filteredData = state.data.filter(....)
        },
        //todo добавить setSearch
        addTodoList: (state, action: PayloadAction<Omit<TodoListItemDto, 'id' | 'addedDate'>>) => {
            const NewTodo: TodoListItemDto = {
                ...action.payload,
                id: `${Date.now() }`,
                addedDate: new Date().toISOString(),
            }

            state.data.push(NewTodo);
        },
        // добавить метод setSearch
        updateTodoList: (state, action: PayloadAction<TodoListItemDto>) => {
            const oldData = state.data;
            const newData = oldData.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        title: action.payload.title
                    }
                }
                return item;
            });
            state.data = newData;
            todoSlice.caseReducers.sortData(state)
        },

        resetState: () => _cloneDeep(initialState),
        sortData: (state: TodoState) => {
            state.data = state.data.sort();
        },
    },
    selectors: {
        selectState: state => state,
    },
});

export const { actions } = todoSlice;

export const {
    setTodoList,
    addTodoList,
    updateTodoList,
    resetState,
    sortData,
} = actions;

const injectedSlice = todoSlice.injectInto(rootReducer);
export const { selectState } = injectedSlice.selectors;