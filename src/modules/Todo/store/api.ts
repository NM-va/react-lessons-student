import { api } from '../../../store/api';
import { BaseResponse, DomainTodolist, TodolistType } from '../types';


export const TAGS = {
    Todolist: 'Todolist',
} as const;

const todolistApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => "todo-lists",
            transformResponse: (todolists: TodolistType[]): DomainTodolist[] =>
                todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" })),
            providesTags: [{type: TAGS.Todolist, id: 'TODOLIST'}]
        }),
        createTodolistItem: build.mutation<BaseResponse<{ item: TodolistType }>, string>({
            query: (title) => ({
                url: '/todo-lists',
                method: 'POST',
                body: {title}
            }),
            invalidationTags: [{type: TAGS.Todolist, id: 'TODOLIST'}]
        }),
        updateTodolistItem: build.mutation<BaseResponse<{ item: TodolistType }>, string>({
            query: ({ id, title }) => ({
                url: `/todo-lists/${id}`,
                method: 'PUT',
                body: {title}
            }),
            invalidationTags: [{type: TAGS.Todolist, id: 'TODOLIST'}]
        }),
    })
});

export const {
    useGetTodolistsQuery,
    useCreateTodolistItemMutation,
    useUpdateTodolistItemMutation
} = todolistApi;