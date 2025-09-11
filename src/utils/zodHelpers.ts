import * as z from 'zod';

// Безопасный парсер
export function zodParser<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error;
        throw new Error(`Validation failed: ${errors}`);
    }
    return result.data;
}

// Фабрика трансформеров
export function createZodTransform<T>(schema: z.ZodSchema<T>) {
    const transform = <U = unknown>(data: U): T => zodParser(schema, data);
    
    const transformCollection = <U = unknown>(collection: U[]): T[] =>
        collection
        .map(item => {
            try {
                return transform(item);
            } catch (error) {
                console.warn('Skipped invalid item:', error);
                return null;
            }
        })
        .filter((item): item is T => item !== null);
    
    return { transform, transformCollection };
}

// Работа с датами
export const DateFromString = z.string()
                               .transform(str => new Date(str))
                               .refine(date => !isNaN(date.getTime()), 'Invalid date format');

export const NullableDateFromString = z.string()
                                       .nullable()
                                       .transform(val => val ? new Date(val) : null)
                                       .refine(val => val === null || !isNaN(val.getTime()), 'Invalid date format');