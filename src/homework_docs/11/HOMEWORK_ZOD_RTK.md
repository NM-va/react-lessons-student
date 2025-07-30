# Домашнее задание: Zod + RTK Query - Todo API

## 🎯 Цель задания

Создать полнофункциональное приложение для управления задачами (Todo App) с использованием **Zod** для валидации данных и **RTK Query** для работы с API. Научиться создавать типобезопасную архитектуру обработки данных от сервера до UI.

---

## 📋 Техническое задание

### Базовые требования

#### 1. API Endpoints (моковые данные)

Реализовать следующие эндпоинты:

```typescript
GET    /tasks           // Получить список задач
GET    /tasks/:id       // Получить задачу по ID  
POST   /tasks           // Создать новую задачу
PATCH  /tasks/:id       // Обновить задачу
DELETE /tasks/:id       // Удалить задачу
GET    /tasks/search    // Поиск задач по тексту
```

#### 2. Структура данных от "сервера" (DTO)

```json
{
  "task_id": 1,
  "title": "Complete the project",
  "description": "Finish all remaining tasks for the React course",
  "is_completed": false,
  "priority_level": "high",
  "created_timestamp": "2024-01-15T10:30:00Z",
  "updated_timestamp": "2024-01-16T15:45:00Z", 
  "due_date_string": "2024-01-20",
  "tags_csv": "work,urgent,project",
  "assigned_user": {
    "user_id": 123,
    "full_name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  },
  "category_info": {
    "category_id": 5,
    "category_name": "Development",
    "color_hex": "#3498db"
  }
}
```

---

## 🛠️ Технические требования

### Часть 1: Zod схемы и валидация

#### A. DTO Schema (обязательно)

Создайте схему для валидации данных от сервера:

```typescript
// schemas/task/dto.ts
import { z } from 'zod';

export const TaskDtoSchema = z.object({
  task_id: z.number().positive(),
  title: z.string().min(1, 'Название не может быть пустым'),
  description: z.string(),
  is_completed: z.boolean(),
  priority_level: z.enum(['low', 'medium', 'high']),
  created_timestamp: z.string(), // UTC строка
  updated_timestamp: z.string(), // UTC строка  
  due_date_string: z.string(),   // Дата в формате YYYY-MM-DD
  tags_csv: z.string(),          // Строка с тегами через запятую
  assigned_user: z.object({
    user_id: z.number(),
    full_name: z.string(),
    avatar_url: z.string().url().nullable()
  }).nullable(),
  category_info: z.object({
    category_id: z.number(),
    category_name: z.string(),
    color_hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Некорректный HEX цвет')
  })
});

export type TaskDto = z.infer<typeof TaskDtoSchema>;
```

#### B. Domain Schema (обязательно)

Создайте схему для использования в UI:

```typescript
// schemas/task/domain.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date(),
  tags: z.array(z.string()),
  assignedUser: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().nullable()
  }).nullable(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string()
  }),
  
  // Вычисляемые поля
  isOverdue: z.boolean(),
  daysUntilDue: z.number(),
  status: z.enum(['pending', 'urgent', 'overdue', 'completed']),
  displayPriority: z.string(),
  formattedDueDate: z.string()
});

export type Task = z.infer<typeof TaskSchema>;
```

#### C. Трансформации (обязательно)

Реализуйте функции преобразования:

```typescript
// schemas/task/transforms.ts
```typescript
// schemas/task/transforms.ts
import { TaskDto, Task } from './types';

