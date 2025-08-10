import * as z from 'zod';

export const TaskDtoSchema = z.object({
    task_id: z.number().positive(),
    title: z.string(),
    description: z.string(),
    is_completed: z.boolean(),
    priority_level: z.enum(['low', 'medium', 'high']),
    created_timestamp: z.string(),
    updated_timestamp: z.string(),
    due_date_string: z.iso.date(),
    tags_csv: z.string(),
    assigned_user: {
        user_id: z.number().positive(),
        full_name: z.string(),
        avatar_url: z.url()
    },
    category_info: {
        category_id: z.number().positive(),
        category_name: z.string(),
        color_hex: z.string().regex(/^#([0-9A-Fa-f]{6})$/)
    }
});

export type TaskDto = z.infer<typeof TaskDtoSchema>;