import { api } from './api';
import { combineSlices } from '@reduxjs/toolkit';
import { todoSlice } from '../modules/Todo/store';

export const rootReducer = combineSlices({
    [api.reducerPath]: api.reducer,
    todo: todoSlice
})

// const injectedSlice = todoSlice.injectInto(rootReducer);