export const transformTaskDto = (dto: TaskDto): Task => {
  const now = new Date();
  const dueDate = new Date(dto.due_date_string);
  const createdAt = new Date(dto.created_timestamp);
  const updatedAt = new Date(dto.updated_timestamp);
  
  // Вычисляем количество дней до срока
  const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Определяем статус задачи
  const getTaskStatus = (): Task['status'] => {
    if (dto.is_completed) return 'completed';
    if (dueDate < now) return 'overdue';
    if (daysUntilDue <= 1) return 'urgent';
    return 'pending';
  };
  
  // Форматируем приоритет для отображения
  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний', 
    high: 'Высокий'
  };
  
  return {
    id: dto.task_id,
    title: dto.title,
    description: dto.description,
    isCompleted: dto.is_completed,
    priority: dto.priority_level,
    createdAt,
    updatedAt,
    dueDate,
    tags: dto.tags_csv.split(',').map(tag => tag.trim()).filter(Boolean),
    assignedUser: dto.assigned_user ? {
      id: dto.assigned_user.user_id,
      name: dto.assigned_user.full_name,
      avatar: dto.assigned_user.avatar_url
    } : null,
    category: {
      id: dto.category_info.category_id,
      name: dto.category_info.category_name,
      color: dto.category_info.color_hex
    },
    
    // Вычисляемые поля
    isOverdue: dueDate < now && !dto.is_completed,
    daysUntilDue,
    status: getTaskStatus(),
    displayPriority: priorityLabels[dto.priority_level],
    formattedDueDate: dueDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  };
};

// Обратная трансформация для отправки на сервер
export const transformToTaskDto = (task: Partial<Task>): Partial<TaskDto> => {
  const dto: Partial<TaskDto> = {};
  
  if (task.title) dto.title = task.title;
  if (task.description) dto.description = task.description;
  if (task.isCompleted !== undefined) dto.is_completed = task.isCompleted;
  if (task.priority) dto.priority_level = task.priority;
  if (task.dueDate) dto.due_date_string = task.dueDate.toISOString().split('T')[0];
  if (task.tags) dto.tags_csv = task.tags.join(',');
  
  return dto;
};
```

### Часть 2: RTK Query API

#### A. Базовая настройка (обязательно)

```typescript
// api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TAGS = {
  Task: 'Task',
  TaskList: 'TaskList',
  Category: 'Category',
  User: 'User'
} as const;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    // Симуляция задержки сети
    fetchFn: async (url, options) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return fetch(url, options);
    }
  }),
  tagTypes: Object.values(TAGS),
  endpoints: () => ({})
});
```

#### B. Tasks API (обязательно)

```typescript
// api/tasksApi.ts
import { api, TAGS } from './baseApi';
import { TaskDtoSchema, transformTaskDto, transformToTaskDto } from '../schemas/task';
import { createZodTransform } from '../utils/zodHelpers';

const { transform, transformCollection } = createZodTransform(TaskDtoSchema);

export interface TasksFilter {
  status?: 'pending' | 'completed' | 'overdue';
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  category?: number;
  assignedTo?: number;
}

