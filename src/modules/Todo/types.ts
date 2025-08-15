import { z } from 'zod';

const TodolistSchema = z.object({
    id: z.string(),
    title: z.string(),
    addedDate: z.string(),
    order: z.number()
});

export type TodolistType = z.infer<typeof TodolistSchema>;


const FilterValues = z.enum(['all', 'active', 'completed']);

export type FilterValues = z.infer<typeof FilterValues>;


export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
}

export type DomainTodolist = TodolistType & {
    filter: FilterValues
    entityStatus: RequestStatus
}

const RequestStatus = z.enum(["idle", "loading", "succeeded", "failed"]);
export type RequestStatus = z.infer<typeof RequestStatus>;