# RTK Query: Полное руководство по тегам и кэшированию

## Содержание

1. [Основы RTK Query](#основы-rtk-query)
2. [Система тегов и инвалидация](#система-тегов-и-инвалидация)
3. [Примеры практического применения](#примеры-практического-применения)
4. [Продвинутые техники](#продвинутые-техники)
5. [Сброс кэша](#сброс-кэша)
6. [Лучшие практики](#лучшие-практики)

---

## Основы RTK Query

RTK Query автоматически управляет жизненным циклом запросов:

- **Кэширование** - данные сохраняются в Redux store
- **Дедупликация** - одинаковые запросы не дублируются
- **Фоновое обновление** - автоматическое обновление устаревших данных
- **Инвалидация** - пометка данных как устаревших

### Базовая настройка API

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['User', 'Post', 'Comment'], // Объявляем типы тегов
  endpoints: (builder) => ({
    // endpoints будут определены ниже
  }),
})
```

---

## Система тегов и инвалидация

### Как работают теги

Теги в RTK Query - это система связывания данных и мутаций:

1. **providesTags** - какие теги "предоставляет" запрос (маркирует данные)
2. **invalidatesTags** - какие теги "инвалидирует" мутация (делает данные устаревшими)

### Принцип работы

```typescript
// Запрос предоставляет теги
getUserById: builder.query({
  query: (id) => `users/${id}`,
  providesTags: (result, error, arg) => [
    { type: 'User', id: arg }, // Конкретный пользователь
    'User' // Общий тег для всех пользователей
  ],
}),

// Мутация инвалидирует теги
updateUser: builder.mutation({
  query: ({ id, ...patch }) => ({
    url: `users/${id}`,
    method: 'PATCH',
    body: patch,
  }),
  invalidatesTags: (result, error, arg) => [
    { type: 'User', id: arg.id }, // Инвалидирует конкретного пользователя
  ],
}),
```

### Типы тегов

```typescript
// 1. Простые теги (строки)
providesTags: ['User']
invalidatesTags: ['User']

// 2. Теги с ID
providesTags: [{ type: 'User', id: 1 }]
invalidatesTags: [{ type: 'User', id: 1 }]

// 3. Специальный тег LIST для списков
providesTags: [{ type: 'User', id: 'LIST' }]
invalidatesTags: [{ type: 'User', id: 'LIST' }]

// 4. Функции для динамического создания тегов
providesTags: (result, error, arg) => {
  return result
    ? [
        ...result.map(({ id }) => ({ type: 'User' as const, id })),
        { type: 'User', id: 'LIST' },
      ]
    : [{ type: 'User', id: 'LIST' }]
}
```

---

## Примеры практического применения

### 1. CRUD операции с пользователями

```typescript
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Получение списка пользователей
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Получение одного пользователя
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Создание пользователя
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Обновляет список
    }),

    // Обновление пользователя
    updateUser: builder.mutation<User, { id: number } & Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' }, // Если нужно обновить и список
      ],
    }),

    // Удаление пользователя
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
})
```

### 2. Сложные связи между сущностями

```typescript
export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Посты пользователя
    getUserPosts: builder.query<Post[], number>({
      query: (userId) => `users/${userId}/posts`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
              { type: 'User', id: userId }, // Связь с пользователем
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // Комментарии к посту
    getPostComments: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: 'LIST' },
              { type: 'Post', id: postId }, // Связь с постом
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),

    // Создание комментария
    createComment: builder.mutation<Comment, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Comment', id: 'LIST' },
        { type: 'Post', id: postId }, // Обновляет пост (например, счетчик комментариев)
      ],
    }),
  }),
})
```

### 3. Условная инвалидация

```typescript
updateUserStatus: builder.mutation<User, { id: number; status: string }>({
  query: ({ id, status }) => ({
    url: `users/${id}/status`,
    method: 'PATCH',
    body: { status },
  }),
  invalidatesTags: (result, error, { id, status }) => {
    const tags = [{ type: 'User' as const, id }];
    
    // Если статус "premium", обновляем списки премиум пользователей
    if (status === 'premium') {
      tags.push({ type: 'User', id: 'PREMIUM_LIST' });
    }
    
    // Если статус "blocked", обновляем общий список
    if (status === 'blocked') {
      tags.push({ type: 'User', id: 'LIST' });
    }
    
    return tags;
  },
}),
```

---

## Продвинутые техники

### 1. Оптимистичные обновления

```typescript
updateUser: builder.mutation<User, { id: number } & Partial<User>>({
  query: ({ id, ...patch }) => ({
    url: `users/${id}`,
    method: 'PATCH',
    body: patch,
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    // Оптимистичное обновление
    const patchResult = dispatch(
      usersApi.util.updateQueryData('getUserById', id, (draft) => {
        Object.assign(draft, patch);
      })
    );
    
    try {
      await queryFulfilled;
    } catch {
      // Откат изменений при ошибке
      patchResult.undo();
    }
  },
  invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
}),
```

### 2. Трансформация данных

```typescript
getUsers: builder.query<User[], void>({
  query: () => 'users',
  transformResponse: (response: ApiResponse<User[]>) => {
    // Нормализация или сортировка данных
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
  },
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: 'User' as const, id })),
          { type: 'User', id: 'LIST' },
        ]
      : [{ type: 'User', id: 'LIST' }],
}),
```

### 3. Кэширование с keepUnusedDataFor

```typescript
getUsers: builder.query<User[], void>({
  query: () => 'users',
  keepUnusedDataFor: 300, // Храним данные 5 минут после последнего использования
  providesTags: [{ type: 'User', id: 'LIST' }],
}),
```

---

## Сброс кэша

### 1. Инвалидация через теги (рекомендуемый способ)

```typescript
// В компоненте
const [updateUser] = useUpdateUserMutation();

