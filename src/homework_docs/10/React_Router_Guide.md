# React Router: Полное руководство по навигации в SPA

## Оглавление

- [Введение](#введение)
- [Установка и настройка](#установка-и-настройка)
- [Основные компоненты](#основные-компоненты)
- [BrowserRouter vs HashRouter](#browserrouter-vs-hashrouter)
- [Routes и Route](#routes-и-route)
- [Link и NavLink](#link-и-navlink)
- [Параметры маршрутов](#параметры-маршрутов)
- [Query параметры (Search Params)](#query-параметры-search-params)
- [Outlet и вложенные маршруты](#outlet-и-вложенные-маршруты)
- [Программная навигация](#программная-навигация)
- [Полезные хуки](#полезные-хуки)
- [Обработка ошибок](#обработка-ошибок)
- [Лучшие практики](#лучшие-практики)
- [Примеры использования](#примеры-использования)

---

## Введение

React Router - это стандартная библиотека для маршрутизации в React-приложениях. Она позволяет создавать одностраничные приложения (SPA) с множественными представлениями, синхронизированными с URL браузера.

### Ключевые преимущества

- ✅ **Декларативная маршрутизация** - определяете маршруты как JSX компоненты
- ✅ **Динамическая маршрутизация** - маршруты рендерятся как компоненты
- ✅ **Вложенная маршрутизация** - поддержка сложных иерархий
- ✅ **Lazy loading** - подгрузка компонентов по требованию
- ✅ **История браузера** - полная интеграция с Browser History API

---

## Установка и настройка

### Установка

```bash
npm install react-router-dom
# или
yarn add react-router-dom
```

### Базовая настройка

```jsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

---

## Основные компоненты

### BrowserRouter

Корневой компонент, обеспечивающий контекст маршрутизации для всего приложения.

```jsx
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Ваше приложение */}
    </Router>
  );
}
```

### Routes

Контейнер для определения маршрутов. Заменяет старый компонент `Switch`.

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
```

### Route

Определяет соответствие между URL путем и React компонентом.

```jsx
// Простой маршрут
<Route path="/about" element={<AboutPage />} />

// Маршрут с параметрами
<Route path="/user/:userId" element={<UserProfile />} />

// Маршрут по умолчанию (index route)
<Route index element={<HomePage />} />

// Catch-all маршрут (404)
<Route path="*" element={<NotFound />} />
```

---

## BrowserRouter vs HashRouter

### BrowserRouter (рекомендуется)

Использует HTML5 History API для чистых URL без хэша.

```jsx
// URL: https://example.com/about
<BrowserRouter>
  <Routes>
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</BrowserRouter>
```

**Преимущества:**

- Чистые URL без `#`
- SEO-дружественные адреса
- Лучший UX

**Требования:**

- Настройка сервера для fallback на index.html

### HashRouter

Использует хэш-часть URL для маршрутизации.

```jsx
// URL: https://example.com/#/about
<HashRouter>
  <Routes>
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</HashRouter>
```

**Преимущества:**

- Не требует настройки сервера
- Работает с любым хостингом

**Недостатки:**

- URL с `#` выглядят менее профессионально
- Ограничения для SEO

---

## Routes и Route

### Базовое использование

```jsx
function App() {
  return (
    <Router>
      <Routes>
        {/* Точное совпадение пути */}
        <Route path="/" element={<HomePage />} />
        
        {/* Путь с параметром */}
        <Route path="/user/:id" element={<UserPage />} />
        
        {/* Вложенные маршруты */}
        <Route path="/products/*" element={<ProductsLayout />} />
        
        {/* Перенаправление */}
        <Route path="/old-page" element={<Navigate to="/new-page" replace />} />
        
        {/* 404 страница */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
```

### Условные маршруты

```jsx
function App() {
  const isAuthenticated = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAuthenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
}
```

---

## Link и NavLink

### Link - Базовая навигация

`Link` создает ссылку без перезагрузки страницы.

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/about">О нас</Link>
      <Link to="/contact">Контакты</Link>
    </nav>
  );
}
```

#### Link с состоянием

```jsx
// Передача данных через state
<Link 
  to="/user/123" 
  state={{ from: '/dashboard', userData: user }}
>
  Профиль пользователя
</Link>

// Получение состояния в компоненте
function UserProfile() {
  const location = useLocation();
  const { from, userData } = location.state || {};
  
  return (
    <div>
      <p>Пришли с: {from}</p>
      <p>Пользователь: {userData?.name}</p>
    </div>
  );
}
```

### NavLink - Ссылка с активным состоянием

`NavLink` предоставляет дополнительные возможности для стилизации активных ссылок.

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/"
        style={({ isActive }) => ({
          color: isActive ? '#007bff' : '#333',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none'
        })}
      >
        Главная
      </NavLink>
      
      <NavLink 
        to="/about"
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        О нас
      </NavLink>
    </nav>
  );
}
```

#### NavLink с дополнительными условиями

```jsx
function Navigation() {
  return (
    <NavLink
      to="/products"
      className={({ isActive, isPending }) => {
        if (isPending) return 'nav-link pending';
        if (isActive) return 'nav-link active';
        return 'nav-link';
      }}
      style={({ isActive }) => ({
        color: isActive ? 'red' : 'blue'
      })}
    >
      Товары
    </NavLink>
  );
}
```

---

## Параметры маршрутов

### URL параметры

```jsx
// Определение маршрута с параметрами
<Route path="/user/:userId" element={<UserProfile />} />
<Route path="/user/:userId/post/:postId" element={<UserPost />} />

// Получение параметров в компоненте
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>Профиль пользователя #{userId}</div>;
}

function UserPost() {
  const { userId, postId } = useParams();
  
  return (
    <div>
      <p>Пользователь: {userId}</p>
      <p>Пост: {postId}</p>
    </div>
  );
}
```

### Опциональные параметры

```jsx
// Опциональный параметр
<Route path="/products/:category?" element={<ProductList />} />

function ProductList() {
  const { category } = useParams();
  
  return (
    <div>
      {category ? (
        <h1>Категория: {category}</h1>
      ) : (
        <h1>Все товары</h1>
      )}
    </div>
  );
}
```

### Splat маршруты (Wildcard)

```jsx
// Захват всех подпутей
<Route path="/docs/*" element={<DocsLayout />} />

function DocsLayout() {
  const params = useParams();
  const splat = params['*']; // Получаем оставшуюся часть пути
  
  return <div>Документация: {splat}</div>;
}
```

---

## Query параметры (Search Params)

### Работа с useSearchParams

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Получение параметров
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'name';
  const page = parseInt(searchParams.get('page') || '1');
  
  // Обновление параметров
  const updateFilter = (newCategory: string) => {
    setSearchParams({
      category: newCategory,
      sort,
      page: '1' // Сброс на первую страницу
    });
  };
  
  const updateSort = (newSort: string) => {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      prev.set('page', '1');
      return prev;
    });
  };
  
  return (
    <div>
      <div>
        <label>Категория:</label>
        <select 
          value={category} 
          onChange={(e) => updateFilter(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="electronics">Электроника</option>
          <option value="clothing">Одежда</option>
        </select>
      </div>
      
      <div>
        <label>Сортировка:</label>
        <select 
          value={sort} 
          onChange={(e) => updateSort(e.target.value)}
        >
          <option value="name">По названию</option>
          <option value="price">По цене</option>
          <option value="date">По дате</option>
        </select>
      </div>
      
      <p>
        Показана категория: {category}, сортировка: {sort}, страница: {page}
      </p>
    </div>
  );
}
```

### Типизированные query параметры

```tsx
interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: 'name' | 'price' | 'date';
}

function useProductFilters(): [ProductFilters, (filters: Partial<ProductFilters>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters: ProductFilters = {
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    inStock: searchParams.get('inStock') === 'true',
    sort: (searchParams.get('sort') as ProductFilters['sort']) || 'name'
  };
  
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
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
  
  return [filters, updateFilters];
}
```

---

## Outlet и вложенные маршруты

### Концепция Outlet

`Outlet` - это компонент-заглушка, который рендерит дочерние маршруты в родительском компоненте.

```jsx
import { Outlet } from 'react-router-dom';

// Layout компонент
function DashboardLayout() {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <Link to="/dashboard">Обзор</Link>
        <Link to="/dashboard/users">Пользователи</Link>
        <Link to="/dashboard/products">Товары</Link>
        <Link to="/dashboard/orders">Заказы</Link>
      </nav>
      
      <main className="content">
        <Outlet /> {/* Здесь рендерятся дочерние маршруты */}
      </main>
    </div>
  );
}

// Настройка вложенных маршрутов
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

### Глубокая вложенность

```jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<UsersLayout />}>
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<UserProfile />} />
              <Route path=":userId/edit" element={<EditUser />} />
              <Route path="create" element={<CreateUser />} />
            </Route>
            <Route path="products" element={<ProductsLayout />}>
              <Route index element={<ProductsList />} />
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
```

### Outlet с контекстом

```jsx
// Передача данных через Outlet context
function DashboardLayout() {
  const [user, setUser] = useState(null);
  
  return (
    <div className="dashboard">
      <nav>...</nav>
      <main>
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
}

// Получение контекста в дочернем компоненте
import { useOutletContext } from 'react-router-dom';

function UsersPage() {
  const { user, setUser } = useOutletContext();
  
  return (
    <div>
      <p>Текущий пользователь: {user?.name}</p>
    </div>
  );
}
```

---

## Программная навигация

### useNavigate хук

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      
      // Простой переход
      navigate('/dashboard');
      
      // Переход с заменой в истории
      navigate('/dashboard', { replace: true });
      
      // Переход с состоянием
      navigate('/dashboard', { 
        state: { user, fromLogin: true } 
      });
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      {/* форма входа */}
    </form>
  );
}
```

### Навигация с параметрами

```jsx
function UserList() {
  const navigate = useNavigate();
  
  const goToUser = (userId: string) => {
    navigate(`/user/${userId}`);
  };
  
  const goToUserWithTab = (userId: string, tab: string) => {
    navigate(`/user/${userId}?tab=${tab}`);
  };
  
  const goBack = () => {
    navigate(-1); // Назад в истории
  };
  
  const goForward = () => {
    navigate(1); // Вперед в истории
  };
  
  return (
    <div>
      <button onClick={() => goToUser('123')}>
        Пользователь 123
      </button>
      <button onClick={() => goToUserWithTab('123', 'settings')}>
        Настройки пользователя 123
      </button>
      <button onClick={goBack}>Назад</button>
      <button onClick={goForward}>Вперед</button>
    </div>
  );
}
```

### Условная навигация

```jsx
function useAuthNavigation() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const navigateWithAuth = (path: string, requireAuth = true) => {
    if (requireAuth && !isAuthenticated) {
      navigate('/login', { 
        state: { from: path } 
      });
      return;
    }
    
    navigate(path);
  };
  
  return { navigateWithAuth };
}

function SomeComponent() {
  const { navigateWithAuth } = useAuthNavigation();
  
  const handleClick = () => {
    navigateWithAuth('/dashboard'); // Перенаправит на /login если не авторизован
  };
  
  return <button onClick={handleClick}>К дашборду</button>;
}
```

---

## Полезные хуки

### useLocation

```jsx
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  console.log(location.pathname); // '/user/123'
  console.log(location.search);   // '?tab=profile&sort=name'
  console.log(location.hash);     // '#section1'
  console.log(location.state);    // Данные, переданные через navigate
  console.log(location.key);      // Уникальный ключ для этого location
  
  return (
    <div>
      <p>Текущий путь: {location.pathname}</p>
      {location.state?.from && (
        <p>Пришли с: {location.state.from}</p>
      )}
    </div>
  );
}
```

### useSearchParams (детально)

```jsx
function SearchComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Получение параметров
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  
  // Проверка наличия параметра
  const hasFilter = searchParams.has('filter');
  
  // Получение всех значений параметра (если их несколько)
  const tags = searchParams.getAll('tag');
  
  // Обновление отдельного параметра
  const updateQuery = (newQuery: string) => {
    setSearchParams(prev => {
      if (newQuery) {
        prev.set('q', newQuery);
      } else {
        prev.delete('q');
      }
      prev.set('page', '1'); // Сброс страницы
      return prev;
    });
  };
  
  // Добавление параметра к существующим
  const addTag = (tag: string) => {
    setSearchParams(prev => {
      prev.append('tag', tag);
      return prev;
    });
  };
  
  // Полная замена параметров
  const resetFilters = () => {
    setSearchParams({});
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <p>Теги: {tags.join(', ')}</p>
      <button onClick={() => addTag('новый-тег')}>
        Добавить тег
      </button>
      <button onClick={resetFilters}>
        Сбросить фильтры
      </button>
    </div>
  );
}
```

### useParams (типизированный)

```tsx
interface UserParams {
  userId: string;
  tab?: string;
}

function UserProfile() {
  const params = useParams() as UserParams;
  const { userId, tab } = params;
  
  // TypeScript теперь знает типы параметров
  const userIdNumber = parseInt(userId, 10);
  
  return (
    <div>
      <h1>Пользователь #{userIdNumber}</h1>
      {tab && <p>Активная вкладка: {tab}</p>}
    </div>
  );
}
```

---

## Обработка ошибок

### 404 страница

```jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Catch-all для несуществующих маршрутов */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

function NotFoundPage() {
  const location = useLocation();
  
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Путь "{location.pathname}" не существует</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
```

### Error Boundary для маршрутов

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Что-то пошло не так!</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>
        Попробовать снова
      </button>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/risky-page" element={<RiskyComponent />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}
```

### Защищенные маршруты

```jsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  
  if (!isAuthenticated) {
    // Перенаправляем на логин с сохранением пути
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
```

---

## Лучшие практики

### 1. Организация маршрутов

```jsx
// routes/index.tsx
export const routes = {
  home: '/',
  about: '/about',
  user: (id: string) => `/user/${id}`,
  userEdit: (id: string) => `/user/${id}/edit`,
  products: '/products',
  productCategory: (category: string) => `/products/${category}`,
} as const;

// Использование
<Link to={routes.user('123')}>Профиль</Link>
<Link to={routes.productCategory('electronics')}>Электроника</Link>
```

### 2. Типизация маршрутов

```tsx
// types/routes.ts
export interface AppRoutes {
  '/': {};
  '/about': {};
  '/user/:userId': { userId: string };
  '/products': {};
  '/products/:category': { category: string };
}

// Типизированный хук
function useTypedParams<T extends keyof AppRoutes>(): AppRoutes[T] {
  return useParams() as AppRoutes[T];
}

// Использование
function UserPage() {
  const { userId } = useTypedParams<'/user/:userId'>();
  // userId имеет тип string
}
```

### 3. Ленивая загрузка маршрутов

```jsx
import { lazy, Suspense } from 'react';

// Ленивая загрузка компонентов
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductCatalog />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 4. Хлебные крошки (Breadcrumbs)

```jsx
function useBreadcrumbs() {
  const location = useLocation();
  const params = useParams();
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  const breadcrumbs = pathnames.map((pathname, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    // Заменяем параметры на читаемые значения
    let label = pathname;
    if (params.userId && pathname === params.userId) {
      label = `Пользователь ${params.userId}`;
    }
    
    return { to, label };
  });
  
  return [{ to: '/', label: 'Главная' }, ...breadcrumbs];
}

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  
  return (
    <nav>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.to}>
          <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
          {index < breadcrumbs.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}
```

---

## Примеры использования

### Полный пример админ-панели

```jsx
// Layout компонент
function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const isActiveMenu = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="header">
        <h1>Админ панель</h1>
        <nav className="top-nav">
          <NavLink to="/admin/dashboard">Дашборд</NavLink>
          <NavLink to="/admin/users">Пользователи</NavLink>
          <NavLink to="/admin/products">Товары</NavLink>
          <NavLink to="/admin/orders">Заказы</NavLink>
          <NavLink to="/admin/settings">Настройки</NavLink>
          <button onClick={handleLogout}>Выйти</button>
        </nav>
      </header>
      
      <div className="main-content">
        {/* Sidebar для некоторых разделов */}
        {(isActiveMenu('/admin/users') || 
          isActiveMenu('/admin/products') || 
          isActiveMenu('/admin/orders')) && (
          <aside className="sidebar">
            <Outlet context={{ showSidebar: true }} />
          </aside>
        )}
        
        {/* Main content */}
        <main className="content">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Users Layout с боковым меню
function UsersLayout() {
  const { showSidebar } = useOutletContext();
  
  if (showSidebar) {
    return (
      <>
        {/* Sidebar content */}
        <nav className="sidebar-nav">
          <NavLink to="/admin/users">Список</NavLink>
          <NavLink to="/admin/users/create">Создать</NavLink>
          <NavLink to="/admin/users/roles">Роли</NavLink>
        </nav>
        {/* Main content в Outlet родителя */}
      </>
    );
  }
  
  return <Outlet />;
}

// Главный App компонент
function App() {
  return (
    <Router>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Админ маршруты */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Пользователи */}
          <Route path="users" element={<UsersLayout />}>
            <Route index element={<UsersList />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="roles" element={<UserRoles />} />
            <Route path=":userId" element={<UserProfile />} />
            <Route path=":userId/edit" element={<EditUser />} />
          </Route>
          
          {/* Товары */}
          <Route path="products" element={<ProductsLayout />}>
            <Route index element={<ProductsList />} />
            <Route path="categories" element={<Categories />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          
          {/* Заказы */}
          <Route path="orders" element={<OrdersLayout />}>
            <Route index element={<AllOrders />} />
            <Route path="pending" element={<PendingOrders />} />
            <Route path="completed" element={<CompletedOrders />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
```

Этот пример демонстрирует:

- Двухуровневую навигацию (header + sidebar)
- Вложенные маршруты с Outlet
- Условное отображение sidebar
- Типизированные параметры
- Защищенные маршруты
- Breadcrumbs навигацию
- Организованную структуру маршрутов

---

## Заключение

React Router предоставляет мощные инструменты для создания сложных навигационных структур в одностраничных приложениях. Ключевые принципы:

1. **Декларативность** - маршруты описываются как JSX компоненты
2. **Композиция** - сложные структуры собираются из простых компонентов
3. **Типобезопасность** - используйте TypeScript для типизации параметров
4. **Производительность** - применяйте ленивую загрузку для крупных разделов
5. **UX** - всегда предоставляйте fallback для загрузки и 404 страницы

React Router v6 делает маршрутизацию интуитивной и мощной, позволяя создавать профессиональные приложения с отличным пользовательским опытом.
