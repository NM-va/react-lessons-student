import React, { useState } from 'react'

// Упражнение 1: Продвинутые хуки и обработка событий
const Exercise1: React.FC = () => {
    const [activeTab, setActiveTab] = useState('task');

    return (
        <div className="exercise-container">
            <h1>Упражнение 1: Продвинутые хуки и обработка событий</h1>

            <div className="exercise-tabs">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'task' ? 'active' : ''}`}
                        onClick={() => setActiveTab('task')}
                    >
                        Задание
                    </div>
                    <div
                        className={`tab ${activeTab === 'practice1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('practice1')}
                    >
                        Практика 1: Перетаскивание
                    </div>
                    <div
                        className={`tab ${activeTab === 'practice2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('practice2')}
                    >
                        Практика 2: Система событий
                    </div>
                    <div
                        className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        Ресурсы
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'task' && (
                        <div className="task-content">
                            <h2>Задание</h2>
                            <p>
                                В этом упражнении вы будете работать с продвинутыми хуками и системой обработки событий в React.
                                Вы создадите пользовательский хук для перетаскивания элементов и реализуете оптимизированную
                                систему делегирования событий.
                            </p>

                            <h3>Часть 1: Создание пользовательского хука useDraggable</h3>
                            <p>
                                Реализуйте пользовательский хук useDraggable, который позволит сделать любой элемент перетаскиваемым.
                                Хук должен:
                            </p>
                            <ul>
                                <li>Отслеживать положение элемента (x, y)</li>
                                <li>Предоставлять обработчики для событий мыши (mousedown, mousemove, mouseup)</li>
                                <li>Применять оптимизации с помощью useCallback и useRef</li>
                                <li>Правильно очищать обработчики событий при размонтировании</li>
                            </ul>

                            <h3>Часть 2: Создание оптимизированной системы событий</h3>
                            <p>
                                Реализуйте компонент TodoList с эффективным делегированием событий. Компонент должен:
                            </p>
                            <ul>
                                <li>Рендерить список задач с возможностью отметки выполнения и удаления</li>
                                <li>Использовать делегирование событий вместо индивидуальных обработчиков</li>
                                <li>Оптимизировать ререндеры с помощью React.memo и useCallback</li>
                                <li>Реализовать всплывающее меню по правому клику с предотвращением стандартного контекстного меню</li>
                            </ul>

                            <div className="tip-box">
                                <p><strong>Совет:</strong> Начните с малого - сначала реализуйте базовую функциональность, затем добавляйте оптимизации и расширенные возможности.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'practice1' && (
                        <div className="practice1-content">
                            <h2>Практика 1: Создание хука useDraggable</h2>

                            <p>Реализуйте пользовательский хук useDraggable в выделенном месте ниже:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Реализация хука useDraggable</div>
                                <pre>
                                    {`// TODO: Реализуйте пользовательский хук useDraggable
// Хук должен возвращать:
// - position: { x: number, y: number } - текущее положение
// - ref: React.RefObject - ссылка на перетаскиваемый элемент
// - isDragging: boolean - индикатор активного перетаскивания
// - props: объект с необходимыми обработчиками событий

function useDraggable() {
  // Ваш код здесь
  
  // Подсказки:
  // 1. Используйте useState для отслеживания position и isDragging
  // 2. Используйте useRef для хранения ссылки на элемент
  // 3. Применяйте useCallback для обработчиков событий
  // 4. Не забудьте про useEffect для регистрации и очистки глобальных обработчиков
}`}
                                </pre>
                                <pre>
                                    {`
// Пример интерфейса хука или можно описать свой                                
interface Position {
    x: number;
    y: number;
}

interface DragStartPosition {
    x: number;
    y: number;
    elementX: number;
    elementY: number;
}

interface UseDraggableReturn {
    position: Position;
    ref: React.RefObject<HTMLElement | null>;
    isDragging: boolean;
    props: {
        onMouseDown: (e: React.MouseEvent) => void;
        style?: React.CSSProperties;
    };
}

// пример использования
const { position, ref, isDragging, props } = useDraggable({ x: 50, y: 50 });
                                    `}
                                </pre>
                            </div>

                            <p>Теперь используйте свой хук, чтобы сделать элемент перетаскиваемым:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Использование хука useDraggable</div>
                                <pre>
                                    {`function DraggableBox() {
  // TODO: Используйте хук useDraggable
  
  return (
    <div
      // TODO: Примените props из хука для перетаскивания
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'var(--accent-color)',
        position: 'absolute',
        // TODO: Используйте position из хука
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        userSelect: 'none'
      }}
    >
      Перетащи меня
    </div>
  );
}`}
                                </pre>
                            </div>

                            <div className="live-preview">
                                <h3>Предпросмотр</h3>
                                <p>Здесь будет отображена область, где можно протестировать ваш draggable-элемент.</p>
                                <div className="draggable-playground" style={{ height: '300px', border: '1px dashed var(--border-color)', position: 'relative' }}>
                                    <div
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundColor: 'var(--accent-color)',
                                            position: 'absolute',
                                            left: '50px',
                                            top: '50px',
                                            cursor: 'grab',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            userSelect: 'none'
                                        }}
                                    >
                                        Перетащи меня
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'practice2' && (
                        <div className="practice2-content">
                            <h2>Практика 2: Создание оптимизированной системы событий</h2>

                            <p>Реализуйте оптимизированный список задач с делегированием событий:</p>

                            <div className="code-editor">
                                <div className="code-block-title">Реализация TodoList с делегированием событий</div>
                                <pre>
                                    {`// Тип для задачи
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// TODO: Реализуйте компонент TodoList с оптимизированной обработкой событий
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Изучить продвинутые хуки', completed: false },
    { id: '2', text: 'Освоить делегирование событий', completed: false },
    { id: '3', text: 'Практиковать оптимизацию производительности', completed: false }
  ]);
  
  // TODO: Реализуйте обработчики с учетом делегирования событий
  // - Делегируйте обработку кликов на уровень списка (ul)
  // - Используйте атрибуты data-* для определения действия
  // - Примените useCallback для оптимизации
  
  return (
    <div className="todo-app">
      <h3>Список задач</h3>
      
      <ul className="todo-list">
        {/* TODO: Рендер списка задач с делегированием событий */}
      </ul>
      
      <div className="todo-form">
        {/* TODO: Форма для добавления новых задач */}
      </div>
      
      {/* TODO: Добавьте контекстное меню, появляющееся по правому клику */}
    </div>
  );
}`}
                                </pre>
                            </div>

                            <div className="tip-box">
                                <p><strong>Подсказки:</strong></p>
                                <ul>
                                    <li>Используйте e.target.closest('[data-id]') для поиска ближайшего элемента с идентификатором</li>
                                    <li>Примените атрибут data-action для определения типа действия (complete, delete)</li>
                                    <li>Предотвратите всплытие событий там, где это необходимо</li>
                                    <li>Для контекстного меню используйте событие onContextMenu и предотвратите стандартное поведение с помощью e.preventDefault()</li>
                                </ul>
                            </div>

                            <div className="live-preview">
                                <h3>Предпросмотр</h3>
                                <p>Здесь будет отображен ваш список задач для тестирования.</p>
                                <div className="todo-preview" style={{ padding: '1rem', backgroundColor: 'var(--page-bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <ul className="todo-list-preview" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li className="todo-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" id="todo-1" style={{ marginRight: '10px' }} />
                                                <label htmlFor="todo-1">Изучить продвинутые хуки</label>
                                            </div>
                                            <button style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                                        </li>
                                        <li className="todo-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" id="todo-2" style={{ marginRight: '10px' }} />
                                                <label htmlFor="todo-2">Освоить делегирование событий</label>
                                            </div>
                                            <button style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                                        </li>
                                        <li className="todo-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" id="todo-3" style={{ marginRight: '10px' }} />
                                                <label htmlFor="todo-3">Практиковать оптимизацию производительности</label>
                                            </div>
                                            <button style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="resources-content">
                            <h2>Полезные ресурсы</h2>

                            <div className="resource-section">
                                <h3>Документация и руководства</h3>
                                <ul>
                                    <li>
                                        <a href="https://react.dev/reference/react/hooks" target="_blank" rel="noopener noreferrer">
                                            Официальная документация по хукам React
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/learn/responding-to-events" target="_blank" rel="noopener noreferrer">
                                            Руководство по обработке событий в React
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://react.dev/learn/reusing-logic-with-custom-hooks" target="_blank" rel="noopener noreferrer">
                                            Повторное использование логики с пользовательскими хуками
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="resource-section">
                                <h3>Примеры кода для вдохновения</h3>

                                <h4>Базовая структура хука useDraggable</h4>
                                <div className="code-editor">
                                    <div className="code-block-title">Примерная структура useDraggable</div>
                                    <pre>
                                        {`function useDraggable() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef(null);
  
  // Начальные координаты перетаскивания
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  const handleMouseDown = useCallback((e) => {
    // Логика начала перетаскивания
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    // Логика перетаскивания
  }, []);
  
  const handleMouseUp = useCallback(() => {
    // Логика завершения перетаскивания
  }, []);
  
  useEffect(() => {
    // Регистрация и очистка глобальных обработчиков событий
    return () => {
      // Очистка
    };
  }, [handleMouseMove, handleMouseUp]);
  
  return {
    position,
    ref: elementRef,
    isDragging,
    props: {
      onMouseDown: handleMouseDown,
      style: {
        cursor: isDragging ? 'grabbing' : 'grab',
        // Другие стили
      }
    }
  };
}`}
                                    </pre>
                                </div>

                                <h4>Пример делегирования событий</h4>
                                <div className="code-editor">
                                    <div className="code-block-title">Пример обработчика с делегированием</div>
                                    <pre>
                                        {`function handleListClick(e) {
  // Находим ближайший элемент с data-id
  const item = e.target.closest('[data-id]');
  if (!item) return;
  
  const id = item.dataset.id;
  const action = e.target.dataset.action;
  
  if (action === 'delete') {
    // Удаление элемента
  } else if (action === 'complete') {
    // Отметка как выполненного
  }
}`}
                                    </pre>
                                </div>
                            </div>

                            <div className="tip-box">
                                <h3>Советы для успешного выполнения</h3>
                                <ul>
                                    <li><strong>Разделите задачу на части</strong> - начните с базовой функциональности, затем добавляйте детали</li>
                                    <li><strong>Используйте консоль</strong> для отладки событий и понимания их распространения</li>
                                    <li><strong>Применяйте DevTools</strong> для анализа ререндеров и оптимизации производительности</li>
                                    <li><strong>Сравнивайте разные подходы</strong> - попробуйте реализовать с делегированием и без, чтобы увидеть разницу</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exercise1;