import { api, TAGS } from '../../../store/api';
import { BaseResponse, FilterValues, RequestStatus, TodoListItemDto, TodoListSchema } from '../types';
import { fabricaZodTransform } from './utils';

export interface TodoListItem extends TodoListItemDto {
    filter: FilterValues;
    entityStatus: RequestStatus;
}

const { transform, transformCollection } = fabricaZodTransform<TodoListItemDto>(TodoListSchema) as any;

const todoListApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTodoLists: build.query<TodoListItem[], void>({
            query: () => "todo-lists",
            transformResponse: (todoLists: TodoListItemDto[]): TodoListItem[] => processData(transformCollection(todoLists)),
            providesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
        createTodoListItem: build.mutation<TodoListItem, string>({
            query: (title) => ({
                url: '/todo-lists',
                method: 'POST',
                body: {title}
            }),
            invalidatesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}],
            transformResponse: (resp: BaseResponse<{ item: TodoListItemDto }>): TodoListItem => {
                return processData([transform(resp.data.item)])[0];
            },
        }),
        updateTodoListItem: build.mutation<BaseResponse<{ item: TodoListItemDto }>, TodoListItem>({
            query: ({ id, title }) => {
                console.log('query params:', { id, title });
                return ({
                    url: `/todo-lists/${id}`,
                    method: 'PUT',
                    body: {title} // todo обратный процессинг processActionData()
                })
            },
            invalidatesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
        deleteItem: build.mutation<void, string>({
            query: (id: string) => {
                return ({
                    url: `/todo-lists/${id}`,
                    method: 'DELETE',
                })
            },
            invalidatesTags: [{type: TAGS.TodoList, id: 'TODOLIST'}]
        }),
    })
});

export const {
    useGetTodoListsQuery,
    useCreateTodoListItemMutation,
    useUpdateTodoListItemMutation,
    useDeleteItemMutation
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

export function processActionData(data: TodoListItem): TodoListItemDto {
    const {filter, entityStatus, ...dtoData} = data;

    //todo здесь можно преобразовать дату из JS в ISO string

    return {
        ...dtoData
    }
}