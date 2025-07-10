import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink,
    Navigate,
    useNavigate,
    useParams,
    useSearchParams,
    useLocation,
    Outlet
} from 'react-router-dom';

// Демо-компоненты для практических примеров
const HomePage: React.FC = () => (
    <div style={{
        border: '1px solid #333'
    }}>
        <h2>Главная страница</h2>
        <p>Добро пожаловать в React Router!</p>
    </div>
);

const AboutPage: React.FC = () => (
    <div style={{
        border: '1px solid #333'
    }}>
        <h2>О нас</h2>
        <p>Информация о компании</p>
    </div>
);

const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab') || 'profile';

    return (
        <div style={{
            border: '1px solid #333'
        }}>
            <h2>Профиль пользователя #{userId}</h2>
            <p>Активная вкладка: {tab}</p>

            <div style={{ marginTop: '16px' }}>
                <Link to={`/user/${userId}?tab=profile`} style={{ marginRight: '10px' }}>
                    Профиль
                </Link>
                <Link to={`/user/${userId}?tab=settings`}>
                    Настройки
                </Link>
            </div>
        </div>
    );
};

const ProductsLayout: React.FC = () => (
    <div style={{ display: 'flex', gap: '20px', border: '1px solid #333' }}>
        <nav style={{ width: '200px' }}>
            <h3>Категории</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><NavLink to="/products/electronics">Электроника</NavLink></li>
                <li><NavLink to="/products/clothing">Одежда</NavLink></li>
                <li><NavLink to="/products/books">Книги</NavLink></li>
            </ul>
        </nav>
        <div style={{ flex: 1 }}>
            <Outlet />
        </div>
    </div>
);

const ElectronicsPage: React.FC = () => (
    <div style={{
        border: '1px solid #333'
    }}>
        <h2>Электроника</h2>
        <p>Список электронных товаров</p>
    </div>
);

const ClothingPage: React.FC = () => (
    <div style={{
        border: '1px solid #333'
    }}>
        <h2>Одежда</h2>
        <p>Список одежды</p>
    </div>
);

const BooksPage: React.FC = () => (
    <div style={{
        border: '1px solid #333'
    }}>
        <h2>Книги</h2>
        <p>Список книг</p>
    </div>
);

const NotFoundPage: React.FC = () => (
    <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>404 - Страница не найдена</h2>
        <Link to="/">Вернуться на главную</Link>
    </div>
);

export const RouterDemoWithRouter = () => {
    return (
        <Router>
            <RouterDemo />
        </Router>
    )
}

