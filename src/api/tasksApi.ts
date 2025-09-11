import { api, TAGS } from '../store/api';
import { TaskDtoSchemaInc, TaskIncDto, TaskResponseDto, TaskResponseDtoSchema } from '../schemas/task/dto';
import { TaskType } from '../schemas/task/domain';
import { createZodTransform } from '../utils/zodHelpers';
import { transformTaskIncDto, transformToTaskIncDto } from '../schemas/task/transforms';

const { transform, transformCollection } = createZodTransform<TaskIncDto>(TaskDtoSchemaInc)

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
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks`
            }),
            transformResponse: (response: TaskResponseDto): TaskType[] => {
                const dtos = transformCollection(response.items);
                //todo рефакторинг
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
        getTaskId: build.query<TaskType, number>({
            query: (id) => `tasks/${id}`,
            transformResponse: (response: unknown):TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            providesTags: () => [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        searchTasks: build.query<TaskType[], string>({
            query: (searchTerm) => ({
                url: 'tasks/search',
                params: {q: searchTerm}
            }),
            transformResponse: (response: unknown[]):TaskType[] => {
             const dtos = transformCollection(response);
             return dtos.map(transformTaskIncDto);
            },
            providesTags: () => [{type: TAGS.TaskList, id: 'SEARCH'}]
        }),
        //todo createTask на интерфейсе
        createTask: build.mutation<TaskType[], Partial<TaskType>>({
            query: (newTask) => ({
                url: 'todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks',
                method: 'POST',
                body: transformToTaskIncDto(newTask)
            }),
            //todo избавиться от типа response unknown
            transformResponse: (response: any):TaskType => {
                console.log(response);
                const dto = transform(response?.data?.item);
                return transformTaskIncDto(dto);
            },
            invalidatesTags: [{type: TAGS.TaskList, id: 'LIST'}]
        }),
        updateTask: build.mutation<TaskType, TaskType>({
            query: (item: TaskType) => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks/${item.taskId}`,
                method: 'PUT',
                body: transformToTaskIncDto(item)
            }),
            transformResponse: (response: unknown): TaskType => {
                const dto = transform(response);
                return transformTaskIncDto(dto);
            },
            //todo проверить инвалидацию
            invalidatesTags: (result, error, { taskId: id }) => [
                { type: TAGS.Task, id },
                { type: TAGS.TaskList, id: 'LIST' }
            ]
        }),
        deleteTask: build.mutation<void, string>({
            query: (id: string) => ({
                url: `todo-lists/08a7be65-255e-4474-8b72-3b5ec30c2dde/tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
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

//todo добавить processData TaskIncDto преобразуем в TaskInc ( TaskInc идёт в модуль, модуль ничего не знает о TaskIncDto)