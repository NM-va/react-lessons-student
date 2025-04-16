# Домашнее задание: Углубленное изучение хуков в React

## Задание 1: Создание пользовательского хука useLocalStorage

### Цель

Создать пользовательский хук `useLocalStorage`, который будет работать аналогично `useState`, но также синхронизировать данные с localStorage браузера.

### Требования

1. Хук должен иметь тот же API, что и `useState`
2. При инициализации должен проверять localStorage на наличие значения
3. При обновлении значения должен сохранять его в localStorage
4. Должен корректно обрабатывать JSON-сериализуемые значения
5. Должен обрабатывать ошибки при работе с localStorage
6. Добавьте функциональность синхронизации между вкладками

### Пример использования

```jsx
function App() {
  const [name, setName] = useLocalStorage('name', 'Гость');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <h1>Привет, {name}!</h1>
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setDarkMode(!darkMode)}>
        Переключить тему
      </button>
    </div>
  );
}
```

## Задание 2: Оптимизация компонента с помощью хуков

### Цель

Оптимизировать производительность компонента списка задач с использованием соответствующих хуков React.

### Исходный код (требующий оптимизации)

```jsx
function TaskList({ tasks, onTaskToggle, onTaskDelete }) {
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  
  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.completed === b.completed) {
      return a.title.localeCompare(b.title);
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      <div className="stats">
        <p>Всего задач: {tasks.length}</p>
        <p>Выполнено: {completedCount}</p>
        <p>Осталось: {pendingCount}</p>
      </div>
      
      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onTaskToggle(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => onTaskDelete(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Требования

1. Оптимизируйте вычисление `completedCount` и `pendingCount` с помощью `useMemo`
2. Оптимизируйте сортировку списка задач с помощью `useMemo`
3. Используйте `React.memo` для оптимизации дочерних компонентов
4. Используйте `useCallback` для обработчиков событий
5. Выделите отдельный компонент для отображения отдельной задачи
6. Прокомментируйте код, объясняя какие оптимизации вы внесли и почему

## Задание 3: Реализация эффективного поиска с debounce

### Цель

Создать компонент поиска с использованием пользовательского хука useDebounce для отложенного выполнения запросов.

### Требования

1. Создайте пользовательский хук `useDebounce`, который будет откладывать обновление значения на указанное время
2. Реализуйте компонент SearchBar, который использует этот хук
3. Компонент должен вызывать функцию поиска только после того, как пользователь перестал печатать (через указанный интервал)
4. Реализуйте индикатор загрузки, который показывается во время ожидания результатов
5. Обработайте возможные ошибки при выполнении запроса

### Пример использования

```jsx
function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация API запроса
      const results = await fetchSearchResults(query);
      setSearchResults(results);
    } catch (err) {
      setError('Произошла ошибка при поиске');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Поиск</h1>
      <SearchBar onSearch={handleSearch} debounceTime={500} />
      
      {isLoading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      
      <ul className="search-results">
        {searchResults.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Задание 4: Интеграция useThemeColor в проект Todo List

### Цель

Интегрировать пользовательский хук `useThemeColor` из лекции в проект списка задач, добавив поддержку темной и светлой темы.

### Требования

1. Создайте все необходимые компоненты для поддержки темы (ThemeProvider, ThemeContext, useThemeColor)
2. Реализуйте переключатель темы в интерфейсе
3. Стилизуйте компоненты так, чтобы они корректно отображались в обеих темах
4. Добавьте анимацию при переключении темы
5. Сохраняйте выбранную тему в localStorage
6. Используйте системную тему по умолчанию (media query prefers-color-scheme)

### Бонусные задания

1. Добавьте возможность настройки пользовательской темы
2. Реализуйте автоматическое переключение тем в зависимости от времени суток
3. Добавьте поддержку нескольких предустановленных тем (светлая, темная, синяя, зеленая и т.д.)

## Дополнительные материалы и подсказки

1. **Для задания 1**:
   - Прочитайте о событии `storage` в браузере для синхронизации между вкладками
   - Используйте `JSON.stringify` и `JSON.parse` для сериализации/десериализации данных
   - Не забудьте обернуть работу с localStorage в блок try-catch

2. **Для задания 2**:
   - Используйте React DevTools для проверки, какие компоненты перерендериваются и почему
   - Помните, что useMemo и useCallback сами имеют некоторые накладные расходы
   - Оптимизируйте только те части, которые действительно в этом нуждаются

3. **Для задания 3**:
   - Изучите концепцию debounce в JavaScript (lodash.debounce - хороший пример)
   - Используйте useEffect с очисткой для реализации debounce без внешних библиотек
   - Для тестирования можно использовать открытые API, такие как JSONPlaceholder

4. **Для задания 4**:
   - Используйте CSS переменные для удобного управления цветами
   - Изучите медиа-запрос `prefers-color-scheme` для определения системных настроек
   - Организуйте цветовые темы как наборы переменных, которые можно легко заменять
   - Эта задача объединяет концепции всех предыдущих заданий

## Критерии оценки

- **Функциональность**: Все требования выполнены, код работает без ошибок
- **Оптимизация**: Компоненты оптимизированы, нет лишних перерендеров
- **Чистота кода**: Код хорошо организован, следует принципам DRY, имеет понятную структуру
- **Типизация**: Используется TypeScript с корректными типами (бонусные баллы)
- **Тестируемость**: Компоненты легко тестировать, логика выделена в отдельные функции
- **Расширяемость**: Код легко расширять и изменять

## Сроки сдачи

- Базовое задание (1, 2 и одно из 3 или 4): до следующего занятия
- Все задания с бонусами: до [указать расширенный срок]

Удачи! При возникновении вопросов обращайтесь за помощью.
