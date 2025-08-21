import { api } from './api';
import { combineSlices } from '@reduxjs/toolkit';

export const rootReducer = combineSlices({
    [api.reducerPath]: api.reducer,
    // Done: todoSlice
})
