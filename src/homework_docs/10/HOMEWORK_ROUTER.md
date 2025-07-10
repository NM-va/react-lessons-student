# Домашнее задание 10: Админ-панель с многоуровневой навигацией

## Цель задания

Создать полнофункциональную админ-панель с использованием React Router, демонстрирующую двухуровневую навигацию, вложенные маршруты и современные паттерны маршрутизации.

---

## Техническое задание

### Архитектура приложения

```
┌─────────────────────────────────────────────────────┐
│                    HEADER (0-й уровень)             │
│  Дашборд | Пользователи | Товары | Заказы | Настройки │
├─────────────────────────────────────────────────────┤
│ SIDEBAR  │                                          │
│(1-й ур.) │            OUTLET CONTENT                │
│          │                                          │
│ Список   │    Основной контент зависит от           │
│ Создать  │    выбранного маршрута                   │
│ Роли     │                                          │
│          │                                          │
└─────────────────────────────────────────────────────┘
```

### 1. Структура маршрутов

#### Главные разделы (Header - 0-й уровень)

```typescript
/admin/dashboard          // Дашборд
/admin/users             // Пользователи  
/admin/products          // Товары
/admin/orders            // Заказы
/admin/settings          // Настройки
```

#### Подразделы (Sidebar - 1-й уровень)

**Пользователи (`/admin/users`)**

```typescript
/admin/users             // Список всех пользователей
/admin/users/create      // Создание пользователя
/admin/users/roles       // Управление ролями
/admin/users/:userId     // Профиль пользователя
/admin/users/:userId/edit // Редактирование пользователя
```

**Товары (`/admin/products`)**

```typescript
/admin/products          // Список товаров
/admin/products/create   // Добавить товар
/admin/products/categories // Категории товаров
/admin/products/:productId // Детали товара
/admin/products/:productId/edit // Редактировать товар
```

**Заказы (`/admin/orders`)**

```typescript
/admin/orders            // Все заказы
/admin/orders/pending    // Заказы в обработке
/admin/orders/completed  // Выполненные заказы
/admin/orders/cancelled  // Отмененные заказы
/admin/orders/:orderId   // Детали заказа
```

### 2. Требования к функциональности

#### Обязательные компоненты

1. **AdminLayout** - основной layout с header и outlet
2. **HeaderNavigation** - навигация верхнего уровня
3. **SidebarNavigation** - боковая навигация (показывается не везде)
4. **Breadcrumbs** - хлебные крошки
5. **ProtectedRoute** - защищенные маршруты
6. **NotFound** - 404 страница

#### Функциональные требования

**A. Навигация**

- ✅ Header всегда видимый с активными состояниями NavLink
- ✅ Sidebar показывается только для Users, Products, Orders
- ✅ Breadcrumbs отображают полный путь
- ✅ Программная навигация при успешных операциях

**B. Параметры маршрутов**

- ✅ URL параметры: `:userId`, `:productId`, `:orderId`
- ✅ Query параметры для фильтрации и пагинации
- ✅ Типизированные параметры с TypeScript

**C. Состояние URL**

- ✅ Фильтры сохраняются в URL
- ✅ Пагинация через query параметры
- ✅ Поиск синхронизируется с URL
- ✅ Сортировка отражается в URL

**D. UX требования**

- ✅ Loading состояния при навигации
- ✅ Корректная обработка 404 ошибок
- ✅ Сохранение формы при переходах
- ✅ Подтверждение перед уходом с несохраненной формы

### 3. Техническая реализация

#### Обязательные технологии

```typescript
// Основные зависимости
react-router-dom: "^6.x"
typescript: "^5.x"
react: "^18.x"

// Дополнительные (по выбору)
react-hook-form       // Для форм
react-query/tanstack  // Для данных
zustand/redux         // Для состояния
```

#### Структура проекта

```
src/
├── components/
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   ├── HeaderNavigation.tsx
│   │   ├── SidebarNavigation.tsx
│   │   └── Breadcrumbs.tsx
│   ├── common/
│   │   ├── ProtectedRoute.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── NotFound.tsx
│   └── forms/
│       ├── UserForm.tsx
│       ├── ProductForm.tsx
│       └── OrderForm.tsx
├── pages/
│   ├── Dashboard/
│   ├── Users/
│   │   ├── UsersList.tsx
│   │   ├── UserProfile.tsx
│   │   ├── CreateUser.tsx
│   │   ├── EditUser.tsx
│   │   └── UserRoles.tsx
│   ├── Products/
│   │   ├── ProductsList.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── CreateProduct.tsx
│   │   ├── EditProduct.tsx
│   │   └── Categories.tsx
│   ├── Orders/
│   │   ├── OrdersList.tsx
│   │   ├── OrderDetails.tsx
│   │   ├── PendingOrders.tsx
│   │   └── CompletedOrders.tsx
│   └── Settings/
├── hooks/
│   ├── useAuth.ts
│   ├── useFilters.ts
│   ├── usePagination.ts
│   └── useBreadcrumbs.ts
├── types/
│   ├── routes.ts
│   ├── user.ts
│   ├── product.ts
│   └── order.ts
├── utils/
│   ├── routes.ts
│   └── constants.ts
└── App.tsx
```

