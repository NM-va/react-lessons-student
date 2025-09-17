import * as z from 'zod';
import { TaskStatus } from '../../types';

export const TaskDtoSchemaInc = z.object({
    id: z.uuid(),
    todoListId: z.uuid(),
    title: z.string(),
    description: z.string().nullable(),
    startDate: z.coerce.date().nullable(),
    addedDate: z.coerce.date(),
    deadline: z.coerce.string().nullable(),
    order: z.number(),
    status: z.enum(TaskStatus),
    priority: z.number(),
});

export type TaskIncDto = z.infer<typeof TaskDtoSchemaInc>;


export const TaskResponseDtoSchema = z.object({
    totalCount: z.number(),
    error: z.any().nullable(),
    items: z.array(TaskDtoSchemaInc),
});

export type TaskResponseDto = z.infer<typeof TaskResponseDtoSchema>;

export const TaskCreateResponseDtoSchema = z.object({
    data: z.object({
        item: TaskDtoSchemaInc
    }),
    fieldsErrors: z.array(z.object({
        field: z.string(),
        message: z.string()
    })),
    messages: z.array(z.string()),
    resultCode: z.number()
});

export type TaskCreateResponseDto = z.infer<typeof TaskCreateResponseDtoSchema>;

