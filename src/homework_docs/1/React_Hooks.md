---
tags: 
created: "{{date}} {{time}}"
updated: 2025-04-09T19:00
id: "id: {{date}}{{time}}"
---
# React Hooks: Полное Руководство и Лучшие Практики

## Оглавление

- [Введение](#введение)
- [useState: Управление состоянием](#usestate-управление-состоянием)
- [useEffect: Работа с эффектами](#useeffect-работа-с-эффектами)
- [useRef vs createRef: В чем разница?](#useref-vs-createref-в-чем-разница)
- [useCallback: Мемоизация функций](#usecallback-мемоизация-функций)
- [useMemo: Оптимизация вычислений](#usememo-оптимизация-вычислений)
- [useContext: Глобальное состояние](#usecontext-глобальное-состояние)
- [useReducer: Сложное состояние](#usereducer-сложное-состояние)
- [React.memo: Предотвращение рендеров](#reactmemo-предотвращение-рендеров)
- [Пользовательские хуки](#пользовательские-хуки)
- [Лучшие практики](#лучшие-практики)
- [Типичные ошибки и их решения](#типичные-ошибки-и-их-решения)
- [Заключение](#заключение)

---

## Введение

React Hooks были представлены в версии 16.8, совершив революцию в том, как мы пишем компоненты. Хуки позволяют использовать состояние и другие возможности React без написания классов.

> "Хуки позволяют разбивать один компонент на функции по принципу их логической принадлежности, а не по методам жизненного цикла."
>
> — React Team

### Основные преимущества хуков

- ✅ Повторное использование логики без изменения иерархии компонентов
- ✅ Разделение кода на логические части, а не по методам жизненного цикла
- ✅ Использование React без классов
- ✅ Упрощение кода и улучшение его читаемости

---

## useState: Управление состоянием

### Что такое useState?

`useState` — это хук, который позволяет добавить локальное состояние в функциональный компонент.

### Синтаксис

```jsx
const [state, setState] = useState(initialValue);
```

### Пример использования

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Текущий счет: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
}
```

### Лучшие практики

- ✅ Используйте отдельные вызовы `useState` для несвязанных данных
- ✅ Используйте функциональное обновление для вычислений, зависящих от предыдущего состояния
- ✅ Задавайте осмысленные имена переменным состояния и функциям-сеттерам

### Пример функционального обновления

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Неправильно: может привести к ошибкам при асинхронном обновлении
  const incrementBad = () => setCount(count + 1);
  
  // Правильно: всегда использует актуальное предыдущее состояние
  const incrementGood = () => setCount(prevCount => prevCount + 1);
  
  return (
    <div>
      <p>Счет: {count}</p>
      <button onClick={incrementGood}>Увеличить</button>
    </div>
  );
}
```

---

## useEffect: Работа с эффектами

### Что такое useEffect?

`useEffect` позволяет выполнять побочные эффекты в функциональных компонентах: запросы данных, подписки на события, прямые манипуляции с DOM и т.д.

### Синтаксис

```jsx
useEffect(() => {
  // Код эффекта
  
  // Опциональная функция очистки
  return () => {
    // Код очистки
  };
}, [dependencies]); // Массив зависимостей
```

### Варианты использования

|Зависимости|Когда запускается|Аналог в классовых компонентах|
|---|---|---|
|отсутствуют|После каждого рендера|componentDidUpdate|
|`[]` (пустой массив)|Только после первого рендера|componentDidMount|
|`[a, b]`|После первого рендера и когда a или b изменяются|componentDidMount + componentDidUpdate с проверкой|

### Примеры использования

#### 1. Запрос данных при монтировании

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]); // Перезапускается при изменении userId
  
  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не найден</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

#### 2. Подписка на событие с очисткой

```jsx
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Функция очистки: удаление обработчика события
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив = только при монтировании/размонтировании
  
  return (
    <div>
      <p>Ширина окна: {windowSize.width}px</p>
      <p>Высота окна: {windowSize.height}px</p>
    </div>
  );
}
```

### Лучшие практики

- ✅ Всегда указывайте все зависимости, от которых зависит эффект
- ✅ Используйте ESLint-плагин `eslint-plugin-react-hooks` для проверки зависимостей
- ✅ Делайте очистку (return функция) для подписок, таймеров, и других ресурсов
- ✅ Разделяйте эффекты по их логическому назначению

---

## useRef vs createRef: В чем разница?

### Что такое Refs?

Refs предоставляют способ доступа к DOM-узлам или элементам, созданным в методе render.

### createRef

`createRef` создает новую ссылку при каждом рендере. Предназначен для использования в классовых компонентах.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
  render() {
    return <div ref={this.myRef}>Элемент</div>;
  }
  
  componentDidMount() {
    console.log(this.myRef.current); // Доступ к DOM-элементу
  }
}
```

### useRef

`useRef` создает мутабельный объект с ключом `.current`, который сохраняется между рендерами. Используется в функциональных компонентах.

```jsx
function MyComponent() {
  const myRef = useRef(null);
  
  useEffect(() => {
    console.log(myRef.current); // Доступ к DOM-элементу
  }, []);
  
  return <div ref={myRef}>Элемент</div>;
}
```

### Ключевые отличия

|Аспект|createRef|useRef|
|---|---|---|
|Создание|Новая ссылка при каждом рендере|Та же ссылка между рендерами|
|Применение|Классовые компоненты|Функциональные компоненты|
|Как работает|Устанавливается в конструкторе|Хук React|

### Примеры использования useRef

#### 1. Доступ к DOM-элементам

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Установка фокуса на инпут при монтировании
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} type="text" />;
}
```

#### 2. Хранение предыдущего состояния

```jsx
function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    // Сохраняем текущее значение для следующего рендера
    prevCountRef.current = count;
  });
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>Текущее значение: {count}</p>
      <p>Предыдущее значение: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
}
```

#### 3. Хранение мутабельных значений

```jsx
function StopwatchWithTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };
  
  return (
    <div>
      <p>Время: {time} сек.</p>
      <button onClick={handleStart} disabled={isRunning}>Старт</button>
      <button onClick={handleStop} disabled={!isRunning}>Стоп</button>
      <button onClick={handleReset}>Сброс</button>
    </div>
  );
}
```

### Лучшие практики

- ✅ Используйте `useRef` вместо переменных для хранения значений между рендерами
- ✅ Используйте `useRef` для доступа к DOM-элементам в функциональных компонентах
- ✅ Не злоупотребляйте прямыми манипуляциями с DOM через refs

---

## useCallback: Мемоизация функций

### Что такое useCallback?

`useCallback` возвращает мемоизированную версию функции, которая изменяется только при изменении значений в массиве зависимостей.

### Синтаксис

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b], // Зависимости
);
```

### Для чего он нужен?

1. Предотвращает ненужные рендеры дочерних компонентов
2. Оптимизирует производительность при передаче функций дочерним компонентам
3. Необходим для стабильности ссылок в зависимостях других хуков

### Пример использования

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Без useCallback: функция создается заново при каждом рендере
  const handleClickBad = () => {
    console.log(`Count: ${count}`);
  };
  
  // С useCallback: функция пересоздается только при изменении count
  const handleClickGood = useCallback(() => {
    console.log(`Count: ${count}`);
  }, [count]);
  
  return (
    <div>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Type here..." 
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* При изменении text, ExpensiveComponent будет перерендерен, 
          если использовать handleClickBad */}
      <ExpensiveComponent onClick={handleClickGood} />
    </div>
  );
}

// Компонент, который будет перерендерен только при изменении его пропсов
const ExpensiveComponent = React.memo(({ onClick }) => {
  console.log('ExpensiveComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

### Лучшие практики

- ✅ Используйте `useCallback` для функций, передаваемых в компоненты обернутые в `React.memo`
- ✅ Используйте `useCallback` для функций, которые являются зависимостями других хуков
- ✅ Не злоупотребляйте — мемоизация имеет свои накладные расходы

---

## useMemo: Оптимизация вычислений

### Что такое useMemo?

`useMemo` возвращает мемоизированное значение, которое пересчитывается только при изменении зависимостей.

### Синтаксис

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b], // Зависимости
);
```

### Для чего он нужен?

1. Кэширует результаты дорогостоящих вычислений
2. Предотвращает ненужные вычисления при рендере
3. Сохраняет стабильные ссылки на объекты

### Пример использования

```jsx
function ProductList({ products, filterText }) {
  // Дорогостоящая фильтрация и сортировка
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products
      .filter(product => 
        product.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => a.price - b.price);
  }, [products, filterText]); // Пересчитывается только при изменении products или filterText
  
  return (
    <div>
      <p>Showing {filteredProducts.length} products</p>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useMemo vs useCallback

|useMemo|useCallback|
|---|---|
|Мемоизирует **результат** функции|Мемоизирует **саму функцию**|
|`useMemo(() => fn, deps)`|`useCallback(fn, deps)`|
|Используется для кэширования вычисленных значений|Используется для сохранения ссылки на функцию|

### Лучшие практики

- ✅ Используйте для дорогостоящих вычислений
- ✅ Используйте для стабилизации ссылок на объекты, передаваемые в дочерние компоненты
- ✅ Не мемоизируйте простые операции — это может быть дороже, чем просто выполнить их

---

## useContext: Глобальное состояние

### Что такое useContext?

`useContext` позволяет компоненту получить доступ к данным из ближайшего Context.Provider вверх по дереву компонентов.

### Синтаксис

```jsx
// Создание контекста
const MyContext = React.createContext(defaultValue);

// Использование контекста
const value = useContext(MyContext);
```

### Для чего он нужен?

1. Передача данных глубоко в дерево компонентов без явной передачи через пропсы
2. Глобальное состояние приложения (тема, аутентификация, настройки)
3. Альтернатива "prop drilling" (передачи пропсов через множество уровней)

### Пример использования: Тема оформления

```jsx
// Создание контекста
const ThemeContext = React.createContext('light');

// Компонент-провайдер
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Значение, которое будет доступно потребителям
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Компонент верхнего уровня
function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

// Глубоко вложенный компонент
function ThemedButton() {
  // Получение значения из контекста
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: '1px solid',
        padding: '8px 16px',
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

// Компонент среднего уровня
function MainContent() {
  return (
    <div>
      <h1>My App</h1>
      <ThemedButton />
    </div>
  );
}
```

### Лучшие практики

- ✅ Используйте для данных, которые требуются многим компонентам на разных уровнях
- ✅ Разделяйте контексты по логическому назначению
- ✅ Избегайте чрезмерного использования контекста для передачи данных, когда пропсы будут проще
- ✅ Оптимизируйте рендеринг компонентов, использующих контекст

---

## useReducer: Сложное состояние

### Что такое useReducer?

`useReducer` — это хук для управления сложным состоянием с помощью паттерна reducer, сходного с Redux.

### Синтаксис

```jsx
const [state, dispatch] = useReducer(reducer, initialState, init);

// где reducer — функция вида:
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_1':
      return { ...state, /* изменения */ };
    case 'ACTION_2':
      return { ...state, /* изменения */ };
    default:
      return state;
  }
}
```

### Для чего он нужен?

1. Управление сложным состоянием с множеством подзначений
2. Когда следующее состояние зависит от предыдущего
3. Когда логика обновления состояния сложная или повторяется в разных местах

### Пример: Управление формой

```jsx
// Начальное состояние
const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  isSubmitting: false,
  isValid: false
};

// Reducer функция
function formReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '' // Сбрасываем ошибку поля при изменении
        }
      };
    case 'VALIDATE':
      const errors = { ...state.errors };
      let isValid = true;
      
      // Email validation
      if (!state.email.includes('@')) {
        errors.email = 'Некорректный email';
        isValid = false;
      }
      
      // Password validation
      if (state.password.length < 8) {
        errors.password = 'Пароль должен быть не менее 8 символов';
        isValid = false;
      }
      
      // Confirm password
      if (state.password !== state.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
        isValid = false;
      }
      
      return { ...state, errors, isValid };
    
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    
    case 'SUBMIT_SUCCESS':
      return { ...initialState };
    
    case 'SUBMIT_FAILURE':
      return { ...state, isSubmitting: false };
    
    default:
      return state;
  }
}

// Компонент формы регистрации
function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleChange = e => {
    dispatch({
      type: 'FIELD_CHANGE',
      field: e.target.name,
      value: e.target.value
    });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    
    // Валидация формы
    dispatch({ type: 'VALIDATE' });
    
    if (!state.isValid) return;
    
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      // Отправка данных на сервер
      await registerUser({
        username: state.username,
        email: state.email,
        password: state.password
      });
      
      dispatch({ type: 'SUBMIT_SUCCESS' });
      alert('Регистрация успешна!');
    } catch (error) {
      dispatch({ type: 'SUBMIT_FAILURE' });
      alert(`Ошибка: ${error.message}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя пользователя:</label>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        {state.errors.username && <p>{state.errors.username}</p>}
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {state.errors.email && <p>{state.errors.email}</p>}
      </div>
      
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        {state.errors.password && <p>{state.errors.password}</p>}
      </div>
      
      <div>
        <label>Подтверждение пароля:</label>
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />
        {state.errors.confirmPassword && <p>{state.errors.confirmPassword}</p>}
      </div>
      
      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
```

### useReducer vs useState

|Аспект|useState|useReducer|
|---|---|---|
|Сложность|Простое состояние|Сложное состояние|
|Структура|Отдельные переменные|Объединено в одном объекте|
|Обновление|Прямое|Через dispatch и reducer|
|Логика|Компонент|Выносится в reducer|
|Использование|Простые случаи|Сложная логика состояния|

### Лучшие практики

- ✅ Используйте для сложных структур данных с взаимосвязанными полями
- ✅ Разделяйте логику reducer функций на модули
- ✅ Комбинируйте с Context для глобального управления состоянием
- ✅ Следуйте принципам иммутабельности при обновлении состояния

---

## React.memo: Предотвращение рендеров

### Что такое React.memo?

`React.memo` — это компонент высшего порядка (HOC), который мемоизирует результат рендеринга компонента, предотвращая ненужные перерисовки.

### Синтаксис

```jsx
const MemoizedComponent = React.memo(Component, arePropsEqual);

// arePropsEqual (опционально) - функция для сравнения пропсов
function arePropsEqual(prevProps, nextProps) {
  // Возвращает true, если nextProps рендерят
  // тот же результат, что и prevProps
  return prevProps.id === nextProps.id;
}
```

### Для чего он нужен?

1. Оптимизация производительности путем предотвращения ненужных рендеров
2. Предотвращение перерисовки дочерних компонентов при обновлении родителя

### Пример использования

```jsx
// Обычный компонент без мемоизации
function RegularItem({ name, price, onAddToCart }) {
  console.log(`RegularItem ${name} rendered`);
  
  return (
    <div className="item">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => onAddToCart(name)}>
        Add to Cart
      </button>
    </div>
  );
}

// Мемоизированный компонент
const MemoizedItem = React.memo(RegularItem);

// Родительский компонент
function ProductList() {
  const [items] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);
  
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  // Без useCallback эта функция будет пересоздаваться при каждом рендере
  const handleAddToCart = useCallback((name) => {
    setCart(prevCart => [...prevCart, name]);
  }, []);
  
  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search..."
      />
      
      <div>
        <h2>Cart: {cart.join(', ')}</h2>
      </div>
      
      {items.map(item => (
        // При изменении searchText, MemoizedItem не перерисовывается
        // А RegularItem перерисовывается
        <div key={item.id} style={{ display: 'flex' }}>
          <RegularItem 
            name={item.name}
            price={item.price}
            onAddToCart={handleAddToCart}
          />
          <MemoizedItem 
            name={item.name}
            price={item.price}
            onAddToCart={handleAddToCart}
          />
        </div>
      ))}
    </div>
  );
}
```

### Лучшие практики

- ✅ Используйте для компонентов, которые часто рендерятся с одними и теми же пропсами
- ✅ Используйте для "дорогих" компонентов с большим количеством вложенных элементов
- ✅ Комбинируйте с `useCallback` для функций и `useMemo` для объектов, передаваемых в пропсах
- ✅ Не используйте для всех компонентов подряд — лишняя оптимизация может снизить производительность
- ✅ Помните, что `React.memo` выполняет поверхностное сравнение пропсов — для сложных объектов используйте собственную функцию сравнения

---

## Пользовательские хуки

### Что такое пользовательские хуки?

Пользовательские хуки — это функции, начинающиеся с `use`, которые могут использовать встроенные хуки и инкапсулировать логику для повторного использования между компонентами.

### Преимущества

1. Повторное использование логики состояния и эффектов между компонентами
2. Инкапсуляция сложной логики в понятные единицы
3. Упрощение тестирования логики компонентов
4. Улучшение организации и читаемости кода

### Примеры пользовательских хуков

#### 1. useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  // Состояние для хранения нашего значения
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Получаем из localStorage по ключу
      const item = window.localStorage.getItem(key);
      // Парсим хранимое значение или возвращаем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Если ошибка, возвращаем initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Возвращаем обертку над useState's setState
  // для сохранения нового значения в localStorage
  const setValue = value => {
    try {
      // Разрешаем значение быть функцией как в useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Сохраняем в state
      setStoredValue(valueToStore);
      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Пример использования
function App() {
  const [name, setName] = useLocalStorage('name', 'John');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Введите имя"
      />
    </div>
  );
}
```

#### 2. useFetch

```jsx
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          signal,
          ...options
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Функция очистки
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  return { data, error, loading };
}

// Пример использования
function UserList() {
  const { data, error, loading } = useFetch('https://api.example.com/users');

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!data) return <div>Нет данных</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### 3. useMediaQuery

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Устанавливаем начальное значение
    setMatches(mediaQuery.matches);
    
    // Создаем обработчик для изменений
    const handler = event => setMatches(event.matches);
    
    // Добавляем слушатель
    mediaQuery.addEventListener('change', handler);
    
    // Удаляем слушатель при очистке
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Пример использования
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      <h1>Текущий размер экрана:</h1>
      {isMobile && <p>Мобильное устройство</p>}
      {isTablet && <p>Планшет</p>}
      {isDesktop && <p>Десктоп</p>}
    </div>
  );
}
```

### Лучшие практики

- ✅ Всегда начинайте название пользовательского хука с `use` (это соглашение React)
- ✅ Создавайте атомарные хуки, каждый из которых решает одну проблему
- ✅ Используйте хуки для выделения повторяющейся логики
- ✅ Пишите тесты для пользовательских хуков
- ✅ Группируйте связанные хуки в модули и библиотеки

---

## Лучшие практики

### Общие рекомендации

#### 1. Правила использования хуков

- ✅ Вызывайте хуки только на верхнем уровне компонента
- ✅ Никогда не вызывайте хуки внутри условий, циклов или вложенных функций
- ✅ Вызывайте хуки только из функциональных компонентов React или из других хуков
- ✅ Используйте ESLint плагин `eslint-plugin-react-hooks` для контроля соблюдения правил

#### 2. Управление зависимостями

- ✅ Всегда указывайте все необходимые зависимости в массивах зависимостей хуков
- ✅ Используйте ESLint для автоматической проверки зависимостей
- ✅ Используйте `useCallback` и `useMemo` для стабилизации зависимостей
- ✅ Не игнорируйте предупреждения ESLint о пропущенных зависимостях

#### 3. Организация кода

- ✅ Группируйте связанные хуки вместе в пользовательские хуки
- ✅ Разделяйте сложную логику на более мелкие хуки
- ✅ Отделяйте UI от логики, используя хуки для инкапсуляции бизнес-логики
- ✅ Создавайте библиотеки часто используемых хуков

#### 4. Управление состоянием

- ✅ Используйте `useState` для простого состояния и `useReducer` для сложного
- ✅ Разделяйте независимые кусочки состояния
- ✅ Объединяйте связанное состояние в объекты
- ✅ Используйте контекст для глобального состояния, но не злоупотребляйте им

#### 5. Оптимизация производительности

- ✅ Используйте `React.memo` для предотвращения ненужных рендеров компонентов
- ✅ Используйте `useCallback` для мемоизации функций, передаваемых дочерним компонентам
- ✅ Используйте `useMemo` для дорогостоящих вычислений
- ✅ Оптимизируйте рендеринг больших списков с помощью виртуализации
- ✅ Не оптимизируйте преждевременно — измеряйте сначала, оптимизируйте потом

#### 6. Управление эффектами

- ✅ Разделяйте эффекты по их назначению вместо объединения в один
- ✅ Всегда очищайте ресурсы в функции очистки (таймеры, подписки, соединения)
- ✅ Используйте зависимости эффектов для контроля, когда эффект должен запускаться
- ✅ Не блокируйте рендеринг тяжелыми вычислениями в эффектах

### Проверочный список для компонентов

✅ Правильно ли указаны зависимости в хуках?  
✅ Правильно ли очищаются ресурсы в `useEffect`?  
✅ Не вызываются ли хуки условно или в циклах?  
✅ Используете ли вы мемоизацию для предотвращения ненужных вычислений?  
✅ Разделено ли состояние на логические части?  
✅ Выделена ли повторяющаяся логика в пользовательские хуки?

---

## Типичные ошибки и их решения

### 1. Неверное указание зависимостей в хуках

#### Проблема

```jsx
function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  
  // Проблема: отсутствует зависимость query
  useEffect(() => {
    fetchResults(query).then(data => setResults(data));
  }, []); // ❌ Отсутствует зависимость query
  
  return <ResultsList results={results} />;
}
```

#### Решение

```jsx
function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  
  // Решение: добавлена зависимость query
  useEffect(() => {
    fetchResults(query).then(data => setResults(data));
  }, [query]); // ✅ query добавлен как зависимость
  
  return <ResultsList results={results} />;
}
```

### 2. Условный вызов хуков

#### Проблема

```jsx
function UserProfile({ isLoggedIn, userId }) {
  const [user, setUser] = useState(null);
  
  // Проблема: условное использование хука
  if (isLoggedIn) {
    // ❌ Хук внутри условия
    useEffect(() => {
      fetchUser(userId).then(data => setUser(data));
    }, [userId]);
  }
  
  return isLoggedIn ? <ProfileView user={user} /> : <LoginPrompt />;
}
```

#### Решение

```jsx
function UserProfile({ isLoggedIn, userId }) {
  const [user, setUser] = useState(null);
  
  // Решение: хук на верхнем уровне с условием внутри
  useEffect(() => {
    // ✅ Условие внутри хука, а не снаружи
    if (isLoggedIn) {
      fetchUser(userId).then(data => setUser(data));
    }
  }, [isLoggedIn, userId]);
  
  return isLoggedIn ? <ProfileView user={user} /> : <LoginPrompt />;
}
```

### 3. Неоптимальное использование useState

#### Проблема

```jsx
function FormComponent() {
  // Проблема: слишком много отдельных состояний
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  // ... и т.д.
  
  // Слишком много обработчиков
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  // ... и т.д.
  
  return (
    <form>
      <input value={firstName} onChange={handleFirstNameChange} />
      {/* ... и т.д. */}
    </form>
  );
}
```

#### Решение 1: Объединение связанного состояния с useState

```jsx
function FormComponent() {
  // Решение 1: объединение связанных состояний
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  // Один обработчик для всех полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  return (
    <form>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      {/* ... и т.д. */}
    </form>
  );
}
```

#### Решение 2: Использование useReducer для более сложной логики

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'RESET_FORM':
      return initialFormState;
    // Другие действия...
    default:
      return state;
  }
}

function FormComponent() {
  // Решение 2: useReducer для более сложной логики формы
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  const handleChange = (e) => {
    dispatch({
      type: 'FIELD_CHANGE',
      field: e.target.name,
      value: e.target.value
    });
  };
  
  return (
    <form>
      <input
        name="firstName"
        value={formState.firstName}
        onChange={handleChange}
      />
      {/* ... и т.д. */}
    </form>
  );
}
```

