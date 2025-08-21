import { ZodType } from 'zod';
import { TodoListItemDto } from '../types';

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

export function searchFilter(data: TodoListItemDto[], searchText: string): TodoListItemDto[] {
    if (!searchText) {
        return data;
    }

    let trimSearchText = searchText.trim();

    return data.filter((item: TodoListItemDto) => {
        return item.title.includes(trimSearchText);
    })
}
