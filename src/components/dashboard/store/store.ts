//todo взять из прошлой ДЗ
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskType } from '../../../schemas/task/domain';
import { rootReducer } from '../../../store/reducers';
import { FilterType, TaskStatus } from '../../../types';
import { searchFilter } from '../../../utils/search';


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

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            state.data = action.payload;
            state.filteredData = searchFilter<TaskType>(state.data, 'title', state.searchText);
        },
        changeTasksFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload;

            switch (state.filter) {
                case FilterType.ACTIVE:
                    state.filteredData = state.data.filter((item: T) =>
                        item.status !== TaskStatus.COMPLETED
                    );
                    break;
                case FilterType.COMPLETED:
                    state.filteredData = state.data.filter((item: T) =>
                        item.status === TaskStatus.COMPLETED
                    );
                    break;
                default:
                    state.filteredData = state.data;
            }
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            state.filteredData = searchFilter<TaskType>(state.data, 'title', action.payload);
        },
    },
    selectors: {
        selectState: state => state,
        selectFilteredTasks: state => state.filteredData,
        selectFilter: state => state.filter,
    },
});


export const { actions } = taskSlice;

export const {
    setTasks,
    changeTasksFilter,
    setSearch
} = actions;

const injectedSlice = taskSlice.injectInto(rootReducer);
export const { selectState, selectFilteredTasks, selectFilter } = injectedSlice.selectors;