const handleUpdate = async (userData) => {
  await updateUser(userData); // Автоматически инвалидирует связанные теги
};
```

### 2. Ручная инвалидация

```typescript
import { useDispatch } from 'react-redux';
import { api } from './api';

const MyComponent = () => {
  const dispatch = useDispatch();

  const invalidateSpecificUser = (userId: number) => {
    dispatch(
      api.util.invalidateTags([{ type: 'User', id: userId }])
    );
  };

  const invalidateAllUsers = () => {
    dispatch(
      api.util.invalidateTags([{ type: 'User', id: 'LIST' }])
    );
  };

  const invalidateEverything = () => {
    dispatch(api.util.invalidateTags(['User', 'Post', 'Comment']));
  };

  return (
    <div>
      <button onClick={() => invalidateSpecificUser(1)}>
        Обновить пользователя 1
      </button>
      <button onClick={invalidateAllUsers}>
        Обновить всех пользователей
      </button>
      <button onClick={invalidateEverything}>
        Обновить все данные
      </button>
    </div>
  );
};
```

### 3. Сброс конкретного запроса

```typescript
const resetUserData = () => {
  // Сброс конкретного запроса
  dispatch(
    api.util.updateQueryData('getUserById', 1, () => undefined)
  );
  
  // Или принудительное обновление
  dispatch(
    api.endpoints.getUserById.initiate(1, { forceRefetch: true })
  );
};
```

### 4. Полный сброс API

```typescript
const resetAllApi = () => {
  dispatch(api.util.resetApiState());
};
```

### 5. Использование refetch

```typescript
const UserProfile = ({ userId }) => {
  const { data, error, isLoading, refetch } = useGetUserByIdQuery(userId);

  const handleRefresh = () => {
    refetch(); // Принудительное обновление этого запроса
  };

  return (
    <div>
      {data && <UserCard user={data} />}
      <button onClick={handleRefresh}>Обновить</button>
    </div>
  );
};
```

---

## Лучшие практики

### 1. Правильное использование тегов

```typescript
// ✅ Хорошо: конкретные теги + общие
providesTags: (result, error, arg) =>
  result
    ? [
        ...result.map(({ id }) => ({ type: 'User' as const, id })),
        { type: 'User', id: 'LIST' },
      ]
    : [{ type: 'User', id: 'LIST' }]

// ❌ Плохо: только общие теги (слишком широкая инвалидация)
providesTags: ['User']

// ❌ Плохо: только конкретные теги (списки не обновляются)
providesTags: (result, error, arg) =>
  result?.map(({ id }) => ({ type: 'User' as const, id })) || []
```

### 2. Стратегии инвалидации

```typescript
// Для создания - инвалидируем списки
createUser: builder.mutation({
  // ...
  invalidatesTags: [{ type: 'User', id: 'LIST' }],
}),

// Для обновления - инвалидируем конкретный элемент
updateUser: builder.mutation({
  // ...
  invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
}),

// Для удаления - инвалидируем и элемент, и списки
deleteUser: builder.mutation({
  // ...
  invalidatesTags: (result, error, id) => [
    { type: 'User', id },
    { type: 'User', id: 'LIST' },
  ],
}),
```

### 3. Типизация тегов

```typescript
// Типизированные теги
type ApiTags = 'User' | 'Post' | 'Comment';

interface UserTag {
  type: 'User';
  id: number | 'LIST' | 'PREMIUM_LIST';
}

interface PostTag {
  type: 'Post';
  id: number | 'LIST';
}

type Tag = UserTag | PostTag | { type: 'Comment'; id: number | 'LIST' };

export const api = createApi<BaseQueryFn, Tag>({
  tagTypes: ['User', 'Post', 'Comment'],
  // ...
});
```

### 4. Дебаггинг

```typescript
// Включение логирования
export const api = createApi({
  // ...
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: (result, error, arg) => {
        const tags = result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }];
        
        console.log('getUsers providesTags:', tags); // Для дебаггинга
        return tags;
      },
    }),
  }),
});
```

---

## Заключение

RTK Query предоставляет мощную и гибкую систему управления кэшем через теги:

1. **Автоматическая инвалидация** - правильно настроенные теги автоматически обновляют связанные данные
2. **Гранулярный контроль** - можно инвалидировать как конкретные элементы, так и целые списки
3. **Оптимизация** - избегайте излишне широкой инвалидации
4. **Типизация** - используйте TypeScript для безопасности типов

Ключ к успеху - правильное планирование структуры тегов на этапе проектирования API.
