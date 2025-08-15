import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { rootReducer } from './reducers';

export const TAGS = {
    Task: 'Task',
    TaskList: 'TaskList',
    Category: 'Category',
    User: 'User'
} as const;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
        prepareHeaders: (headers) => {
            headers.set('API-KEY', '3c15bc86-8546-4613-ae33-ca725730696c');
            headers.set("Authorization", "Bearer 2c1f865e-ac01-4292-a792-954d1b1b455b")
            return headers;
        }
    }),
    tagTypes: Object.values(TAGS),
    endpoints: () => ({})
});