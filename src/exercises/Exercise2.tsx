import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TestLocalStorage } from '../utils/testLocalStorage';
import { SearchBar, searchBar } from '../components/SearchBar';
import { TaskList } from '../components/TaskList';
import { SearchPage } from '../pages/SearchPage';

const Homework: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="exercise-container">
            <h1>Домашнее задание: Углубленное изучение хуков в React</h1>

            <div className="exercise-tabs">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Обзор
                    </div>
                    <div
                        className={`tab ${activeTab === 'task1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('task1')}
                    >
                        Задание 1: useLocalStorage
                    </div>
                    <div
                        className={`tab ${activeTab === 'task2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('task2')}
                    >
                        Задание 2: Оптимизация
                    </div>
                    <div
                        className={`tab ${activeTab === 'task3' ? 'active' : ''}`}
                        onClick={() => setActiveTab('task3')}
                    >
                        Задание 3: useDebounce
                    </div>
                    <div
                        className={`tab ${activeTab === 'task4' ? 'active' : ''}`}
                        onClick={() => setActiveTab('task4')}
                    >
                        Задание 4: useThemeColor
                    </div>
                    <div
                        className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        Ресурсы
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-content">
                            <h2>Обзор домашнего задания</h2>
                            <p>
                                В этом домашнем задании вы будете практиковать создание и использование пользовательских хуков,
                                а также применять различные техники оптимизации работы с React.
                            </p>

                            <h3>Состав домашнего задания:</h3>
                            <ol>
                                <li><strong>Создание пользовательского хука useLocalStorage</strong> - для сохранения состояния в localStorage</li>
                                <li><strong>Оптимизация компонента списка задач</strong> - с использованием useMemo, useCallback и React.memo</li>
                                <li><strong>Реализация отложенного поиска с debounce</strong> - создание пользовательского хука useDebounce</li>
                                <li><strong>Интеграция useThemeColor в проект</strong> - добавление поддержки тем в приложение</li>
                            </ol>

                            <div className="tip-box">
                                <p><strong>Важно:</strong> Перед началом работы убедитесь, что у вас настроено рабочее окружение с React и TypeScript.
                                    Рекомендуется использовать менеджер пакетов npm или yarn для установки зависимостей.</p>
                            </div>

                            <h3>Критерии оценки:</h3>
                            <ul>
                                <li><strong>Функциональность:</strong> Все требования выполнены, код работает без ошибок</li>
                                <li><strong>Оптимизация:</strong> Компоненты оптимизированы, нет лишних перерендеров</li>
                                <li><strong>Чистота кода:</strong> Код хорошо организован, следует принципам DRY, имеет понятную структуру</li>
                                <li><strong>Типизация:</strong> Используется TypeScript с корректными типами (бонусные баллы)</li>
                                <li><strong>Тестируемость:</strong> Компоненты легко тестировать, логика выделена в отдельные функции</li>
                                <li><strong>Расширяемость:</strong> Код легко расширять и изменять</li>
                            </ul>

                            <h3>Сроки сдачи:</h3>
                            <ul>
                                <li>Базовое задание (1, 2 и одно из 3 или 4): до следующего занятия</li>
                                <li>Все задания с бонусами: до конца недели</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'task1' && (
                        <div className="task1-content">
                            <h2>Задание 1: Создание пользовательского хука useLocalStorage</h2>

                            <h3>Цель</h3>
                            <p>
                                Создать пользовательский хук <code>useLocalStorage</code>, который будет работать аналогично <code>useState</code>,
                                но также синхронизировать данные с localStorage браузера.
                            </p>

                            <h3>Требования</h3>
                            <ol>
                                <li>Хук должен иметь тот же API, что и <code>useState</code></li>
                                <li>При инициализации должен проверять localStorage на наличие значения</li>
                                <li>При обновлении значения должен сохранять его в localStorage</li>
                                <li>Должен корректно обрабатывать JSON-сериализуемые значения</li>
                                <li>Должен обрабатывать ошибки при работе с localStorage</li>
                                <li>Добавьте функциональность синхронизации между вкладками</li>
                            </ol>

                            <div className="code-editor">
                                <div className="code-block-title">Пример использования useLocalStorage</div>
                                <pre>
                                    {`function App() {
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
}`}
                                </pre>
                            </div>

                            <h3>Реализация</h3>
                            <p>Напишите код вашего пользовательского хука useLocalStorage:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Реализация хука useLocalStorage</div>
                                <pre>
                                    {`// TODO: Реализуйте хук useLocalStorage
function useLocalStorage(key, initialValue) {
  // Ваш код здесь
  
  // Подсказки:
  // 1. Используйте useState для хранения текущего значения
  // 2. При инициализации проверяйте localStorage на наличие значения по ключу
  // 3. Используйте JSON.stringify/JSON.parse для сериализации/десериализации
  // 4. Не забудьте обернуть работу с localStorage в try-catch
  // 5. Для синхронизации между вкладками можно использовать событие 'storage'
}`}
                                </pre>
                            </div>

                            <div className="tip-box">
                                <p><strong>Подсказка:</strong> Для синхронизации между вкладками используйте событие <code>storage</code>,
                                    которое срабатывает в других вкладках, когда одна из них изменяет localStorage.</p>
                                <pre>
                                    {`// Пример обработки события storage
useEffect(() => {
  const handleStorageChange = (event) => {
    if (event.key === key) {
      // Обновление состояния
    }
  };
  
  window.addEventListener('storage', handleStorageChange);
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, [key]);`}
                                </pre>
                                <TestLocalStorage/>
                            </div>
                        </div>
                    )}

                    {activeTab === 'task2' && (
                        <div className="task2-content">
                            <h2>Задание 2: Оптимизация компонента с помощью хуков</h2>

                            <h3>Цель</h3>
                            <p>
                                Оптимизировать производительность компонента списка задач с использованием соответствующих хуков React.
                            </p>

                            <h3>Исходный код (требующий оптимизации)</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Исходный код TaskList</div>
                                <pre>
                                    {`function TaskList({ tasks, onTaskToggle, onTaskDelete }) {
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
}`}
                                    
                                    {/*<TaskList/>*/}
                                </pre>
                            </div>

                            <h3>Требования</h3>
                            <ol>
                                <li>Оптимизируйте вычисление <code>completedCount</code> и <code>pendingCount</code> с помощью <code>useMemo</code></li>
                                <li>Оптимизируйте сортировку списка задач с помощью <code>useMemo</code></li>
                                <li>Используйте <code>React.memo</code> для оптимизации дочерних компонентов</li>
                                <li>Используйте <code>useCallback</code> для обработчиков событий</li>
                                <li>Выделите отдельный компонент для отображения отдельной задачи</li>
                                <li>Прокомментируйте код, объясняя какие оптимизации вы внесли и почему</li>
                            </ol>

                            <div className="tip-box">
                                <p><strong>Важно:</strong> Перед оптимизацией убедитесь, что компонент действительно нуждается в оптимизации.
                                    Преждевременная оптимизация может усложнить код без значимого выигрыша в производительности.</p>
                            </div>

                            <h3>Пример оптимизации</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Пример оптимизации с useMemo</div>
                                <pre>
                                    {`// Оптимизация дорогостоящих вычислений
const completedCount = useMemo(() => {
  console.log('Вычисление completedCount');
  return tasks.filter(task => task.completed).length;
}, [tasks]);

const pendingCount = useMemo(() => {
  return tasks.length - completedCount;
}, [tasks.length, completedCount]);`}
                                </pre>
                            </div>

                            <div className="code-editor">
                                <div className="code-block-title">Пример выделения дочернего компонента</div>
                                <pre>
                                    {`// Дочерний компонент для отдельной задачи
const TaskItem = React.memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  );
});`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeTab === 'task3' && (
                        <div className="task3-content">
                            <h2>Задание 3: Реализация эффективного поиска с debounce</h2>

                            <h3>Цель</h3>
                            <p>
                                Создать компонент поиска с использованием пользовательского хука useDebounce для отложенного выполнения запросов.
                            </p>

                            <h3>Требования</h3>
                            <ol>
                                <li>Создайте пользовательский хук <code>useDebounce</code>, который будет откладывать обновление значения на указанное время</li>
                                <li>Реализуйте компонент SearchBar, который использует этот хук</li>
                                <li>Компонент должен вызывать функцию поиска только после того, как пользователь перестал печатать (через указанный интервал)</li>
                                <li>Реализуйте индикатор загрузки, который показывается во время ожидания результатов</li>
                                <li>Обработайте возможные ошибки при выполнении запроса</li>
                            </ol>

                            <div className="code-editor">
                                <div className="code-block-title">Пример использования</div>
                                <pre>
                                    {`function SearchPage() {
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
}`}
                                </pre>
                            </div>

                            <h3>Реализация</h3>
                            <p>Создайте хук useDebounce:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Реализация хука useDebounce</div>
                                <pre>
                                    {`// TODO: Реализуйте хук useDebounce
function useDebounce(value, delay) {
  // Ваш код здесь
  
  // Подсказки:
  // 1. Используйте useState для хранения отложенного значения
  // 2. Используйте useEffect с таймером для обновления значения после задержки
  // 3. Не забудьте очистить таймер при изменении исходного значения или размонтировании
}`}
                                </pre>
                            </div>

                            <p>Теперь реализуйте компонент SearchBar:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Реализация компонента SearchBar</div>
                                <pre>
                                    {`// TODO: Реализуйте компонент SearchBar
function SearchBar({ onSearch, debounceTime = 500 }) {
  // Ваш код здесь
  
  // Подсказки:
  // 1. Используйте useState для отслеживания ввода пользователя
  // 2. Примените useDebounce для отложенного обновления значения поиска
  // 3. Используйте useEffect для вызова onSearch при изменении отложенного значения
}`}
                                    <SearchPage />
                                </pre>
                            </div>

                            <div className="tip-box">
                                <p><strong>Концепция debounce:</strong> Debounce - это техника программирования,
                                    при которой функция не будет вызвана, пока не пройдет определенное время
                                    с момента последнего вызова. Это полезно для предотвращения лишних запросов
                                    к API при быстром вводе пользователем.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'task4' && (
                        <div className="task4-content">
                            <h2>Задание 4: Интеграция useThemeColor в проект Todo List</h2>

                            <h3>Цель</h3>
                            <p>
                                Интегрировать пользовательский хук <code>useThemeColor</code> из лекции в проект списка задач,
                                добавив поддержку темной и светлой темы.
                            </p>

                            <h3>Требования</h3>
                            <ol>
                                <li>Создайте все необходимые компоненты для поддержки темы (ThemeProvider, ThemeContext, useThemeColor)</li>
                                <li>Реализуйте переключатель темы в интерфейсе</li>
                                <li>Стилизуйте компоненты так, чтобы они корректно отображались в обеих темах</li>
                                <li>Добавьте анимацию при переключении темы</li>
                                <li>Сохраняйте выбранную тему в localStorage</li>
                                <li>Используйте системную тему по умолчанию (media query prefers-color-scheme)</li>
                            </ol>

                            <h3>Бонусные задания</h3>
                            <ol>
                                <li>Добавьте возможность настройки пользовательской темы</li>
                                <li>Реализуйте автоматическое переключение тем в зависимости от времени суток</li>
                                <li>Добавьте поддержку нескольких предустановленных тем (светлая, темная, синяя, зеленая и т.д.)</li>
                            </ol>


                            <h3>Пример использования CSS переменных для темы</h3>
                            <div className="code-editor">
                                <div className="code-block-title">CSS-переменные для тем</div>
                                <pre>
                                    {`:root {
  /* Светлая тема (по умолчанию) */
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #4f46e5;
  --secondary-color: #e5e7eb;
  --accent-color: #f59e0b;
  --border-color: #e2e8f0;
}

.dark-theme {
  /* Темная тема */
  --bg-color: #1a202c;
  --text-color: #f7fafc;
  --primary-color: #818cf8;
  --secondary-color: #4b5563;
  --accent-color: #fbbf24;
  --border-color: #4a5568;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}`}
                                </pre>
                            </div>

                            <div className="tip-box">
                                <p><strong>Интеграция с localStorage:</strong> Вы можете объединить задание 1 (useLocalStorage)
                                    и задание 4, используя созданный хук для сохранения выбранной темы между сессиями.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="resources-content">
                            <h2>Полезные ресурсы</h2>

                            <div className="resource-section">
                                <h3>Для задания 1: useLocalStorage</h3>
                                <ul>
                                    <li>
                                        <a href="https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer">
                                            MDN: localStorage
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://developer.mozilla.org/ru/docs/Web/API/Window/storage_event" target="_blank" rel="noopener noreferrer">
                                            MDN: Событие storage
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/useState" target="_blank" rel="noopener noreferrer">
                                            React: Хук useState
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="resource-section">
                                <h3>Для задания 2: Оптимизация</h3>
                                <ul>
                                    <li>
                                        <a href="https://react.dev/reference/react/useMemo" target="_blank" rel="noopener noreferrer">
                                            React: Хук useMemo
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/useCallback" target="_blank" rel="noopener noreferrer">
                                            React: Хук useCallback
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/memo" target="_blank" rel="noopener noreferrer">
                                            React: функция memo
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/learn/render-and-commit" target="_blank" rel="noopener noreferrer">
                                            React: Процесс рендеринга
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="resource-section">
                                <h3>Для задания 3: useDebounce</h3>
                                <ul>
                                    <li>
                                        <a href="https://www.freecodecamp.org/news/javascript-debounce-example/" target="_blank" rel="noopener noreferrer">
                                            JavaScript Debounce: Объяснение и примеры
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/useEffect" target="_blank" rel="noopener noreferrer">
                                            React: Хук useEffect
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">
                                            JSONPlaceholder: Тестовый API для прототипирования
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="resource-section">
                                <h3>Для задания 4: useThemeColor</h3>
                                <ul>
                                    <li>
                                        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/Using_CSS_custom_properties" target="_blank" rel="noopener noreferrer">
                                            MDN: Использование CSS-переменных
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme" target="_blank" rel="noopener noreferrer">
                                            MDN: prefers-color-scheme
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/createContext" target="_blank" rel="noopener noreferrer">
                                            React: createContext
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/reference/react/useContext" target="_blank" rel="noopener noreferrer">
                                            React: useContext
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="tip-box">
                                <h3>Советы для успешного выполнения</h3>
                                <ul>
                                    <li><strong>Поэтапная разработка</strong> - разбивайте задачи на маленькие, управляемые шаги</li>
                                    <li><strong>Ведите документацию</strong> - комментируйте сложные части кода и объясняйте свои решения</li>
                                    <li><strong>Используйте Chrome DevTools и React DevTools</strong> - для отладки и оптимизации</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homework;