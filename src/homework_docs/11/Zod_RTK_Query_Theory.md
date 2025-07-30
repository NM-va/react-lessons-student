# Zod + RTK Query: Теоретическое руководство

## Оглавление

- [Введение](#введение)
- [Zod - TypeScript-first валидация](#zod---typescript-first-валидация)
- [RTK Query - Управление серверным состоянием](#rtk-query---управление-серверным-состоянием)
- [Концепции RTK Query](#концепции-rtk-query)
- [Интеграция Zod + RTK Query](#интеграция-zod--rtk-query)
- [Лучшие практики](#лучшие-практики)
- [Паттерны и решения](#паттерны-и-решения)

---

## Введение

Современные React приложения требуют надежной работы с API и безопасной обработки данных. Связка **Zod** + **RTK Query** предоставляет мощный инструментарий для решения этих задач:

- 🛡️ **Zod** обеспечивает типобезопасную валидацию и трансформацию данных
- ⚡ **RTK Query** автоматизирует кэширование, синхронизацию и управление серверным состоянием
- 🔧 **Интеграция** создает робустную архитектуру работы с API

---

## Zod - TypeScript-first валидация

### Философия Zod

Zod следует принципу "schema-first" - сначала описываем структуру данных, затем получаем типы и валидацию автоматически.

#### Ключевые преимущества

1. **Единый источник правды** - схема определяет и типы, и валидацию
2. **Runtime безопасность** - данные проверяются во время выполнения
3. **TypeScript интеграция** - автоматическая генерация типов
4. **Композиция** - схемы можно комбинировать и переиспользовать

### Основные концепции

#### 1. Схемы (Schemas)

```typescript
import { z } from 'zod';

// Примитивные типы
const StringSchema = z.string();
const NumberSchema = z.number();
const BooleanSchema = z.boolean();
const DateSchema = z.date();

// Объекты
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(120),
  isActive: z.boolean().default(true)
});

// Автоматически получаем TypeScript тип
type User = z.infer<typeof UserSchema>;
```

#### 2. Валидация

```typescript
// Строгая валидация (бросает ошибку)
const user = UserSchema.parse(userData);

// Безопасная валидация (возвращает результат)
const result = UserSchema.safeParse(userData);
if (result.success) {
  console.log(result.data); // валидные данные
} else {
  console.log(result.error); // детали ошибок
}
```

#### 3. Трансформации

```typescript
// Простая трансформация
const TrimmedString = z.string().transform(s => s.trim());

// Цепочка трансформаций
const ProcessedName = z.string()
  .transform(s => s.trim())
  .transform(s => s.toLowerCase())
  .transform(s => s.charAt(0).toUpperCase() + s.slice(1));

// Трансформация с валидацией
const PositiveNumber = z.string()
  .transform(s => parseInt(s, 10))
  .refine(n => n > 0, "Число должно быть положительным");
```

#### 4. Композиция схем

```typescript
// Базовые схемы
const PersonSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date()
});

// Расширение схем
const UserSchema = PersonSchema.extend({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(['user', 'admin', 'moderator'])
});

// Частичные схемы
const UpdateUserSchema = UserSchema.partial();

// Выбор полей
const PublicUserSchema = UserSchema.pick({
  id: true,
  firstName: true,
  lastName: true
});
```

### Работа с датами

```typescript
// Парсинг дат из строк
const DateFromString = z.string()
  .transform(dateStr => new Date(dateStr))
  .refine(date => !isNaN(date.getTime()), "Некорректная дата");

// Работа с ISO строками
const ISODateSchema = z.string()
  .datetime() // валидация ISO формата
  .transform(str => new Date(str));

// Nullable даты
const NullableDateSchema = z.string()
  .nullable()
  .transform(val => val ? new Date(val) : null)
  .refine(val => val === null || !isNaN(val.getTime()));
```

### Обработка ошибок

```typescript
function handleZodError(error: z.ZodError) {
  const formattedErrors = error.errors.map(err => ({
    path: err.path.join('.'),
    message: err.message,
    code: err.code
  }));
  
  return formattedErrors;
}

// Кастомные сообщения об ошибках
const UserSchema = z.object({
  name: z.string({
    required_error: "Имя обязательно",
    invalid_type_error: "Имя должно быть строкой"
  }).min(2, "Имя должно содержать минимум 2 символа"),
  
  age: z.number({
    required_error: "Возраст обязателен",
    invalid_type_error: "Возраст должен быть числом"
  }).min(0, "Возраст не может быть отрицательным")
});
```

---

## RTK Query - Управление серверным состоянием

### Что решает RTK Query

RTK Query автоматизирует типичные задачи при работе с API:

1. **Кэширование** - автоматическое кэширование ответов
2. **Дедупликация** - объединение одинаковых запросов
3. **Инвалидация** - умное обновление кэша при изменениях
4. **Фоновое обновление** - автоматическое обновление данных
5. **Оптимизация** - минимизация сетевых запросов

### Базовая архитектура

```typescript
// Создание базового API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      // Добавление заголовков аутентификации
      const token = selectAuthToken(getState());
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment'], // Типы тегов для кэширования
  endpoints: () => ({}) // Endpoints добавляются отдельно
});
```

---

## Концепции RTK Query

### 1. Queries (Запросы для чтения)

**Query** предназначены для получения данных с сервера:

```typescript
const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], PostsFilter>({
      query: (filter) => ({
        url: 'posts',
        params: filter
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),
    
    getPostById: build.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    })
  })
});
```

#### Особенности Query

- **Автоматическое кэширование** - результаты сохраняются в Redux store
- **Дедупликация** - одинаковые запросы объединяются
- **Рефетчинг** - автоматическое обновление при фокусе окна
- **Polling** - периодическое обновление данных

### 2. Mutations (Запросы для изменения)

**Mutation** используются для изменения данных на сервере:

```typescript
const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    
    updatePost: build.mutation<Post, { id: number; updates: Partial<Post> }>({
      query: ({ id, updates }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: updates
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ]
    }),
    
    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ]
    })
  })
});
```

### 3. Система тегов (Tags System)

Теги - это механизм связывания данных для умной инвалидации кэша:

#### providesTags

Указывает, какие теги "предоставляет" запрос:

```typescript
// Список постов предоставляет:
// 1. Общий тег списка
// 2. Тег каждого отдельного поста
providesTags: (result) => [
  { type: 'Post', id: 'LIST' },
  ...(result?.map(post => ({ type: 'Post', id: post.id })) || [])
]

// Отдельный пост предоставляет только свой тег
providesTags: (result, error, id) => [{ type: 'Post', id }]
```

#### invalidatesTags

Указывает, какие теги "инвалидирует" мутация:

```typescript
// Создание поста инвалидирует список
invalidatesTags: [{ type: 'Post', id: 'LIST' }]

// Обновление поста инвалидирует и сам пост, и список
invalidatesTags: (result, error, { id }) => [
  { type: 'Post', id },
  { type: 'Post', id: 'LIST' }
]
```

#### Как работает инвалидация

1. **Query выполняется** → данные кэшируются с тегами из `providesTags`
2. **Mutation выполняется** → RTK Query смотрит на `invalidatesTags`
3. **Поиск совпадений** → находит все закэшированные данные с такими тегами
4. **Автоматический рефетч** → перезапускает все query с инвалидированными тегами

### 4. transformResponse

Позволяет обработать ответ сервера перед сохранением в кэш:

```typescript
getUserProfile: build.query<UserProfile, number>({
  query: (userId) => `users/${userId}/profile`,
  transformResponse: (response: ApiUserProfile): UserProfile => {
    return {
      id: response.user_id,
      name: response.full_name,
      avatar: response.profile_picture_url,
      joinedAt: new Date(response.created_at),
      settings: {
        theme: response.preferences.theme || 'light',
        notifications: response.preferences.notifications === 'enabled'
      }
    };
  }
})
```

### 5. Состояния запросов

RTK Query предоставляет богатую информацию о состоянии:

```typescript
function UserProfile({ userId }: { userId: number }) {
  const {
    data: user,           // Данные пользователя
    error,               // Ошибка запроса
    isLoading,           // Первоначальная загрузка
    isFetching,          // Любая загрузка (включая рефетч)
    isSuccess,           // Успешное выполнение
    isError,             // Наличие ошибки
    refetch              // Функция для ручного обновления
  } = useGetUserProfileQuery(userId);
  
  // Различные состояния UI
  if (isLoading) return <UserSkeleton />;
  if (isError) return <ErrorMessage error={error} />;
  if (!user) return <UserNotFound />;
  
  return (
    <div>
      <UserCard user={user} />
      {isFetching && <RefreshingIndicator />}
      <button onClick={() => refetch()}>Обновить</button>
    </div>
  );
}
```

### 6. Conditional Fetching

Условное выполнение запросов:

```typescript
function UserPosts({ userId, shouldFetch }: Props) {
  const { data: posts } = useGetUserPostsQuery(userId, {
    skip: !shouldFetch,           // Пропустить запрос
    pollingInterval: 30000,       // Опрос каждые 30 сек
    refetchOnFocus: true,         // Обновлять при фокусе
    refetchOnReconnect: true      // Обновлять при восстановлении соединения
  });
  
  return <PostsList posts={posts} />;
}
```

---

## Интеграция Zod + RTK Query

### Паттерн "DTO → Domain Model"

Типичный подход при интеграции:

1. **DTO Schema** - валидация данных от API
2. **Domain Schema** - модель для UI
3. **Transform Function** - преобразование DTO → Domain

```typescript
// 1. DTO Schema (как приходят данные)
const UserDtoSchema = z.object({
  user_id: z.number(),
  full_name: z.string(),
  email_address: z.string().email(),
  created_at: z.string().transform(s => new Date(s)),
  last_login: z.string().nullable().transform(s => s ? new Date(s) : null),
  preferences_json: z.string().transform(s => JSON.parse(s)),
  status: z.enum(['active', 'inactive', 'suspended'])
});

// 2. Domain Schema (как используем в UI)
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  lastLogin: z.date().nullable(),
  preferences: z.record(z.unknown()),
  isActive: z.boolean(),
  displayName: z.string(),
  initials: z.string()
});

// 3. Transform Function
const transformUser = (dto: z.infer<typeof UserDtoSchema>): User => {
  const names = dto.full_name.split(' ');
  
  return {
    id: dto.user_id,
    name: dto.full_name,
    email: dto.email_address,
    createdAt: dto.created_at,
    lastLogin: dto.last_login,
    preferences: dto.preferences_json,
    isActive: dto.status === 'active',
    displayName: names[0],
    initials: names.map(n => n.charAt(0)).join('').toUpperCase()
  };
};

// 4. RTK Query с интеграцией
const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      transformResponse: (response: unknown[]): User[] => {
        return response
          .map(item => {
            try {
              const dto = UserDtoSchema.parse(item);
              return transformUser(dto);
            } catch (error) {
              console.warn('Пропущен некорректный пользователь:', error);
              return null;
            }
          })
          .filter((user): user is User => user !== null);
      }
    })
  })
});
```

### Утилиты для интеграции

```typescript
// utils/zodHelpers.ts

// Безопасный парсер
export function zodParser<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors
      .map(err => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
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
```

---

## Лучшие практики

### 1. Организация схем

```typescript
// schemas/user/index.ts
export * from './dto';
export * from './domain';
export * from './transforms';

// schemas/user/dto.ts
export const UserDtoSchema = z.object({
  // DTO определения
});

// schemas/user/domain.ts  
export const UserSchema = z.object({
  // Domain определения
});

// schemas/user/transforms.ts
export const transformUserDto = (dto: UserDto): User => {
  // Логика трансформации
};
```

### 2. Типизация API

```typescript
// types/api.ts
export interface ApiEndpoints {
  getUsers: {
    request: void;
    response: User[];
  };
  
  getUserById: {
    request: number;
    response: User;
  };
  
  createUser: {
    request: CreateUserRequest;
    response: User;
  };
}

// Использование в RTK Query
const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      ApiEndpoints['getUsers']['response'],
      ApiEndpoints['getUsers']['request']
    >({
      // ...
    })
  })
});
```

### 3. Обработка ошибок

```typescript
// Глобальная обработка ошибок API
const baseQueryWithErrorHandling: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error) {
    // Логирование
    console.error('API Error:', {
      endpoint: typeof args === 'string' ? args : args.url,
      status: result.error.status,
      data: result.error.data
    });
    
    // Обработка специфичных ошибок
    if (result.error.status === 401) {
      // Редирект на логин
      store.dispatch(logout());
    } else if (result.error.status === 403) {
      // Показ сообщения о недостатке прав
      showNotification('Недостаточно прав для выполнения операции', 'error');
    }
  }
  
  return result;
};

// Обработка ошибок валидации
function handleValidationError(error: z.ZodError): ValidationError[] {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code
  }));
}
```

### 4. Оптимизация производительности

```typescript
// Селективная подписка на данные
const useUserName = (userId: number) => {
  return useGetUserByIdQuery(userId, {
    selectFromResult: ({ data, ...other }) => ({
      name: data?.name,
      ...other
    })
  });
};

// Условные запросы
const useUserPosts = (userId: number, enabled: boolean) => {
  return useGetUserPostsQuery(userId, {
    skip: !enabled || !userId
  });
};

// Polling с умной логикой
const useRealTimeData = (shouldPoll: boolean) => {
  return useGetDashboardDataQuery(undefined, {
    pollingInterval: shouldPoll ? 5000 : 0,
    skipPollingIfUnfocused: true
  });
};
```

---

## Паттерны и решения

### 1. Оптимистичные обновления

```typescript
const updateUser = build.mutation<User, { id: number; updates: Partial<User> }>({
  query: ({ id, updates }) => ({
    url: `users/${id}`,
    method: 'PATCH',
    body: updates
  }),
  
  // Оптимистичное обновление
  onQueryStarted: async ({ id, updates }, { dispatch, queryFulfilled }) => {
    // Обновляем кэш до получения ответа
    const patchResult = dispatch(
      usersApi.util.updateQueryData('getUserById', id, (draft) => {
        Object.assign(draft, updates);
      })
    );
    
    try {
      await queryFulfilled;
    } catch {
      // Откатываем изменения при ошибке
      patchResult.undo();
    }
  }
});
```

### 2. Нормализация данных

```typescript
// Использование RTK Query с нормализованными данными
import { createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter<User>();

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<EntityState<User>, void>({
      query: () => 'users',
      transformResponse: (response: User[]) => {
        return usersAdapter.setAll(usersAdapter.getInitialState(), response);
      }
    })
  })
});
```

### 3. Фоновая синхронизация

```typescript
// Автоматическая синхронизация при изменении фокуса
const useAutoSync = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const handleFocus = () => {
      // Рефетчим критичные данные
      dispatch(usersApi.util.invalidateTags(['User']));
      dispatch(notificationsApi.util.invalidateTags(['Notification']));
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);
};
```

### 4. Кэширование с TTL

```typescript
// Кастомное кэширование с временем жизни
const getCachedData = build.query<Data[], void>({
  query: () => 'data',
  keepUnusedDataFor: 60, // 60 секунд
  
  // Дополнительная логика валидации кэша
  forceRefetch: ({ currentArg, previousArg, endpointState }) => {
    const lastFetch = endpointState?.lastFetch;
    if (!lastFetch) return true;
    
    // Принудительное обновление через 5 минут
    return Date.now() - lastFetch > 5 * 60 * 1000;
  }
});
```

---

## Заключение

Связка **Zod + RTK Query** обеспечивает:

1. **Типобезопасность** - от API до UI компонентов
2. **Автоматическое кэширование** - оптимальная производительность
3. **Умную инвалидацию** - данные всегда актуальны
4. **Централизованную обработку ошибок** - консистентный UX
5. **Масштабируемость** - легко добавлять новые endpoints

Эта архитектура особенно эффективна в больших приложениях, где важны производительность, надежность и удобство разработки.

### Ключевые принципы

- **Schema-first подход** - схема как единый источник правды
- **Разделение ответственности** - DTO для API, Domain для UI
- **Декларативность** - описываем что хотим, а не как это делать
- **Композиция** - собираем сложную логику из простых блоков

Изучив эти концепции, вы сможете создавать надежные и производительные React приложения с отличным developer experience! 🚀