// Компонент демонстрации роутинга
const RouterDemo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleProgrammaticNavigation = () => {
        navigate('/user/123?tab=settings');
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Навигационное меню */}
            <nav style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderBottom: '1px solid #dee2e6'
            }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>React Router Demo</h3>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? '#007bff' : '#333',
                            textDecoration: 'none',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to="/about"
                        style={({ isActive }) => ({
                            color: isActive ? '#007bff' : '#333',
                            textDecoration: 'none',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                    >
                        О нас
                    </NavLink>
                    <NavLink
                        to="/products"
                        style={({ isActive }) => ({
                            color: isActive ? '#007bff' : '#333',
                            textDecoration: 'none',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                    >
                        Товары
                    </NavLink>
                    <button onClick={handleProgrammaticNavigation}>
                        Профиль пользователя
                    </button>
                </div>
            </nav>

            {/* Информация о текущем роуте */}
            <div style={{
                backgroundColor: '#e9ecef',
                padding: '8px 16px',
                fontSize: '14px'
            }}>
                Текущий путь: {location.pathname}{location.search}
            </div>

            {/* Контент страниц */}
            <main style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                    <Route path="/products" element={<ProductsLayout />}>
                        <Route index element={<div>Выберите категорию товаров</div>} />
                        <Route path="electronics" element={<ElectronicsPage />} />
                        <Route path="clothing" element={<ClothingPage />} />
                        <Route path="books" element={<BooksPage />} />
                    </Route>
                    <Route path="/old-route" element={<Navigate to="/about" replace />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
};

// Основной компонент лекции
const Lecture10: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="lecture-container">
            <h1>Лекция 10: React Router - Навигация в SPA</h1>

            <div className="lecture-tabs">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Обзор
                    </div>
                    <div
                        className={`tab ${activeTab === 'basics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('basics')}
                    >
                        Основы
                    </div>
                    <div
                        className={`tab ${activeTab === 'advanced' ? 'active' : ''}`}
                        onClick={() => setActiveTab('advanced')}
                    >
                        Продвинутые возможности
                    </div>
                    <div
                        className={`tab ${activeTab === 'demo' ? 'active' : ''}`}
                        onClick={() => setActiveTab('demo')}
                    >
                        Практика
                    </div>
                    <div
                        className={`tab ${activeTab === 'homework' ? 'active' : ''}`}
                        onClick={() => setActiveTab('homework')}
                    >
                        Домашнее задание
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-content">
                            <h2>Обзор лекции</h2>
                            <p>
                                React Router - это стандартная библиотека для навигации в React-приложениях.
                                Она позволяет создавать одностраничные приложения (SPA) с множественными представлениями,
                                синхронизированными с URL браузера.
                            </p>

                            <h3>Цели обучения (30 минут теории)</h3>
                            <ul>
                                <li>Понять принципы клиентской маршрутизации</li>
                                <li>Изучить основные компоненты React Router</li>
                                <li>Освоить навигацию с Link и NavLink</li>
                                <li>Работать с параметрами маршрутов и query-строками</li>
                                <li>Понять концепцию Outlet для вложенных маршрутов</li>
                                <li>Научиться программной навигации</li>
                            </ul>

                            <h3>Практическая часть (30 минут)</h3>
                            <ul>
                                <li>Создание многоуровневой навигации</li>
                                <li>Реализация layout с Outlet</li>
                                <li>Работа с параметрами и фильтрами</li>
                                <li>Обработка ошибок 404</li>
                            </ul>

                            <div className="tip-box">
                                <p>
                                    <strong>Зачем нужен React Router?</strong> Браузер по умолчанию перезагружает страницу
                                    при смене URL. React Router перехватывает эти изменения и обновляет только компоненты,
                                    сохраняя состояние приложения.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'basics' && (
                        <div className="basics-content">
                            <h2>Основы React Router</h2>

                            <div className="lecture-section">
                                <h3>1. Установка и настройка</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`npm install react-router-dom

// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}`}
                                </pre>
                            </div>

                            <div className="lecture-section">
                                <h3>2. Основные компоненты</h3>
                                <ul>
                                    <li><strong>BrowserRouter:</strong> Корневой компонент для браузерной маршрутизации</li>
                                    <li><strong>Routes:</strong> Контейнер для определения маршрутов</li>
                                    <li><strong>Route:</strong> Определяет соответствие пути и компонента</li>
                                    <li><strong>Link:</strong> Декларативная навигация без перезагрузки</li>
                                    <li><strong>NavLink:</strong> Link с дополнительными возможностями стилизации</li>
                                </ul>
                            </div>

                            <div className="lecture-section">
                                <h3>3. Link vs NavLink</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`// Обычная ссылка
<Link to="/about">О нас</Link>

// Ссылка с активным состоянием
<NavLink 
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    fontWeight: isActive ? 'bold' : 'normal'
  })}
>
  О нас
</NavLink>

// С CSS классами
<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? 'active-link' : 'link'}
>
  О нас
</NavLink>`}
                                </pre>
                            </div>

                            <div className="lecture-section">
                                <h3>4. Параметры маршрутов</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`// Определение маршрута с параметром
<Route path="/user/:userId" element={<UserProfile />} />

// Получение параметров в компоненте
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <div>Пользователь #{userId}</div>;
}`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="advanced-content">
                            <h2>Продвинутые возможности</h2>

                            <div className="lecture-section">
                                <h3>1. Query параметры (Search Params)</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'name';
  
  const updateFilter = (newCategory: string) => {
    setSearchParams({
      category: newCategory,
      sort: sortBy
    });
  };
  
  return (
    <div>
      <p>Категория: {category}, Сортировка: {sortBy}</p>
      <button onClick={() => updateFilter('electronics')}>
        Электроника
      </button>
    </div>
  );
}`}
                                </pre>
                            </div>

                            <div className="lecture-section">
                                <h3>2. Outlet и вложенные маршруты</h3>
                                <p>Outlet - это компонент-заглушка, который рендерит дочерние маршруты.</p>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`// Layout компонент
function ProductsLayout() {
  return (
    <div className="products-layout">
      <nav>
        <Link to="/products/electronics">Электроника</Link>
        <Link to="/products/clothing">Одежда</Link>
      </nav>
      <main>
        <Outlet /> {/* Здесь рендерятся дочерние маршруты */}
      </main>
    </div>
  );
}

// Настройка маршрутов
<Routes>
  <Route path="/products" element={<ProductsLayout />}>
    <Route index element={<ProductsHome />} />
    <Route path="electronics" element={<Electronics />} />
    <Route path="clothing" element={<Clothing />} />
  </Route>
</Routes>`}
                                </pre>
                            </div>

                            <div className="lecture-section">
                                <h3>3. Программная навигация</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    if (success) {
      navigate('/dashboard'); // Простой переход
      // navigate('/dashboard', { replace: true }); // Замена в истории
      // navigate(-1); // Назад
      // navigate(1); // Вперед
    }
  };
  
  return <form onSubmit={handleLogin}>...</form>;
}`}
                                </pre>
                            </div>

                            <div className="lecture-section">
                                <h3>4. Полезные хуки</h3>
                                <pre style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#e2e8f0',
                                    padding: '15px',
                                    borderRadius: '6px',
                                    overflow: 'auto'
                                }}>
                                    {`import { useLocation, useNavigate } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log(location.pathname); // '/users/123'
  console.log(location.search);   // '?tab=profile'
  console.log(location.state);    // Данные, переданные через navigate
  
  // Переход с состоянием
  const goToUser = () => {
    navigate('/user/456', { 
      state: { from: location.pathname } 
    });
  };
}`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'demo' && (
                        <div className="demo-content">
                            <h2>Практическая демонстрация</h2>
                            <p>
                                Ниже представлена интерактивная демонстрация основных возможностей React Router.
                                Попробуйте разные виды навигации и обратите внимание на изменения URL.
                            </p>

                            <div className="demo-section">
                                <RouterDemo />
                            </div>

                            <div className="tip-box" style={{ marginTop: '20px' }}>
                                <h4>Что попробовать:</h4>
                                <ol>
                                    <li>Переходите по ссылкам в навигации - заметьте изменение стилей активной ссылки</li>
                                    <li>Зайдите в раздел "Товары" и попробуйте вложенную навигацию</li>
                                    <li>Нажмите "Профиль пользователя" для программной навигации</li>
                                    <li>Попробуйте изменить query-параметры в адресной строке</li>
                                    <li>Введите несуществующий URL для проверки 404 страницы</li>
                                </ol>
                            </div>
                        </div>
                    )}

                    {activeTab === 'homework' && (
                        <div className="homework-content">
                            <h2>Домашнее задание</h2>

                            <div className="warning" style={{
                                backgroundColor: '#fffaf0',
                                borderLeft: '4px solid #ed8936',
                                padding: '15px',
                                margin: '15px 0',
                                borderRadius: '0 4px 4px 0'
                            }}>
                                <p><strong>Цель:</strong> Создать многоуровневую систему навигации с использованием React Router</p>
                            </div>

                            <h3>Задание: Админ-панель с двухуровневой навигацией</h3>
                            <p>
                                Создайте админ-панель со следующей структурой:
                            </p>

                            <h3>Структура навигации</h3>
                            <ul>
                                <li>
                                    <strong>Верхнее меню (Header):</strong>
                                    <ul>
                                        <li>Дашборд (/dashboard)</li>
                                        <li>Пользователи (/users)</li>
                                        <li>Товары (/products)</li>
                                        <li>Заказы (/orders)</li>
                                        <li>Настройки (/settings)</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Боковое меню (только для некоторых разделов):</strong>
                                    <ul>
                                        <li>Пользователи: Список, Создать, Роли</li>
                                        <li>Товары: Список, Категории, Добавить</li>
                                        <li>Заказы: Все, В обработке, Выполненные</li>
                                    </ul>
                                </li>
                            </ul>

                            <h3>Технические требования</h3>
                            <ol>
                                <li>
                                    <strong>Layout структура:</strong> Header (навигация 0-го уровня) + Sidebar (1-го уровня) + Content (Outlet)
                                </li>
                                <li>
                                    <strong>Маршруты с параметрами:</strong> /users/:userId/edit, /products/:productId
                                </li>
                                <li>
                                    <strong>Query параметры:</strong> Фильтры для списков (поиск, сортировка, пагинация)
                                </li>
                                <li>
                                    <strong>Защищенные маршруты:</strong> Проверка авторизации для админских разделов
                                </li>
                                <li>
                                    <strong>Breadcrumbs:</strong> Хлебные крошки для навигации
                                </li>
                                <li>
                                    <strong>404 страница</strong> для несуществующих маршрутов
                                </li>
                            </ol>

                            <h3>Дополнительные возможности (бонус)</h3>
                            <ul>
                                <li>Сохранение состояния фильтров в URL</li>
                                <li>Модальные окна с собственными URL</li>
                                <li>Tabs с URL синхронизацией</li>
                                <li>Ленивая загрузка разделов</li>
                            </ul>

                            <div className="success" style={{
                                backgroundColor: '#f0fff4',
                                borderLeft: '4px solid #48bb78',
                                padding: '15px',
                                margin: '15px 0',
                                borderRadius: '0 4px 4px 0'
                            }}>
                                <p><strong>Срок сдачи:</strong> 1 неделя</p>
                                <p><strong>Формат:</strong> GitHub репозиторий + README с инструкциями</p>
                                <p><strong>Файлы:</strong> Включить отдельный MD файл с подробным техническим заданием</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lecture10;