import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../../../store/reducers';
import _cloneDeep from 'lodash/cloneDeep';
import { searchFilter } from './utils';
import { TodoListItem } from './api';

export interface TodoState {
    data: TodoListItem[];
    filteredData: TodoListItem[];
    searchText: string;
    //Done добавить filteredData
    //Done добавить поле search string по которому живой поиск будет
}

const initialState: TodoState = {
    data: [] as TodoListItem[],
    filteredData: [] as TodoListItem[],
    searchText: '' as string
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoList: (state, action: PayloadAction<TodoListItem[]>) => {
            state.data = action.payload;
            //Done добавить логику фильтрации
            //state.filteredData = state.data.filter(....)
            state.filteredData = searchFilter(state.data, state.searchText);
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            state.filteredData = searchFilter(state.data, action.payload);
        },
        //Done добавить setSearch
        addTodoList: (state, action: PayloadAction<Omit<TodoListItem, 'id' | 'addedDate'>>) => {
            const NewTodo: TodoListItem = {
                ...action.payload,
                id: `${Date.now() }`,
                addedDate: new Date().toISOString(),
            }

            state.data.push(NewTodo);
        },
        //todo добавить метод setSearch
        updateTodoList: (state, action: PayloadAction<TodoListItem>) => {
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
    setSearch,
    addTodoList,
    updateTodoList,
    resetState,
    sortData,
} = actions;

const injectedSlice = todoSlice.injectInto(rootReducer);
export const { selectState } = injectedSlice.selectors;