### 4. Примеры реализации

#### AdminLayout с условным Sidebar

```tsx
// components/layout/AdminLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import HeaderNavigation from './HeaderNavigation';
import SidebarNavigation from './SidebarNavigation';
import Breadcrumbs from './Breadcrumbs';

const ROUTES_WITH_SIDEBAR = ['/admin/users', '/admin/products', '/admin/orders'];

export default function AdminLayout() {
  const location = useLocation();
  
  const showSidebar = ROUTES_WITH_SIDEBAR.some(route => 
    location.pathname.startsWith(route)
  );
  
  return (
    <div className="admin-layout">
      <HeaderNavigation />
      
      <div className="main-content">
        {showSidebar && <SidebarNavigation />}
        
        <main className={`content ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

#### Типизированные маршруты

```tsx
// types/routes.ts
export interface RouteParams {
  '/admin/users/:userId': { userId: string };
  '/admin/users/:userId/edit': { userId: string };
  '/admin/products/:productId': { productId: string };
  '/admin/orders/:orderId': { orderId: string };
}

export type AppRoutes = keyof RouteParams;

// hooks/useTypedParams.ts
import { useParams } from 'react-router-dom';

export function useTypedParams<T extends AppRoutes>(): RouteParams[T] {
  return useParams() as RouteParams[T];
}
```

#### Фильтры с URL синхронизацией

```tsx
// hooks/useFilters.ts
interface UserFilters {
  search?: string;
  role?: 'admin' | 'user' | 'moderator';
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export function useUserFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters: UserFilters = {
    search: searchParams.get('search') || undefined,
    role: searchParams.get('role') as UserFilters['role'] || undefined,
    status: searchParams.get('status') as UserFilters['status'] || undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    sortBy: searchParams.get('sortBy') as UserFilters['sortBy'] || 'name',
    sortOrder: searchParams.get('sortOrder') as UserFilters['sortOrder'] || 'asc'
  };
  
  const updateFilters = (newFilters: Partial<UserFilters>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    
    setSearchParams(params);
  };
  
  return { filters, updateFilters };
}
```

#### Breadcrumbs с параметрами

```tsx
// components/layout/Breadcrumbs.tsx
import { Link, useLocation, useParams } from 'react-router-dom';

const BREADCRUMB_NAMES: Record<string, string | ((params: any) => string)> = {
  admin: 'Админ панель',
  dashboard: 'Дашборд',
  users: 'Пользователи',
  products: 'Товары',
  orders: 'Заказы',
  settings: 'Настройки',
  create: 'Создать',
  edit: 'Редактировать',
  roles: 'Роли',
  categories: 'Категории',
  pending: 'В обработке',
  completed: 'Выполненные',
  cancelled: 'Отмененные',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  const breadcrumbs = pathnames.map((pathname, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    let label = BREADCRUMB_NAMES[pathname] || pathname;
    
    // Обработка параметров
    if (params.userId && pathname === params.userId) {
      label = `Пользователь #${params.userId}`;
    } else if (params.productId && pathname === params.productId) {
      label = `Товар #${params.productId}`;
    } else if (params.orderId && pathname === params.orderId) {
      label = `Заказ #${params.orderId}`;
    }
    
    if (typeof label === 'function') {
      label = label(params);
    }
    
    return { to, label: String(label) };
  });
  
  return (
    <nav className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.to}>
          {index < breadcrumbs.length - 1 ? (
            <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
          ) : (
            <span className="current">{breadcrumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && ' › '}
        </span>
      ))}
    </nav>
  );
}
```

### 5. Макеты страниц

#### Список пользователей с фильтрами

```tsx
// pages/Users/UsersList.tsx
export default function UsersList() {
  const { filters, updateFilters } = useUserFilters();
  const navigate = useNavigate();
  
  // Моковые данные
  const users = [
    { id: '1', name: 'Иван Петров', email: 'ivan@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Мария Сидорова', email: 'maria@example.com', role: 'user', status: 'active' },
    // ...
  ];
  
  const handleUserClick = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };
  
  return (
    <div className="users-list">
      <div className="page-header">
        <h1>Пользователи</h1>
        <button onClick={() => navigate('/admin/users/create')}>
          Создать пользователя
        </button>
      </div>
      
      {/* Фильтры */}
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск..."
          value={filters.search || ''}
          onChange={(e) => updateFilters({ search: e.target.value, page: 1 })}
        />
        
        <select
          value={filters.role || ''}
          onChange={(e) => updateFilters({ role: e.target.value as any, page: 1 })}
        >
          <option value="">Все роли</option>
          <option value="admin">Админ</option>
          <option value="user">Пользователь</option>
          <option value="moderator">Модератор</option>
        </select>
        
        <select
          value={filters.status || ''}
          onChange={(e) => updateFilters({ status: e.target.value as any, page: 1 })}
        >
          <option value="">Все статусы</option>
          <option value="active">Активный</option>
          <option value="inactive">Неактивный</option>
        </select>
      </div>
      
      {/* Таблица */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleUserClick(user.id)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <Link to={`/admin/users/${user.id}/edit`}>Редактировать</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Пагинация */}
      <div className="pagination">
        <button 
          disabled={filters.page === 1}
          onClick={() => updateFilters({ page: (filters.page || 1) - 1 })}
        >
          Предыдущая
        </button>
        <span>Страница {filters.page}</span>
        <button 
          onClick={() => updateFilters({ page: (filters.page || 1) + 1 })}
        >
          Следующая
        </button>
      </div>
    </div>
  );
}
```

### 6. Критерии оценки

#### Базовый уровень (70-79 баллов)

- ✅ Настроен React Router с базовой навигацией
- ✅ Реализованы все основные страницы
- ✅ Header навигация работает корректно
- ✅ Sidebar показывается для нужных разделов
- ✅ 404 страница существует

#### Хороший уровень (80-89 баллов)

- ✅ Все базовые требования
- ✅ URL параметры работают корректно
- ✅ Query параметры для фильтрации
- ✅ Breadcrumbs с динамическими названиями
- ✅ TypeScript типизация параметров
- ✅ Обработка loading состояний

#### Отличный уровень (90-100 баллов)

- ✅ Все предыдущие требования
- ✅ Защищенные маршруты с аутентификацией
- ✅ Сохранение состояния фильтров в URL
- ✅ Программная навигация с контекстом
- ✅ Оптимизации (lazy loading, мемоизация)
- ✅ Отличный UX (анимации, transitions)

### 7. Дополнительные задания (бонус +10-20%)

#### Модальные окна с URL (бонус +10%)

```tsx
// Модальные окна как маршруты
/admin/users?modal=create-user
/admin/products/:productId?modal=edit-product

