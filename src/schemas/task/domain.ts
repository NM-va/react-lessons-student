import * as z from 'zod';

const TaskSchema = z.object({
    taskId: z.number().positive(),
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean(),
    priorityLevel: z.enum(['low', 'medium', 'high']),
    createdTimestamp: z.date(),
    updatedTimestamp: z.date(),
    dueDate: z.date(),
    tagsCsv: z.array(z.string()),
    assignedUser: {
        userId: z.number().positive(),
        fullName: z.string(),
        avatarUrl: z.url()
    },
    categoryInfo: {
        categoryId: z.number().positive(),
        categoryName: z.string(),
        colorHex: z.string().regex(/^#([0-9A-Fa-f]{6})$/)
    }
});

export type Task = z.infer<typeof TaskSchema>;

const TaskSchemaInc = z.object({
    taskId: z.number().positive(),
    todoListId: z.number().positive(),
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean(),
    createdTimestamp: z.date().nullable(),
    updatedTimestamp: z.date().nullable(),
    dueDate: z.date().nullable(),
    order: z.number(),
    status: z.number(),
    priorityLevel: z.number(),
});

export type TaskType = z.infer<typeof TaskSchemaInc>;