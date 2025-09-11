import * as z from 'zod';

export const TaskDtoSchemaInc = z.object({
    id: z.uuid(),
    todoListId: z.uuid(),
    title: z.string(),
    description: z.string().nullable(),
    completed: z.boolean().optional(),
    startDate: z.date().nullable(),
    addedDate: z.coerce.date(),
    deadline: z.string().nullable(),
    order: z.number(),
    status: z.number(),
    priority: z.number(),
});

export type TaskIncDto = z.infer<typeof TaskDtoSchemaInc>;


export const TaskResponseDtoSchema = z.object({
    totalCount: z.number(),
    error: z.any().nullable(),
    items: z.array(TaskDtoSchemaInc),
});

export type TaskResponseDto = z.infer<typeof TaskResponseDtoSchema>;
