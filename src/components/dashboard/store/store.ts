//todo взять из прошлой ДЗ
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { TaskType } from '../../../schemas/task/domain';
import { searchFilter } from './utils';
import { rootReducer } from '../../../store/reducers';
import { FilterType } from '../../../types';


export interface TaskState {
    data: TaskType[];
    filteredData: TaskType[];
    filter: FilterType;
    searchText: string;
}

const initialState: TaskState = {
    data: [] as TaskType[],
    filteredData: [] as TaskType[],
    filter: FilterType.ALL,
    searchText: '' as string
};


function filteredTasks(state) {
    console.log('state', state);
    if (!state) return;
    const {filter, data: tasks} = state;
    switch (filter) {
        case FilterType.ACTIVE: return tasks.filter((item: TaskType) => !item.isCompleted);
        case FilterType.COMPLETED: return tasks.filter((item: TaskType) => item.isCompleted);
        default: return tasks;
    }
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            state.data = action.payload;
        },
        changeTasksFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            state.filteredData = searchFilter(state.data, action.payload);
        },
    },
    selectors: {
        selectState: state => state,
        selectFilteredTasks: filteredTasks
    },
});


export const { actions } = taskSlice;

export const {
    setTasks,
    changeTasksFilter,
    setSearch
} = actions;

const injectedSlice = taskSlice.injectInto(rootReducer);
export const { selectState, selectFilteredTasks } = injectedSlice.selectors;