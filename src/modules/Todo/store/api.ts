import { api, TAGS } from '../../../store/api';
import { BaseResponse, FilterValues, RequestStatus, TodoListItemDto, TodoListSchema } from '../types';
import { fabricaZodTransform } from './utils';

export interface TodoListItem extends TodoListItemDto {
    filter: FilterValues;
    entityStatus: RequestStatus;
}

const { transformCollection } = fabricaZodTransform<TodoListItemDto>(TodoListSchema);

const todoListApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTodoLists: build.query<TodoListItem[], void>({
            query: () => "todo-lists",
            transformResponse: (todoLists: TodoListItemDto[]): TodoListItem[] => processData(transformCollection(todoLists)),
            providesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
        createTodoListItem: build.mutation<BaseResponse<{ item: TodoListItemDto }>, string>({
            query: (title) => ({
                url: '/todo-lists',
                method: 'POST',
                body: {title}
            }),
            invalidatesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
        updateTodoListItem: build.mutation<BaseResponse<{ item: TodoListItemDto }>, TodoListItemDto>({
            query: ({ id, title }) => ({
                url: `/todo-lists/${id}`,
                method: 'PUT',
                body: {title}
            }),
            //todo transform request
            invalidatesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
    })
});

export const {
    useGetTodoListsQuery,
    useCreateTodoListItemMutation,
    useUpdateTodoListItemMutation
} = todoListApi;


export function processData(data: TodoListItemDto[]): TodoListItem[] {
    return data.map((item) => {
        return {
            ...item,
            filter: "all", 
            entityStatus: "idle"
        }
    })
}