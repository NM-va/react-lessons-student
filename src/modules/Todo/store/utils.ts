import { ZodType } from 'zod';
import { TodoListItem } from './api';

export function zodParser<T>(schema: ZodType, data: T) {
    const r = schema.safeParse(data);
    if (!r.success) {
        throw new Error(r.error.message);
    }
    return r.data;
}

export function fabricaZodTransform<T>(schema: ZodType) {
    const transform = (r: T) => zodParser<T>(schema, r);
    const transformCollection = (coll: T[]) => coll.map(transform);
    return { transform, transformCollection };
}

export function searchFilter(data: TodoListItem[], searchText: string): TodoListItem[] {
    if (!searchText) {
        return data;
    }

    let trimSearchText = searchText.trim();

    return data.filter((item: TodoListItem) => {
        return item.title.includes(trimSearchText);
    })
}
