
import { TaskDto } from '../schemas/task/dto';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TAGS = {
    Task: 'Task',
    TaskList: 'TaskList',
    Category: 'Category',
    User: 'User'
} as const;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/projects/688aa0582a52cabb9f4ea607',
    }),
    tagTypes: Object.values(TAGS),
    endpoints: () => ({})
});

