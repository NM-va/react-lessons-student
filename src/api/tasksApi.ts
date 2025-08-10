import { api, TAGS } from './baseApi';
import { TaskDto, TaskDtoSchema } from '../schemas/task/dto';
import { Task } from '../schemas/task/domain';
import { createZodTransform } from '../utils/zodHelpers';
import { transformTaskDto, transformToTaskDto } from '../schemas/task/transforms';

const {transform, transformCollection} = createZodTransform(TaskDtoSchema)

export interface TasksFilter {
    status?: 'pending' | 'completed' | 'overdue';
    priority?: 'low' | 'medium' | 'high';
    search?: string;
    category?: number;
    assignedTo?: number;
}

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], TasksFilter>({
            query: () => (filter = {}) => ({
                url: 'tasks',
                params: filter
            }),
            transformResponse: (response: unknown[]):Task[] => {
                const dtos = transformCollection(response);
                return dtos.map(transformTaskDto);
            },
            providesTags: (result) => [
                {type: TAGS.TaskList, id: 'LIST'},
                ...(result?.map(task => ({type: TAGS.Task, id: task.id})) || [])
            ]
        }),
        getTaskId: build.query<Task, number>({
            query: (id) => `tasks/${id}`,
            transformResponse: (response: unknown):Task => {
                const dto = transform(response);
                return transformTaskDto(dto);
            },
            providesTags: (result, error, id) => [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        searchTasks: build.query<Task[], string>({
            query: (searchTerm) => ({
                url: 'tasks/search',
                params: {q: searchTerm}
            }),
            transformResponse: (response: unknown[]):Task[] => {
             const dtos = transformCollection(response);
             return dtos.map(transformTaskDto);
            },
            providesTags: (result) => [{type: TAGS.TaskList, id: 'SEARCH'}]
        }),
        createTask: build.mutation<Task[], Partial<Task>>({
            query: (newTask) => ({
                url: 'tasks',
                method: 'POST',
                body: transformToTaskDto(newTask)
            }),
            transformResponse: (response: unknown):Task => {
                const dto = transform(response);
                return transformTaskDto(dto);
            },
            invalidatesTags: [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        updateTask: build.mutation<Task, {id: number; updates: Partial<Task>}>({
            query: ({id, updates}) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: transformToTaskDto(updates)
            }),
            transformResponse: (response: unknown):Task => {
                const dto = transform(response);
                return transformTaskDto(dto);
            },
            invalidatesTags: (result, error, {id}) => [
                {type: TAGS.Task, id},
                {type: TAGS.TaskList, id: 'LIST'}
            ]
        }),
        deleteTask: build.mutation<void, number>({
            query: ({id}) => ({
                url: `tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                {type: TAGS.Task, id},
                {type: TAGS.TaskList, id: 'LIST'}
            ]
        }),
        bulkUpdateTask: build.mutation<Task[], {ids: number[]; updates: Partial<Task>}>({
            query: ({ids, updates}) => ({
                url: `tasks/bulk-update`,
                method: 'PATCH',
                body: {
                    ids,
                    updates: transformToTaskDto(updates)
                }
            }),
            transformResponse: (response: unknown[]):Task[] => {
                const dtos = transformCollection(response);
                return dtos.map(transformTaskDto);
            },
            invalidatesTags: [{type: TAGS.TaskList, id: 'LIST'}]
        }),
    })
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useSearchTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useBulkUpdateTasksMutation
} = tasksApi;