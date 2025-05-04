---
tags: react, components, patterns, context
created: "2025-04-29"
updated: 2025-04-29
id: "react-compound-components"
---
# Составные компоненты, слоты и контекст в React

## Оглавление

- [Введение](#введение)
- [Составные компоненты](#составные-компоненты)
- [Слоты в React](#слоты-в-react)
- [Проброс и переиспользование контекста](#проброс-и-переиспользование-контекста)
- [Императивный API с useImperativeHandle](#императивный-api-с-useimperativehandle)
- [Комплексный пример: DataDetail](#комплексный-пример-datadetail)
- [Лучшие практики](#лучшие-практики)
- [Заключение](#заключение)

---

## Введение

Современный React предоставляет множество мощных паттернов для создания гибких, переиспользуемых и поддерживаемых компонентов UI. В этом материале мы рассмотрим четыре взаимосвязанных подхода, которые помогают создавать сложные интерфейсы с сохранением чистоты кода и гибкости:

- **Составные компоненты** — паттерн для создания компонентов, состоящих из связанных подкомпонентов
- **Слоты** — подход к определению мест для вставки содержимого в компоненты
- **Проброс контекста** — метод для обмена данными между компонентами без явной передачи через props
- **Императивный API** — способ предоставления императивных методов функциональным компонентам

Эти подходы часто используются вместе, создавая мощный инструментарий для разработки высококачественных пользовательских интерфейсов.

---

## Составные компоненты

### Что такое составные компоненты?

Составные компоненты (Compound Components) — это паттерн проектирования, в котором компонент экспортирует несколько подкомпонентов, которые работают вместе для обеспечения функциональности, имея доступ к общему состоянию.

> "Составные компоненты — это как LEGO-блоки, которые созданы работать вместе, но при этом предоставляют гибкость в их комбинировании."

### Ключевые характеристики

- Несколько связанных компонентов, выделенных как логические части
- Общее состояние или контекст для всех подкомпонентов
- Декларативный способ использования через JSX
- Гибкость в структуре и композиции

### Пример составного компонента

```jsx
// Определение составного компонента
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

// Подкомпоненты
Tabs.List = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  
  return (
    <div 
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </div>
  );
};

Tabs.Panel = ({ id, children }) => {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
};

// Использование
<Tabs defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab id="tab1">Первая вкладка</Tabs.Tab>
    <Tabs.Tab id="tab2">Вторая вкладка</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel id="tab1">Содержимое первой вкладки</Tabs.Panel>
  <Tabs.Panel id="tab2">Содержимое второй вкладки</Tabs.Panel>
</Tabs>
```

### Способы реализации составных компонентов

#### 1. Статические свойства

Самый простой способ — прикрепить подкомпоненты как статические свойства основного компонента:

```jsx
const Menu = (props) => {
  return <div className="menu">{props.children}</div>;
};

Menu.Item = (props) => {
  return <div className="menu-item">{props.children}</div>;
};

// Использование
<Menu>
  <Menu.Item>Пункт 1</Menu.Item>
  <Menu.Item>Пункт 2</Menu.Item>
</Menu>
```

#### 2. React Context

Более гибкий подход — использование React Context для обмена состоянием:

```jsx
const MenuContext = React.createContext();

const Menu = ({ children }) => {
  const [activeItem, setActiveItem] = useState(null);
  
  return (
    <MenuContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  );
};

Menu.Item = ({ id, children }) => {
  const { activeItem, setActiveItem } = useContext(MenuContext);
  
  return (
    <div 
      className={`menu-item ${activeItem === id ? 'active' : ''}`}
      onClick={() => setActiveItem(id)}
    >
      {children}
    </div>
  );
};
```

#### 3. React.Children и клонирование элементов

Иногда используется подход с клонированием элементов для передачи дополнительных props:

```jsx
const Menu = ({ children, activeItem, onItemSelect }) => {
  return (
    <div className="menu">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Menu.Item) {
          return React.cloneElement(child, {
            active: child.props.id === activeItem,
            onSelect: onItemSelect
          });
        }
        return child;
      })}
    </div>
  );
};
```

### Преимущества составных компонентов

- **Гибкость и контроль** — разработчик может точно определить структуру компонента
- **Инкапсуляция логики** — общая логика скрыта от пользователя, но с сохранением гибкости
- **Единая ответственность** — каждый подкомпонент имеет четкую роль
- **Интуитивный API** — использование напоминает обычный HTML
- **Расширяемость** — легкость добавления новых подкомпонентов

### Недостатки и ограничения

- **Сложность начальной настройки** — требует больше кода для создания
- **Потенциальные проблемы с типизацией** — требует дополнительных усилий при использовании TypeScript
- **Необходимость документации** — API не всегда очевиден без примеров
- **Возможность неправильного использования** — ничто не мешает пользователю нарушить ожидаемую структуру

---

## Слоты в React

### Концепция слотов

Слоты (Slots) — это паттерн проектирования, который позволяет родительскому компоненту определять места для вставки дочерних элементов. В некоторых фреймворках, таких как Vue или Web Components, слоты являются встроенной функциональностью, но в React эту концепцию необходимо реализовывать самостоятельно.

### Реализация слотов в React

Поскольку React не имеет встроенной концепции слотов, существует несколько подходов к их реализации:

#### 1. Через пропсы с React-элементами

```jsx
function Card({ header, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// Использование
<Card
  header={<h2>Заголовок карточки</h2>}
  content={<p>Содержимое карточки</p>}
  footer={<button>Подробнее</button>}
/>
```

#### 2. Через React.Children и фильтрацию

```jsx
const CardHeader = ({ children }) => children;
const CardContent = ({ children }) => children;
const CardFooter = ({ children }) => children;

function Card({ children }) {
  const header = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === CardHeader
  );
  
  const content = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === CardContent
  );
  
  const footer = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === CardFooter
  );
  
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// Использование
<Card>
  <CardHeader>
    <h2>Заголовок</h2>
  </CardHeader>
  <CardContent>
    <p>Содержимое</p>
  </CardContent>
  <CardFooter>
    <button>Подробнее</button>
  </CardFooter>
</Card>
```

#### 3. Через пропсы с именованными слотами

```jsx
function Layout({ 
  header = <DefaultHeader />,
  sidebar = <DefaultSidebar />,
  footer = <DefaultFooter />,
  children 
}) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="layout-container">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}

// Использование
<Layout
  header={<CustomHeader />}
  sidebar={<Navigation items={menuItems} />}
  footer={<CustomFooter />}
>
  <h1>Основное содержимое</h1>
  <p>Текст страницы...</p>
</Layout>
```

### Преимущества слотов

- **Гибкость размещения** — четкий контроль над тем, где отображать различные части содержимого
- **Переиспользуемость** — создание шаблонов, которые легко наполнять разным содержимым
- **Декларативность** — структура компонента наглядно видна при использовании
- **Дефолтное содержимое** — возможность определить содержимое по умолчанию для слотов

### Сравнение с составными компонентами

|Аспект|Слоты|Составные компоненты|
|------|-----|---------------------|
|Фокус|Расположение содержимого|Связь между подкомпонентами|
|Контроль структуры|Определена компонентом|Определяется пользователем|
|Общее состояние|Обычно нет|Часто присутствует|
|Типичное использование|Макеты, карточки, панели|Сложные интерактивные компоненты|

В реальных приложениях эти подходы часто используются вместе, дополняя друг друга.

---

## Проброс и переиспользование контекста

### Введение в React Context

React Context API — механизм для "телепортации" данных через дерево компонентов без необходимости передачи props через каждый промежуточный компонент (избегая "prop drilling").

```jsx
// Создание контекста
const ThemeContext = React.createContext({ theme: 'light' });

// Провайдер контекста
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Потребление контекста
function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <button className={`btn-${theme}`}>
      Кнопка с темой {theme}
    </button>
  );
}
```

### Проброс контекста (Context Forwarding)

Проброс контекста — это практика, при которой компонент не только использует контекст, но и передает его дальше, часто с дополнительной обработкой или объединением с другими данными.

```jsx
function useAuth() {
  return useContext(AuthContext);
}

// Компонент с пробросом контекста
function UserPanel() {
  const auth = useAuth(); // Получаем контекст
  
  // Используем и пробрасываем дальше
  return (
    <div>
      <UserInfo user={auth.user} />
      <UserActions auth={auth} /> {/* Проброс */}
    </div>
  );
}

// Потребляющий компонент
function UserActions({ auth }) {
  return (
    <div>
      <button onClick={auth.logout}>Выйти</button>
      <button onClick={() => auth.updateProfile()}>Редактировать профиль</button>
    </div>
  );
}
```

### Кастомные хуки для доступа к контексту

Одна из лучших практик при работе с контекстом — создание кастомных хуков, которые инкапсулируют логику работы с контекстом:

```jsx
// Создание контекста
const UserContext = React.createContext(null);

// Хук для доступа к контексту
function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Провайдер
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    // Логика входа
  };
  
  const logout = () => {
    // Логика выхода
  };
  
  const value = {
    user,
    login,
    logout
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Экспорт для использования
export { UserProvider, useUser };
```

### Переиспользование контекста

Переиспользование контекста — практика создания модульных, переиспользуемых контекстов, которые можно применять в разных частях приложения или даже в разных проектах.

```jsx
// theme-context.js — переиспользуемый модуль
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст с дефолтными значениями
const ThemeContext = createContext({
  isDark: false,
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#646cff'
  },
  toggleTheme: () => {}
});

// Хук для использования контекста
export const useThemeColor = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeColor must be used within a ThemeProvider');
  }
  return context;
};

// Провайдер для внедрения в приложение
export const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  const [isDark, setIsDark] = useState(initialTheme === 'dark');
  
  // Определение цветов в зависимости от темы
  const colors = isDark
    ? {
        text: '#fff',
        background: '#242424',
        backgroundAlt: '#1a1a1a',
        primary: '#747bff',
        border: '#333'
      }
    : {
        text: '#213547',
        background: '#ffffff',
        backgroundAlt: '#f9f9f9',
        primary: '#646cff',
        border: '#e5e5e5'
      };
  
  // Функция переключения темы
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  // Определение значения контекста
  const value = {
    isDark,
    colors,
    toggleTheme
  };
  
  // Синхронизация с localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Использование в приложении:
// import { ThemeProvider, useThemeColor } from './theme-context';
```

### Вложенные контексты и композиция

Контексты можно вкладывать друг в друга для создания сложных структур данных:

```jsx
// Комбинированные провайдеры
function AppProviders({ children }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <NotificationsProvider>
            <LocalizationProvider>
              {children}
            </LocalizationProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Использование
function App() {
  return (
    <AppProviders>
      <Router>
        <MainLayout />
      </Router>
    </AppProviders>
  );
}
```

### Лучшие практики работы с контекстом

- **Разделение контекстов по ответственности** — создавайте отдельные контексты для разных типов данных
- **Кастомные хуки для доступа** — оборачивайте `useContext` в специализированные хуки
- **Проверка на существование контекста** — добавляйте проверки на наличие контекста
- **Учитывайте производительность** — большие объекты или часто меняющиеся значения могут вызывать лишние ререндеры
- **Разделение состояние и обновлений** — иногда полезно разделить данные и функции их обновления на разные контексты

---

## Императивный API с useImperativeHandle

### Декларативное vs Императивное программирование в React

React в основном следует **декларативной** парадигме, где UI является функцией от состояния. Однако иногда необходим **императивный** подход, особенно при работе с:

- Управлением фокусом и выделением
- Измерениями и позиционированием
- Анимациями и переходами
- Интеграцией с DOM API и сторонними библиотеками
- Явным управлением компонентами (открытие/закрытие, сброс и т.д.)

### Введение в useImperativeHandle

`useImperativeHandle` — это хук, который настраивает значение экземпляра, который предоставляется родительскому компоненту при использовании `ref`. Он используется с `forwardRef` для экспорта императивных методов из функционального компонента.

```jsx
useImperativeHandle(ref, createHandle, dependencies?)
```

### Базовый пример использования

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// Интерфейс для императивных методов
interface InputHandles {
  focus: () => void;
  clear: () => void;
}

// Компонент с forwardRef и useImperativeHandle
const ImperativeInput = forwardRef<InputHandles, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    // Внутренний ref для доступа к DOM-элементу
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Экспорт методов через useImperativeHandle
    useImperativeHandle(ref, () => ({
      // Метод для установки фокуса
      focus: () => {
        inputRef.current?.focus();
      },
      
      // Метод для очистки поля
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }));
    
    return <input ref={inputRef} placeholder={placeholder} />;
  }
);

// Использование компонента с императивным API
function App() {
  // Создаем ref с типом InputHandles
  const inputRef = useRef<InputHandles>(null);
  
  const handleFocusClick = () => {
    // Вызываем императивный метод
    inputRef.current?.focus();
  };
  
  const handleClearClick = () => {
    // Вызываем императивный метод
    inputRef.current?.clear();
  };
  
  return (
    <div>
      <ImperativeInput ref={inputRef} placeholder="Введите текст" />
      <button onClick={handleFocusClick}>Фокус</button>
      <button onClick={handleClearClick}>Очистить</button>
    </div>
  );
}
```

### Расширенный пример: Управление формой

```jsx
// Интерфейс для императивных методов формы
interface FormHandles {
  reset: () => void;
  validate: () => boolean;
  submit: () => void;
  getValues: () => Record<string, any>;
}

const ImperativeForm = forwardRef<FormHandles, FormProps>(
  ({ defaultValues, onSubmit }, ref) => {
    const [values, setValues] = useState(defaultValues || {});
    const [errors, setErrors] = useState({});
    
    // Функция валидации формы
    const validate = () => {
      // Логика валидации
      const newErrors = {};
      // ...
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    // Экспорт методов через useImperativeHandle
    useImperativeHandle(ref, () => ({
      reset: () => {
        setValues(defaultValues || {});
        setErrors({});
      },
      validate,
      submit: () => {
        if (validate()) {
          onSubmit?.(values);
        }
      },
      getValues: () => values
    }));
    
    // Рендер формы...
    return (
      <form>
        {/* Поля формы... */}
        <button type="button" onClick={() => validate()}>Проверить</button>
        <button type="button" onClick={() => ref.current?.submit()}>Отправить</button>
      </form>
    );
  }
);
```

### Обработка зависимостей в useImperativeHandle

Как и в других хуках, можно указать массив зависимостей для обновления императивных методов:

```jsx
useImperativeHandle(
  ref,
  () => ({
    validate: () => {
      // Логика, использующая актуальные values
      return validateValues(values);
    },
    // Другие методы...
  }),
  [values] // Зависимости
);
```

### Типичные ситуации для использования

1. **Управление фокусом и выделением**

   ```jsx
   // Пример для текстового редактора
   useImperativeHandle(ref, () => ({
     focus: () => editorRef.current?.focus(),
     selectAll: () => editorRef.current?.select(),
     moveCursorToEnd: () => {
       if (editorRef.current) {
         editorRef.current.focus();
         editorRef.current.setSelectionRange(
           editorRef.current.value.length,
           editorRef.current.value.length
         );
       }
     }
   }));
   ```

2. **Управление модальными окнами и диалогами**

   ```jsx
   // Пример для модального окна
   useImperativeHandle(ref, () => ({
     open: () => setIsOpen(true),
     close: () => setIsOpen(false),
     alert: (message) => {
       setModalContent(message);
       setIsOpen(true);
     }
   }));
   ```

3. **Управление формами**

   ```jsx
   // Пример для формы
   useImperativeHandle(ref, () => ({
     reset: () => {
       setValues({});
       setErrors({});
     },
     setFieldValue: (field, value) => {
       setValues(prev => ({ ...prev, [field]: value }));
     },
     submit: () => {
       // Логика отправки формы
     }
   }));
   ```

### Лучшие практики

- **Минимализм** — экспортируйте только необходимые методы и свойства
- **Типизация** — используйте TypeScript для определения интерфейса императивных методов
- **Состояние и ререндеринг** — учитывайте, что изменения внутренних ref не вызывают ререндеринг
- **Документирование** — явно документируйте императивный API для других разработчиков
- **Избегайте избыточного использования** — применяйте императивный подход только когда декларативный неудобен

---

## Комплексный пример: DataDetail

Давайте рассмотрим комплексный пример, который объединяет все изученные концепции: составные компоненты, слоты, контекст и императивный API.

```jsx
import React, { createContext, useContext, forwardRef, useImperativeHandle, useState, ReactNode } from 'react';
import { useThemeColor } from './theme-context';

// Определение типов для составного компонента
interface DataDetailProps {
  children: ReactNode;
  className?: string;
  title?: string;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
}

// Определение контекста для DataDetail
interface DataDetailContextType {
  expanded: boolean;
  toggleExpand: () => void;
}

// Создание контекста
const DataDetailContext = createContext<DataDetailContextType | undefined>(undefined);

// Хук для использования контекста
export const useDataDetail = () => {
  const context = useContext(DataDetailContext);
  if (!context) {
    throw new Error('useDataDetail must be used within a DataDetail component');
  }
  return context;
};

// Интерфейс для императивного хэндла
export interface DataDetailHandles {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// Основной компонент DataDetail с поддержкой forwardRef и составных компонентов
const DataDetail = forwardRef<DataDetailHandles, DataDetailProps>(({
  children,
  className = '',
  title,
  expanded = true,
  onExpand
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { colors } = useThemeColor();

  // Функция переключения состояния
  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onExpand) {
      onExpand(newState);
    }
  };

  // Экспорт методов через useImperativeHandle
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsExpanded(true);
      if (onExpand) onExpand(true);
    },
    close: () => {
      setIsExpanded(false);
      if (onExpand) onExpand(false);
    },
    toggle: toggleExpand
  }));

  // Значение контекста
  const contextValue: DataDetailContextType = {
    expanded: isExpanded,
    toggleExpand
  };

  // Проверка наличия компонентов
  const hasHeader = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === DataDetail.Header
  );

  return (
    <DataDetailContext.Provider value={contextValue}>
      <div 
        className={`data-detail ${className} ${isExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          transition: 'all 0.3s ease'
        }}
      >
        {title && !hasHeader && (
          <DataDetail.Header>{title}</DataDetail.Header>
        )}
        {children}
      </div>
    </DataDetailContext.Provider>
  );
});

// Определение типов для подкомпонентов
interface HeaderProps {
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

interface BodyProps {
  children: ReactNode;
  className?: string;
}

interface FooterProps {
  children?: ReactNode;
  className?: string;
}

interface ActionsProps {
  children: ReactNode;
  className?: string;
}

// Компонент заголовка
const Header: React.FC<HeaderProps> = ({ children, className = '', actions }) => {
  const { expanded, toggleExpand } = useDataDetail();
  const { colors } = useThemeColor();

  return (
    <div 
      className={`data-detail-header ${className}`}
      style={{
        padding: '12px 16px',
        borderBottom: expanded ? `1px solid ${colors.border}` : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.headerBg || colors.backgroundAlt || colors.background,
        fontWeight: 600,
        cursor: 'pointer'
      }}
      onClick={toggleExpand}
    >
      <div className="data-detail-title">
        {children}
      </div>
      <div 
        className="data-detail-header-actions"
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {actions}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px'
          }}
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
};

// Компонент тела
const Body: React.FC<BodyProps> = ({ children, className = '' }) => {
  const { expanded } = useDataDetail();
  const { colors } = useThemeColor();

  if (!expanded) return null;

  return (
    <div 
      className={`data-detail-body ${className}`}
      style={{
        padding: '16px',
        backgroundColor: colors.background
      }}
    >
      {children}
    </div>
  );
};

// Компонент подвала
const Footer: React.FC<FooterProps> = ({ children, className = '' }) => {
  const { expanded } = useDataDetail();
  const { colors } = useThemeColor();

  if (!expanded) return null;

  return (
    <div 
      className={`data-detail-footer ${className}`}
      style={{
        padding: '12px 16px',
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.footerBg || colors.backgroundAlt || colors.background
      }}
    >
      {children}
    </div>
  );
};

// Компонент для действий
const Actions: React.FC<ActionsProps> = ({ children, className = '' }) => {
  const { colors } = useThemeColor();

  return (
    <div 
      className={`data-detail-actions ${className}`}
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  );
};

// Присоединение подкомпонентов к основному компоненту
DataDetail.Header = Header;
DataDetail.Body = Body;
DataDetail.Footer = Footer;
DataDetail.Actions = Actions;

export default DataDetail;
```

### Использование DataDetail

```jsx
import React, { useRef } from 'react';
import DataDetail, { DataDetailHandles } from './DataDetail';

function ExamplePage() {
  const dataDetailRef = useRef<DataDetailHandles>(null);

  return (
    <div>
      <h1>Пример использования DataDetail</h1>
      
      <div>
        <button onClick={() => dataDetailRef.current?.open()}>Открыть</button>
        <button onClick={() => dataDetailRef.current?.close()}>Закрыть</button>
        <button onClick={() => dataDetailRef.current?.toggle()}>Переключить</button>
      </div>
      
      <DataDetail
        ref={dataDetailRef}
        title="Информация о пользователе"
      >
        <DataDetail.Body>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <h4>Личная информация</h4>
              <form>
                <div>
                  <label>Имя:</label>
                  <input type="text" defaultValue="Иван Иванов" />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" defaultValue="ivan@example.com" />
                </div>
              </form>
            </div>
            <div>
              <h4>Настройки</h4>
              <div>
                <label>
                  <input type="checkbox" defaultChecked />
                  Получать уведомления
                </label>
              </div>
            </div>
          </div>
        </DataDetail.Body>
        <DataDetail.Footer>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button>Отмена</button>
            <button>Сохранить</button>
          </div>
        </DataDetail.Footer>
      </DataDetail>
      
      {/* Альтернативный вариант с кастомным заголовком */}
      <DataDetail ref={dataDetailRef}>
        <DataDetail.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span>
            <span>Мои заметки</span>
          </div>
          <DataDetail.Actions>
            <button>Печать</button>
            <button>Поделиться</button>
          </DataDetail.Actions>
        </DataDetail.Header>
        <DataDetail.Body>
          <p>Содержимое компонента...</p>
        </DataDetail.Body>
      </DataDetail>
    </div>
  );
}
```

Этот пример демонстрирует все ключевые концепции, которые мы рассмотрели:

1. **Составные компоненты** — `DataDetail` экспортирует несколько подкомпонентов, которые работают вместе
2. **Слоты** — компонент принимает различное содержимое в разных частях (заголовок, тело, футер, действия)
3. **Контекст** — подкомпоненты связаны через контекст `DataDetailContext`
4. **Императивный API** — компонент предоставляет методы для внешнего управления через `ref`
5. **Переиспользование контекста** — используется `useThemeColor` для темизации компонента

---

## Лучшие практики

### Составные компоненты

- **Ясное именование** — имена подкомпонентов должны быть интуитивно понятными
- **Проверка структуры** — проверяйте, что дочерние компоненты используются правильно
- **Гибкость вложенности** — позволяйте подкомпонентам располагаться на любой глубине
- **Запасные варианты** — предоставляйте разумные значения по умолчанию и возможности переопределения

### Слоты

- **Консистентность** — используйте одинаковый подход к слотам во всем приложении
- **Стандартное содержимое** — предоставляйте содержимое по умолчанию для необязательных слотов
- **Типизация** — четко определяйте, какие данные ожидаются в каждом слоте
- **Документация** — ясно описывайте назначение и ожидаемое содержимое каждого слота

### Контекст

- **Разделение по назначению** — каждый контекст должен иметь четкую ответственность
- **Кастомные хуки** — инкапсулируйте работу с контекстом в специализированные хуки
- **Проверка наличия** — всегда проверяйте, что контекст используется внутри провайдера
- **Оптимизация ререндеров** — разделяйте контексты для часто меняющихся данных

### Императивный API

- **Минимальный набор** — экспортируйте только необходимые методы
- **Проверка на null** — всегда проверяйте наличие ref.current перед вызовом методов
- **Консистентная семантика** — используйте одинаковые названия для похожих действий
- **Типизация** — используйте TypeScript для определения интерфейса императивных методов

### Общие советы

- **Композиция над наследованием** — предпочитайте композицию компонентов их наследованию
- **Документация и примеры** — предоставляйте ясную документацию с примерами использования
- **Учет доступности (a11y)** — убедитесь, что ваши компоненты доступны для всех пользователей
- **Тестирование** — пишите тесты для всех важных аспектов ваших компонентов

---

## Заключение

Составные компоненты, слоты, проброс контекста и императивный API — это мощные инструменты в арсенале React-разработчика. Они позволяют создавать гибкие, переиспользуемые и хорошо структурированные компоненты, которые легко адаптировать для разных сценариев.

Используя эти подходы вместе, вы можете создать собственную мини-библиотеку компонентов, которая будет решать специфические задачи вашего проекта, оставаясь при этом гибкой и хорошо поддерживаемой.

Ключевой принцип — баланс между абстракцией и конкретикой, между гибкостью и управляемостью. При правильном использовании эти паттерны значительно улучшают качество вашего кода и упрощают создание сложных пользовательских интерфейсов.

---

### Ссылки на ресурсы

- [Composition vs Inheritance в React (официальная документация)](https://react.dev/learn/composition-vs-inheritance)
- [Паттерн Compound Components (Kent C. Dodds)](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Глубокое погружение в React Context API](https://reactjs.org/docs/context.html)
- [React Hooks API: useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
- [Building Resilient Component APIs with React (Сэм Зейн)](https://www.samdawson.dev/article/react-component-api-design)

---

### Zero-links

[[00_react-lessons]]

---

### Links

- [React Component Design Patterns](https://www.patterns.dev/react)
- [Advanced React Component Patterns](https://frontendmasters.com/courses/advanced-react-patterns/)}