export const tasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получение списка задач с фильтрацией
    getTasks: build.query<Task[], TasksFilter>({
      query: (filter = {}) => ({
        url: 'tasks',
        params: filter
      }),
      transformResponse: (response: unknown[]): Task[] => {
        const dtos = transformCollection(response);
        return dtos.map(transformTaskDto);
      },
      providesTags: (result) => [
        { type: TAGS.TaskList, id: 'LIST' },
        ...(result?.map(task => ({ type: TAGS.Task, id: task.id })) || [])
      ]
    }),

    // Получение задачи по ID
    getTaskById: build.query<Task, number>({
      query: (id) => `tasks/${id}`,
      transformResponse: (response: unknown): Task => {
        const dto = transform(response);
        return transformTaskDto(dto);
      },
      providesTags: (result, error, id) => [{ type: TAGS.Task, id }]
    }),

    // Поиск задач
    searchTasks: build.query<Task[], string>({
      query: (searchTerm) => ({
        url: 'tasks/search',
        params: { q: searchTerm }
      }),
      transformResponse: (response: unknown[]): Task[] => {
        const dtos = transformCollection(response);
        return dtos.map(transformTaskDto);
      },
      providesTags: [{ type: TAGS.TaskList, id: 'SEARCH' }]
    }),

    // Создание новой задачи
    createTask: build.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'tasks',
        method: 'POST',
        body: transformToTaskDto(newTask)
      }),
      transformResponse: (response: unknown): Task => {
        const dto = transform(response);
        return transformTaskDto(dto);
      },
      invalidatesTags: [{ type: TAGS.TaskList, id: 'LIST' }]
    }),

    // Обновление задачи
    updateTask: build.mutation<Task, { id: number; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: transformToTaskDto(updates)
      }),
      transformResponse: (response: unknown): Task => {
        const dto = transform(response);
        return transformTaskDto(dto);
      },
      invalidatesTags: (result, error, { id }) => [
        { type: TAGS.Task, id },
        { type: TAGS.TaskList, id: 'LIST' }
      ]
    }),

    // Удаление задачи
    deleteTask: build.mutation<void, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: TAGS.Task, id },
        { type: TAGS.TaskList, id: 'LIST' }
      ]
    }),

    // Массовое обновление статуса
    bulkUpdateTasks: build.mutation<Task[], { ids: number[]; updates: Partial<Task> }>({
      query: ({ ids, updates }) => ({
        url: 'tasks/bulk-update',
        method: 'PATCH',
        body: { 
          ids, 
          updates: transformToTaskDto(updates) 
        }
      }),
      transformResponse: (response: unknown[]): Task[] => {
        const dtos = transformCollection(response);
        return dtos.map(transformTaskDto);
      },
      invalidatesTags: [{ type: TAGS.TaskList, id: 'LIST' }]
    })
  })
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useSearchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useBulkUpdateTasksMutation
} = tasksApi;
```

### Часть 3: UI Компоненты

#### A. TaskList компонент (обязательно)

```typescript
// components/TaskList.tsx
import React, { useState } from 'react';
import { useGetTasksQuery } from '../api/tasksApi';
import { TasksFilter } from '../types';
import { TaskItem } from './TaskItem';
import { TaskFilters } from './TaskFilters';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export const TaskList: React.FC = () => {
  const [filters, setFilters] = useState<TasksFilter>({});
  
  const {
    data: tasks,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetTasksQuery(filters);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!tasks?.length) return <EmptyTaskList />;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Мои задачи ({tasks.length})</h2>
        <TaskFilters filters={filters} onFiltersChange={setFilters} />
        {isFetching && <span className="refresh-indicator">Обновление...</span>}
      </div>
      
      <div className="task-grid">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
```

#### B. TaskItem компонент (обязательно)

```typescript
// components/TaskItem.tsx
import React from 'react';
import { Task } from '../types';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../api/tasksApi';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleToggleComplete = async () => {
    try {
      await updateTask({
        id: task.id,
        updates: { isCompleted: !task.isCompleted }
      }).unwrap();
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Удалить задачу?')) return;
    
    try {
      await deleteTask(task.id).unwrap();
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107', 
      high: '#dc3545'
    };
    return colors[priority];
  };

  const getStatusColor = (status: Task['status']) => {
    const colors = {
      pending: '#6c757d',
      urgent: '#fd7e14',
      overdue: '#dc3545',
      completed: '#28a745'
    };
    return colors[status];
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''} ${task.status}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggleComplete}
          disabled={isUpdating}
        />
        <h3 className="task-title">{task.title}</h3>
        
        <div className="task-badges">
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.displayPriority}
          </span>
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
        </div>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <div className="task-dates">
          <span>Срок: {task.formattedDueDate}</span>
          {task.isOverdue && (
            <span className="overdue-warning">
              Просрочено на {Math.abs(task.daysUntilDue)} дн.
            </span>
          )}
          {!task.isOverdue && task.daysUntilDue >= 0 && (
            <span>Осталось: {task.daysUntilDue} дн.</span>
          )}
        </div>

        {task.assignedUser && (
          <div className="assigned-user">
            {task.assignedUser.avatar && (
              <img 
                src={task.assignedUser.avatar} 
                alt={task.assignedUser.name}
                className="user-avatar"
              />
            )}
            <span>{task.assignedUser.name}</span>
          </div>
        )}
      </div>

      <div className="task-tags">
        {task.tags.map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="task-category">
        <span 
          className="category-badge"
          style={{ backgroundColor: task.category.color }}
        >
          {task.category.name}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={() => /* открыть модал редактирования */}>
          Редактировать
        </button>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="delete-button"
        >
          {isDeleting ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
    </div>
  );
};
```

#### C. TaskForm компонент (обязательно)

```typescript
// components/TaskForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../api/tasksApi';
import { Task } from '../types';

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
```

---

## 🎯 Дополнительные задания (бонус)

### 🚀 Продвинутые возможности (+15%)

#### 1. Оптимистичные обновления

```typescript
// Обновление задачи с оптимистичным UI
const updateTask = build.mutation<Task, { id: number; updates: Partial<Task> }>({
  query: ({ id, updates }) => ({
    url: `tasks/${id}`,
    method: 'PATCH',
    body: transformToTaskDto(updates)
  }),
  
  // Оптимистичное обновление
  onQueryStarted: async ({ id, updates }, { dispatch, queryFulfilled }) => {
    // Обновляем отдельную задачу
    const patchResult = dispatch(
      tasksApi.util.updateQueryData('getTaskById', id, (draft) => {
        Object.assign(draft, updates);
      })
    );
    
    // Обновляем список задач
    const listPatchResult = dispatch(
      tasksApi.util.updateQueryData('getTasks', {}, (draft) => {
        const taskIndex = draft.findIndex(task => task.id === id);
        if (taskIndex >= 0) {
          Object.assign(draft[taskIndex], updates);
        }
      })
    );
    
    try {
      await queryFulfilled;
    } catch {
      // Откатываем изменения при ошибке
      patchResult.undo();
      listPatchResult.undo();
    }
  }
});
```

#### 2. Infinite Scroll для больших списков

```typescript
// Компонент с бесконечной прокруткой
const InfiniteTaskList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  
  const { data, isLoading, isFetching } = useGetTasksQuery({ 
    page, 
    limit: 20 
  });
  
  useEffect(() => {
    if (data) {
      setAllTasks(prev => page === 1 ? data : [...prev, ...data]);
    }
  }, [data, page]);
  
  const loadMore = useCallback(() => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  }, [isFetching]);
  
  // Intersection Observer для автозагрузки
  const { ref } = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !isLoading && !isFetching
  });
  
  return (
    <div>
      {allTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
      
      <div ref={ref} className="load-more-trigger">
        {isFetching && <LoadingSpinner />}
      </div>
    </div>
  );
};
```

#### 3. Real-time обновления через WebSocket

```typescript
// WebSocket интеграция с RTK Query
const useTaskRealtimeUpdates = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/tasks');
    
    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      
      switch (type) {
        case 'TASK_UPDATED':
          // Обновляем кэш с новыми данными
          dispatch(
            tasksApi.util.updateQueryData('getTaskById', data.id, () => data)
          );
          break;
          
        case 'TASK_DELETED':
          // Инвалидируем кэш
          dispatch(
            tasksApi.util.invalidateTags([{ type: 'Task', id: data.id }])
          );
          break;
      }
    };
    
    return () => ws.close();
  }, [dispatch]);
};
```

### 📊 Аналитика и статистика (+10%)

#### TaskStats компонент

```typescript
// Компонент со статистикой
const TaskStats: React.FC = () => {
  const { data: tasks } = useGetTasksQuery({});
  
  const stats = useMemo(() => {
    if (!tasks) return null;
    
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.isCompleted).length,
      overdue: tasks.filter(t => t.isOverdue).length,
      urgent: tasks.filter(t => t.status === 'urgent').length,
      
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      },
      
      completionRate: tasks.length > 0 
        ? Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100)
        : 0
    };
  }, [tasks]);
  
  if (!stats) return <LoadingSpinner />;
  
  return (
    <div className="task-stats">
      <h3>Статистика задач</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Всего задач</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Выполнено</span>
        </div>
        
        <div className="stat-card overdue">
          <span className="stat-value">{stats.overdue}</span>
          <span className="stat-label">Просрочено</span>
        </div>
        
        <div className="stat-card urgent">
          <span className="stat-value">{stats.urgent}</span>
          <span className="stat-label">Срочные</span>
        </div>
      </div>
      
      <div className="completion-rate">
        <span>Процент выполнения: {stats.completionRate}%</span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
      
      <div className="priority-breakdown">
        <h4>По приоритету:</h4>
        <ul>
          <li>Высокий: {stats.byPriority.high}</li>
          <li>Средний: {stats.byPriority.medium}</li>
          <li>Низкий: {stats.byPriority.low}</li>
        </ul>
      </div>
    </div>
  );
};
```

### 🔄 Offline поддержка (+15%)

```typescript
// Offline синхронизация
const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingMutations, setPendingMutations] = useState<PendingMutation[]>([]);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Синхронизируем отложенные мутации
      syncPendingMutations();
    };
    
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  const syncPendingMutations = async () => {
    for (const mutation of pendingMutations) {
      try {
        await executeMutation(mutation);
        // Удаляем успешно выполненную мутацию
        setPendingMutations(prev => prev.filter(m => m.id !== mutation.id));
      } catch (error) {
        console.error('Ошибка синхронизации:', error);
      }
    }
  };
  
  return { isOnline, pendingMutations };
};
```

---

## 📋 Критерии оценки

### Базовый уровень (70-79 баллов)

- ✅ Zod схемы для DTO и Domain моделей
- ✅ RTK Query API с основными CRUD операциями  
- ✅ Базовые UI компоненты (TaskList, TaskItem, TaskForm)
- ✅ transformResponse во всех запросах
- ✅ Система тегов с корректной инвалидацией
- ✅ Обработка loading и error состояний

### Хороший уровень (80-89 баллов)

- ✅ Все базовые требования
- ✅ Расширенные трансформации дат и вычисляемые поля
- ✅ Поиск и фильтрация задач
- ✅ Валидация форм с помощью react-hook-form + Zod
- ✅ Обработка ошибок валидации
- ✅ Типизация всех API методов

### Отличный уровень (90-100 баллов)

- ✅ Все предыдущие требования
- ✅ Минимум 2 дополнительных задания из бонусных
- ✅ Хорошая архитектура и организация кода
- ✅ Comprehensive тестирование схем и API
- ✅ Отличный UX с анимациями и фидбеком
- ✅ Документация решений

### Превосходный уровень (100+ баллов)

- ✅ Все отличные требования
- ✅ Минимум 4 дополнительных задания
- ✅ Инновационные решения и подходы
- ✅ Production-ready код
- ✅ Презентация архитектурных решений

---

## 📤 Формат сдачи

### Обязательные файлы

1. **GitHub репозиторий** с полным исходным кодом
2. **README.md** с подробной документацией:

   ```markdown
   # Todo App - Zod + RTK Query
   
   ## Описание проекта
   [Краткое описание функциональности]
   
   ## Технологии
   - React 18 + TypeScript
   - RTK Query для API
   - Zod для валидации
   - [Другие библиотеки]
   
   ## Установка и запуск
   ```bash
   npm install
   npm start
   ```

   ## Архитектура

   [Описание структуры проекта и ключевых решений]

   ## API Endpoints

   [Документация эндпоинтов]

   ## Схемы данных

   [Примеры DTO и Domain схем]

   ## Демо

   [Ссылка на live демо или скриншоты]

   ```

3. **IMPLEMENTATION.md** - техническое описание решений:

   ```markdown
   # Техническая документация
   
   ## Zod схемы
   ### Почему выбрана такая структура трансформаций?
   [Обоснование решений]
   
   ## RTK Query архитектура
   ### Система тегов
   [Как организована инвалидация]
   
   ### Обработка ошибок
   [Стратегия error handling]
   
   ## Сложности и их решения
   [Проблемы, с которыми столкнулись, и как решили]
   
   ## Возможные улучшения
   [Что можно было бы сделать лучше]
   ```

4. **Демо материалы** (один из вариантов):
   - 🎬 Видео демонстрация (2-3 минуты)
   - 🌐 Live демо на Vercel/Netlify
   - 📸 Скриншоты основного функционала

### Структура проекта

```
src/
├── api/
│   ├── baseApi.ts          # Базовая настройка RTK Query
│   ├── tasksApi.ts         # API для задач
│   └── mockApi.ts          # Моковые данные (опционально)
├── schemas/
│   ├── task/
│   │   ├── dto.ts          # DTO схемы
│   │   ├── domain.ts       # Domain схемы
│   │   ├── transforms.ts   # Функции трансформации
│   │   └── index.ts        # Переэкспорт
├── components/
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   ├── TaskFilters.tsx
│   ├── TaskStats.tsx       # Если реализуете бонус
│   └── common/
│       ├── LoadingSpinner.tsx
│       ├── ErrorMessage.tsx
│       └── EmptyState.tsx
├── hooks/
│   ├── useTaskFilters.ts   # Логика фильтрации
│   ├── useTaskStats.ts     # Статистика
│   └── useOfflineSync.ts   # Если реализуете offline
├── utils/
│   ├── zodHelpers.ts       # Утилиты для Zod
│   ├── dateUtils.ts        # Работа с датами
│   └── constants.ts        # Константы
├── types/
│   ├── api.ts              # API типы
│   ├── task.ts             # Типы задач
│   └── index.ts            # Переэкспорт
├── styles/
│   ├── components/         # Стили компонентов
│   ├── base.css           # Базовые стили
│   └── variables.css      # CSS переменные
└── App.tsx
```

---

## 🧪 Тестирование (бонус +10%)

### Unit тесты для схем

```typescript
// __tests__/schemas/task.test.ts
import { TaskDtoSchema, transformTaskDto } from '../schemas/task';