### 4. Нестабильные ссылки на функции

#### Проблема

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Проблема: функция пересоздается при каждом рендере
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* При каждом изменении count, ChildComponent перерендеривается */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

#### Решение

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Решение: стабильная ссылка на функцию с помощью useCallback
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Пустой массив = функция стабильна между рендерами
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* ChildComponent рендерится только один раз */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

---

## Заключение

### Ключевые моменты

- Хуки значительно упрощают работу с React и делают код более понятным и переиспользуемым
- Каждый хук имеет свое назначение и оптимальные сценарии использования
- Соблюдение правил и лучших практик критически важно для стабильной работы приложения
- Пользовательские хуки — мощный инструмент для повторного использования логики
- Оптимизация с помощью `useCallback`, `useMemo` и `React.memo` должна применяться обдуманно

### Дальнейшее изучение

- Продвинутые пользовательские хуки
- Библиотеки хуков: react-use, react-hook-form, SWR, React Query
- TypeScript с хуками
- Тестирование хуков
- Хуки в React Native

### Полезные ресурсы

- [Официальная документация React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/)
- [Руководство по пользовательским хукам](https://usehooks.com/)
- [Правила хуков](https://reactjs.org/docs/hooks-rules.html)
- [Рецепты хуков](https://reactjs.org/docs/hooks-recipes.html)

---

_© 2025 React Hooks Guide_

---

### Zero-links

[[00_react-lessons]]
---

### Links

-
