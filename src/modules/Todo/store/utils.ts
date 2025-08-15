import { ZodSchema } from 'zod';

export function zodParser<T>(schema: ZodSchema, data: T) {
    const r = schema.safeParse(data);
    if (!r.success) {
        throw new Error(r.error.message);
    }
    return r.data;
}

export function fabricaZodTransform<T>(schema: ZodSchema) {
    const transform = (r: T) => zodParser<T>(schema, r);
    const transformCollection = (coll: T[]) => coll.map(transform);
    return { transform, transformCollection };
}