describe('TaskDtoSchema', () => {
  it('should validate correct task DTO', () => {
    const validDto = {
      task_id: 1,
      title: 'Test Task',
      description: 'Test Description',
      is_completed: false,
      priority_level: 'high',
      created_timestamp: '2024-01-15T10:30:00Z',
      updated_timestamp: '2024-01-16T15:45:00Z',
      due_date_string: '2024-01-20',
      tags_csv: 'work,urgent',
      assigned_user: {
        user_id: 123,
        full_name: 'John Doe',
        avatar_url: 'https://example.com/avatar.jpg'
      },
      category_info: {
        category_id: 5,
        category_name: 'Development',
        color_hex: '#3498db'
      }
    };

    const result = TaskDtoSchema.safeParse(validDto);
    expect(result.success).toBe(true);
  });

  it('should reject invalid priority', () => {
    const invalidDto = {
      // ... other valid fields
      priority_level: 'invalid'
    };

    const result = TaskDtoSchema.safeParse(invalidDto);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].path).toContain('priority_level');
  });
});

describe('transformTaskDto', () => {
  it('should correctly transform DTO to domain model', () => {
    const dto = {
      task_id: 1,
      title: 'Test Task',
      // ... other fields
      tags_csv: 'work, urgent, project',
      due_date_string: '2024-01-20'
    };

    const result = transformTaskDto(dto);
    
    expect(result.id).toBe(1);
    expect(result.title).toBe('Test Task');
    expect(result.tags).toEqual(['work', 'urgent', 'project']);
    expect(result.dueDate).toBeInstanceOf(Date);
  });

  it('should calculate isOverdue correctly', () => {
    const yesterdayDto = {
      // ... other fields
      due_date_string: '2023-01-01', // Past date
      is_completed: false
    };

    const result = transformTaskDto(yesterdayDto);
    expect(result.isOverdue).toBe(true);
  });
});
```

### Integration тесты для API

```typescript
// __tests__/api/tasksApi.test.ts
import { setupApiStore } from '../test-utils';
import { tasksApi } from '../api/tasksApi';