// Реализация
const [searchParams] = useSearchParams();
const modal = searchParams.get('modal');

{modal === 'create-user' && (
  <Modal onClose={() => setSearchParams({})}>
    <CreateUserForm />
  </Modal>
)}
```

#### Tabs с URL синхронизацией (бонус +10%)

```tsx
// URL: /admin/users/123?tab=profile
// URL: /admin/users/123?tab=settings
// URL: /admin/users/123?tab=activity

function UserProfile() {
  const { userId } = useTypedParams<'/admin/users/:userId'>();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  
  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };
  
  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab value="profile">Профиль</Tab>
        <Tab value="settings">Настройки</Tab>
        <Tab value="activity">Активность</Tab>
      </Tabs>
      
      <TabContent value={activeTab}>
        {/* Контент вкладок */}
      </TabContent>
    </div>
  );
}
```

#### Ленивая загрузка разделов (бонус +10%)

```tsx
import { lazy, Suspense } from 'react';

const UsersModule = lazy(() => import('./pages/Users'));
const ProductsModule = lazy(() => import('./pages/Products'));
const OrdersModule = lazy(() => import('./pages/Orders'));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/users/*" element={<UsersModule />} />
          <Route path="/admin/products/*" element={<ProductsModule />} />
          <Route path="/admin/orders/*" element={<OrdersModule />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 8. Сдача работы

#### Требования к репозиторию

1. **README.md** с инструкциями по запуску
2. **Демо ссылка** (Vercel, Netlify, GitHub Pages)
3. **Скриншоты** основных страниц
4. **Техническое описание** архитектуры маршрутов

#### Структура README

```markdown
# Админ-панель с React Router

## Описание
Админ-панель с двухуровневой навигацией для управления пользователями, товарами и заказами.

## Технологии
- React 18
- TypeScript
- React Router v6
- [Другие библиотеки]

## Запуск проекта
```bash
npm install
npm start
```

## Демо

[Ссылка на демо](https://your-demo-link.vercel.app)

## Структура маршрутов

[Описание маршрутов]

## Особенности реализации

[Ключевые решения и подходы]

```

#### Контрольный список перед сдачей

- [ ] Все маршруты работают корректно
- [ ] Header навигация показывает активные состояния
- [ ] Sidebar появляется только где нужно
- [ ] Breadcrumbs работают для всех страниц
- [ ] URL параметры типизированы
- [ ] Query параметры для фильтрации работают
- [ ] 404 страница корректно обрабатывается
- [ ] TypeScript без ошибок
- [ ] Адаптивная верстка
- [ ] README с инструкциями

---

## Сроки и формат сдачи

**Срок сдачи:** 1 неделя с момента выдачи

**Формат сдачи:**
- GitHub репозиторий с исходным кодом
- Рабочее демо приложения
- README с документацией
- Техническое описание решений

**Дополнительно:**
- Презентация решения (5 минут)
- Ответы на вопросы по коду

---

## Полезные ресурсы

- [React Router Documentation](https://reactrouter.com/)
- [TypeScript with React Router](https://github.com/remix-run/react-router/blob/main/docs/start/tutorial.md)
- [React Router Patterns](https://ui.dev/react-router-tutorial)
- [Advanced React Router](https://kentcdodds.com/blog/stop-using-react-router-nested-routes)

**Удачи в выполнении задания!** 🚀
