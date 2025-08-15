import { z } from 'zod';

export const TodoListSchema = z.object({
    id: z.string(),
    title: z.string(),
    addedDate: z.string(),
    order: z.number()
});

export type TodoListItemDto = z.infer<typeof TodoListSchema>;


const FilterValues = z.enum(['all', 'active', 'completed']);

export type FilterValues = z.infer<typeof FilterValues>;


export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}

const RequestStatus = z.enum(["idle", "loading", "succeeded", "failed"]);
export type RequestStatus = z.infer<typeof RequestStatus>;