describe('tasksApi', () => {
  it('should fetch tasks and transform them correctly', async () => {
    const store = setupApiStore(tasksApi);
    
    // Mock fetch response
    const mockResponse = [
      {
        task_id: 1,
        title: 'Test Task',
        // ... other DTO fields
      }
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const result = await store.dispatch(
      tasksApi.endpoints.getTasks.initiate({})
    );

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      id: 1,
      title: 'Test Task'
    });
  });
});
```

---

## 🎯 Защита проекта

### Формат защиты (10-15 минут)

1. **Демонстрация (5 минут)**
   - Показать основной функционал
   - Продемонстрировать работу валидации
   - Показать обработку ошибок

2. **Техническое объяснение (5 минут)**
   - Архитектура Zod схем
   - Организация RTK Query API
   - Система тегов и инвалидация

3. **Ответы на вопросы (5 минут)**
   - Почему выбрали такой подход к трансформациям?
   - Как организована система тегов?
   - Какие сложности возникли и как решали?

### Возможные вопросы

**Zod:**

- Почему разделили DTO и Domain схемы?
- Как обрабатываете ошибки валидации?
- Когда использовать transform vs refine?

**RTK Query:**

- Как работает система тегов?
- Почему используете именно такую стратегию инвалидации?
- Как обеспечиваете типобезопасность API?

**Архитектура:**

- Как организовали переиспользование кода?
- Какие паттерны применили?
- Что можно улучшить в текущем решении?

---

## 🏆 Критерии отличного решения

### Техническое качество

- 🧼 **Чистый код**: понятная структура, хорошие названия
- 🔒 **Типобезопасность**: использование TypeScript на 100%
- 🎯 **Точность валидации**: корректная обработка всех случаев
- ⚡ **Производительность**: оптимизированные запросы и рендеринг

### Архитектура

- 🏗️ **Модульность**: четкое разделение ответственности
- 🔄 **Переиспользование**: DRY принцип соблюден
- 🧪 **Тестируемость**: код легко тестировать
- 📈 **Масштабируемость**: легко добавлять новые фичи

### UX/UI

- 🎨 **Интуитивность**: понятный интерфейс
- ⚡ **Отзывчивость**: быстрая реакция на действия
- 🔄 **Состояния**: корректная обработка loading/error
- 💬 **Обратная связь**: понятные сообщения пользователю

### Документация

- 📖 **Полнота**: все решения объяснены
- 🎯 **Ясность**: техническая документация понятна
- 💡 **Инсайты**: поделились интересными находками
- 🔍 **Детали**: описали сложные моменты

---

## 📅 Временные рамки

### Рекомендуемый план (7 дней)

**Дни 1-2: Настройка и схемы**

- Настройка проекта и зависимостей
- Создание Zod схем (DTO, Domain, трансформации)
- Утилиты для работы с датами

**Дни 3-4: RTK Query API**

- Базовая настройка RTK Query
- Все CRUD операции
- Система тегов и инвалидация

**Дни 5-6: UI компоненты**

- TaskList, TaskItem, TaskForm
- Обработка состояний (loading, error)
- Интеграция с RTK Query хуками

**День 7: Финализация**

- Тестирование функциональности
- Документация
- Подготовка к защите

### Контрольные точки

- ✅ **День 2**: Zod схемы готовы и протестированы
- ✅ **День 4**: RTK Query API работает
- ✅ **День 6**: Основной UI функционал готов
- ✅ **День 7**: Проект готов к сдаче

---

## 🆘 Полезные ресурсы

### Документация

- 📚 [Zod Documentation](https://zod.dev/)
- 📚 [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- 📚 [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation)

### Примеры кода

- 🔗 [RTK Query Examples](https://github.com/reduxjs/redux-toolkit/tree/master/examples)
- 🔗 [Zod Cookbook](https://github.com/total-typescript/zod-tutorial)
- 🔗 [TypeScript React Patterns](https://github.com/typescript-cheatsheets/react)

### Инструменты

- 🛠️ [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- 🛠️ [RTK Query DevTools](https://redux-toolkit.js.org/rtk-query/usage/debugging)
- 🛠️ [React Developer Tools](https://react.dev/learn/react-developer-tools)

---

## 🎉 Заключение

Это задание поможет вам освоить современный стек разработки React приложений с фокусом на типобезопасность и производительность. Связка **Zod + RTK Query** становится стандартом в индустрии для надежной работы с API.

### Что вы получите

- 🧠 **Глубокое понимание** валидации данных в TypeScript
- ⚡ **Навыки оптимизации** работы с серверным состоянием
- 🏗️ **Опыт проектирования** масштабируемой архитектуры
- 🔧 **Практические навыки** с современными инструментами

**Удачи в выполнении задания!** 🚀

При возникновении вопросов - обращайтесь за помощью. Лучше уточнить детали заранее, чем потратить время на неправильное направление разработки.

---

**Дедлайн:** 1 неделя с момента выдачи  
**Формат сдачи:** GitHub репозиторий + защита решения  
**Оценка:** Техническое качество (60%) + Архитектура (25%) + Презентация (15%)# Домашнее задание: Zod + RTK Query - Todo API

## 🎯 Цель задания

Создать полнофункциональное приложение для управления задачами (Todo App) с использованием **Zod** для валидации данных и **RTK Query** для работы с API. Научиться создавать типобезопасную архитектуру обработки данных от сервера до UI.

---

## 📋 Техническое задание

### Базовые требования

#### 1. API Endpoints (моковые данные)

Реализовать следующие эндпоинты:

```typescript
GET    /tasks           // Получить список задач
GET    /tasks/:id       // Получить задачу по ID  
POST   /tasks           // Создать новую задачу
PATCH  /tasks/:id       // Обновить задачу
DELETE /tasks/:id       // Удалить задачу
GET    /tasks/search    // Поиск задач по тексту
```

#### 2. Структура данных от "сервера" (DTO)

```json
{
  "task_id": 1,
  "title": "Complete the project",
  "description": "Finish all remaining tasks for the React course",
  "is_completed": false,
  "priority_level": "high",
  "created_timestamp": "2024-01-15T10:30:00Z",
  "updated_timestamp": "2024-01-16T15:45:00Z", 
  "due_date_string": "2024-01-20",
  "tags_csv": "work,urgent,project",
  "assigned_user": {
    "user_id": 123,
    "full_name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  },
  "category_info": {
    "category_id": 5,
    "category_name": "Development",
    "color_hex": "#3498db"
  }
}
```

---

## 🛠️ Технические требования

### Часть 1: Zod схемы и валидация

#### A. DTO Schema (обязательно)

Создайте схему для валидации данных от сервера:

```typescript
// schemas/task/dto.ts
import { z } from 'zod';

export const TaskDtoSchema = z.object({
  task_id: z.number().positive(),
  title: z.string().min(1, 'Название не может быть пустым'),
  description: z.string(),
  is_completed: z.boolean(),
  priority_level: z.enum(['low', 'medium', 'high']),
  created_timestamp: z.string(), // UTC строка
  updated_timestamp: z.string(), // UTC строка  
  due_date_string: z.string(),   // Дата в формате YYYY-MM-DD
  tags_csv: z.string(),          // Строка с тегами через запятую
  assigned_user: z.object({
    user_id: z.number(),
    full_name: z.string(),
    avatar_url: z.string().url().nullable()
  }).nullable(),
  category_info: z.object({
    category_id: z.number(),
    category_name: z.string(),
    color_hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Некорректный HEX цвет')
  })
});

export type TaskDto = z.infer<typeof TaskDtoSchema>;
```

#### B. Domain Schema (обязательно)

Создайте схему для использования в UI:

```typescript
// schemas/task/domain.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.date(),
  tags: z.array(z.string()),
  assignedUser: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().nullable()
  }).nullable(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string()
  }),
  
  // Вычисляемые поля
  isOverdue: z.boolean(),
  daysUntilDue: z.number(),
  status: z.enum(['pending', 'urgent', 'overdue', 'completed']),
  displayPriority: z.string(),
  formattedDueDate: z.string()
});

export type Task = z.infer<typeof TaskSchema>;
```

#### C. Трансформации (обязательно)

Реализуйте функции преобразования:

```typescript
// schemas/task/transforms.ts
import { TaskDto, Task } from './types';

export const transformTaskDto = (dto: TaskDto): Task => {
  const now = new Date();
  const dueDate = new
