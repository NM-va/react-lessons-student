// components/TaskForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../api/tasksApi';
import { Task } from '../../schemas/task/domain';

// Схема валидации формы
const TaskFormSchema = z.object({
    title: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
    description: z.string().max(500, 'Максимум 500 символов'),
    priority: z.enum(['low', 'medium', 'high']),
    dueDate: z.string().min(1, 'Дата обязательна'),
    tags: z.string().optional(),
    categoryId: z.number().min(1, 'Выберите категорию')
});

type TaskFormData = z.infer<typeof TaskFormSchema>;

interface TaskFormProps {
    task?: Task;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess, onCancel }) => {
    const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    
    const isEditing = !!task;
    const isLoading = isCreating || isUpdating;
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<TaskFormData>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: task ? {
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate.toISOString().split('T')[0],
            tags: task.tags.join(', '),
            categoryId: task.category.id
        } : {
            priority: 'medium',
            dueDate: new Date().toISOString().split('T')[0]
        }
    });
    
    const onSubmit = async (data: TaskFormData) => {
        try {
            const taskData = {
                title: data.title,
                description: data.description,
                priority: data.priority,
                dueDate: new Date(data.dueDate),
                tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
                // В реальном приложении categoryId преобразуется в category объект
            };
            
            if (isEditing) {
                await updateTask({
                    id: task.id,
                    updates: taskData
                }).unwrap();
            } else {
                await createTask(taskData).unwrap();
            }
            
            reset();
            onSuccess?.();
        } catch (error) {
            console.error('Ошибка сохранения задачи:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-form">
            <h2>{isEditing ? 'Редактировать задачу' : 'Новая задача'}</h2>
            
            <div className="form-group">
                <label htmlFor="title">Название*</label>
                <input
                    {...register('title')}
                    type="text"
                    id="title"
                    placeholder="Введите название задачи"
                />
                {errors.title && <span className="error">{errors.title.message}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea
                    {...register('description')}
                    id="description"
                    rows={3}
                    placeholder="Подробное описание задачи"
                />
                {errors.description && <span className="error">{errors.description.message}</span>}
            </div>
            
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="priority">Приоритет*</label>
                    <select {...register('priority')} id="priority">
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                    {errors.priority && <span className="error">{errors.priority.message}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="dueDate">Срок выполнения*</label>
                    <input
                        {...register('dueDate')}
                        type="date"
                        id="dueDate"
                    />
                    {errors.dueDate && <span className="error">{errors.dueDate.message}</span>}
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="tags">Теги</label>
                <input
                    {...register('tags')}
                    type="text"
                    id="tags"
                    placeholder="работа, срочно, проект (через запятую)"
                />
            </div>
            
            <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : (isEditing ? 'Обновить' : 'Создать')}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
};