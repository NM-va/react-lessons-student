import { api, TAGS } from '../store/api';
import { TaskDtoSchemaInc, TaskIncDto } from '../schemas/task/dto';
import { TaskType } from '../schemas/task/domain';
import { createZodTransform } from '../utils/zodHelpers';
import { transformTaskIncDto } from '../schemas/task/transforms';

const { transform, transformCollection } = createZodTransform<TaskIncDto>(TaskDtoSchemaInc)

export interface TasksFilter {
    status?: 'pending' | 'completed' | 'overdue';
    priority?: 'low' | 'medium' | 'high';
    search?: string;
    category?: number;
    assignedTo?: number;
}

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskType[], string>({
            query: () => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks`
            }),
            transformResponse: (response: TaskIncDto[]): TaskType[] => {
                const dtos = transformCollection(response.items);
                //todo рефакторинг
                return dtos.map(transformTaskIncDto);
            },
            providesTags: (result) => [
                { type: TAGS.TaskList, id: 'LIST' },
                ...(result?.map(task => ({ type: TAGS.Task, id: task.id })) || [])
            ]
        }),
        getTaskId: build.query<TaskType, number>({
            query: (id) => `tasks/${id}`,
            transformResponse: (response: unknown):TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            providesTags: (result, error, id) => [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        // searchTasks: build.query<TaskType[], string>({
        //     query: (searchTerm) => ({
        //         url: 'tasks/search',
        //         params: {q: searchTerm}
        //     }),
        //     transformResponse: (response: unknown[]):TaskType[] => {
        //      const dtos = transformCollection(response);
        //      return dtos.map(transformTaskIncDto);
        //     },
        //     providesTags: (result) => [{type: TAGS.TaskList, id: 'SEARCH'}]
        // }),
        createTask: build.mutation<TaskType[], Partial<TaskType>>({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: transformToTaskIncDto(newTask)
            }),
            transformResponse: (response: unknown):TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        updateTask: build.mutation<TaskType, { id: number; updates: Partial<TaskType> }>({
            query: ({ id, updates }) => ({
                url: `tasks/${id}`,
                method: 'PUT',
                body: transformToTaskIncDto(updates)
            }),
            transformResponse: (response: unknown): TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: (result, error, { id }) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
        deleteTask: build.mutation<void, number>({
            query: ({ id }) => ({
                url: `tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
        filteredTask: build.mutation<TaskType, { id: number; updates: Partial<TaskType> }>({
            query: ({ id, updates }) => ({
                url: `tasks/${id}`,
                method: 'PUT',
                body: transformToTaskIncDto(updates)
            }),
            transformResponse: (response: unknown): TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: (result, error, { id }) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
    })
});

export const {
    useGetTasksQuery,
    useSearchTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;