import { api, TAGS } from '../store/api';
import {
    TaskCreateResponseDto,
    TaskDtoSchemaInc,
    TaskIncDto,
    TaskResponseDto,
} from '../schemas/task/dto';
import { TaskType } from '../schemas/task/domain';
import { createZodTransform } from '../utils/zodHelpers';
import { transformTaskIncDto, transformToTaskIncDto } from '../schemas/task/transforms';

const { transform, transformCollection } = createZodTransform<TaskIncDto>(TaskDtoSchemaInc);

export interface TasksFilter {
    status?: 'pending' | 'completed' | 'overdue';
    priority?: 'low' | 'medium' | 'high';
    search?: string;
    category?: number;
    assignedTo?: number;
}

export interface TaskInc extends TaskIncDto {
    internalId: number;
    internalTodoListId: number;
}

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskType[], void>({
            query: () => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks`,
            }),
            transformResponse: (response: TaskResponseDto): TaskType[] => {
                const dtos = transformCollection(response.items);
                return dtos.map(transformTaskIncDto);
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                // Принудительное обновление только при изменении аргументов
                return currentArg !== previousArg;
            },
            providesTags: (result) => [
                { type: TAGS.TaskList, id: 'LIST' },
                ...(result?.map(task => ({ type: TAGS.Task, id: task.taskId })) || [])
            ]
        }),

        getTaskById: build.query<TaskType, string>({
            query: (id) => `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks/${id}`,
            transformResponse: (response: TaskIncDto): TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            providesTags: (_result, _error, id) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
        createTask: build.mutation<TaskType, Partial<TaskType>>({
            query: (newTask) => ({
                url: 'todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks',
                method: 'POST',
                body: transformToTaskIncDto(newTask)
            }),
            transformResponse: (response: TaskCreateResponseDto): TaskType => {
                console.log('Create task response:', response);
                const dto = transform(response.data.item);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: [{ type: TAGS.TaskList, id: 'LIST' }]
        }),

        updateTask: build.mutation<TaskType, TaskType>({
            query: (task: TaskType) => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks/${task.taskId}`,
                method: 'PUT',
                body: transformToTaskIncDto(task)
            }),
            transformResponse: (response: TaskCreateResponseDto): TaskType => {
                const dto = transform(response.data.item);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: (_result, _error, { taskId }) => [
                { type: TAGS.Task, id: taskId },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),

        deleteTask: build.mutation<void, string>({
            query: (id: string) => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
    })
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    // useSearchTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;