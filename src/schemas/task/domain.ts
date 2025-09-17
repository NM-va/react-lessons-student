import * as z from 'zod';

const TaskSchemaInc = z.object({
    taskId: z.string(),
    todoListId: z.string(),
    title: z.string(),
    description: z.string(),
    createdTimestamp: z.date().nullable(),
    updatedTimestamp: z.date().nullable(),
    dueDate: z.date().nullable(),
    order: z.number(),
    status: z.number(),
    priorityLevel: z.number(),
});

export type TaskType = z.infer<typeof TaskSchemaInc>;