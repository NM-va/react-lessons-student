import React, { useState } from 'react';

type TodoList = {
    id: string;
    text: string;
    completed: boolean;
};

// TODO: Реализуйте компонент TodoList с оптимизированной обработкой событий
export function TodoList() {
    const [todos, setTodos] = useState<TodoList[]>([
                                                       { id: '1', text: 'Изучить продвинутые хуки', completed: false },
                                                       { id: '2', text: 'Освоить делегирование событий', completed: false },
                                                       { id: '3', text: 'Практиковать оптимизацию производительности', completed: false }
                                                   ]);
    
    // TODO: Реализуйте обработчики с учетом делегирования событий
    // - Делегируйте обработку кликов на уровень списка (ul)
    // - Используйте атрибуты data-* для определения действия
    // - Примените useCallback для оптимизации
    
    const [completedTask, setCompletedTask] = useState<Record<string, boolean>>({ first: false ,  second: false , third: false});
    let styleCompleted = { textDecoration: "underline"};
    
    const handleClick = (e) => {
        let currentElement = e.target;
        const item = currentElement.closest('[data-id]');
        
        if(!item) return;
        
        const id = item.dataset.id;
        
        console.log(currentElement);
        const actionElement = currentElement.closest('[data-action]');
        
        if(!actionElement) return;
        
        const action = actionElement.dataset.action;
        
        switch (action) {
            case 'toggle':
                setTodos((todos) => {
                    return todos.map((todo) => {
                        return id === todo.id ? {...todo, completed: !todo.completed} : todo;
                    })
                })
                break;
            case 'close':
                setTodos((todos) => {
                    return todos.filter((todo) => {
                        return id !== todo.id
                    })
                })
                break;
            
            default:
                break;
        }
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const addItem = (e) => {
        setTodos((prev) => [...prev, { id: `${Math.random()}`, text: e.target.value || '', completed: false }]);
    }
    
    const deleteItem = (id: number) => {
        let currentElement = e.target;
        
        
        let updatedList = todos.filter((item) => {
            return item.id !== currentElement.id;
        });
        console.log('updatedList', updatedList);
        // setTodos(updatedList);
    };
    
    
    return (
        <div className="todo-app">
            <h3>Список задач</h3>
            
            <ul className="todo-list" data-id="todoList" onClick={handleClick}>
                {/* TODO: Рендер списка задач с делегированием событий */
                    todos?.map((item) => {
                        return (
                            <li
                                className="todo-item"
                                key={item.id}
                                data-id={item.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.8rem',
                                    borderBottom: '1px solid var(--border-color)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        id={`todoItem-${item.id}`}
                                        type="checkbox"
                                        style={{...styleCompleted, marginRight: '10px'}}
                                        data-action={'toggle'}
                                        checked={item.completed}
                                    />
                                    <label data-action={'toggle'} htmlFor={`todoItem-${item.id}`}>{item.text}</label>
                                </div>
                                <button
                                    data-action='close'
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#999',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => deleteItem(item.id)}
                                >✕
                                </button>
                            </li>
                        )
                    })
                }
            
            </ul>
            
            <div className="todo-form" style={{
                padding: '20px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
            }}>
                {/* TODO: Форма для добавления новых задач */
                    <form style={{color: 'var(--book-text-color)'}} onSubmit={handleSubmit}>
                        <label>Введите название задачи:</label>
                        <input type='text' style={{display: 'block'}}
                               onChange={addItem}
                        />
                        <button style={{
                            background: 'var(--page-bg-color)',
                            color: '#999',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)',
                            marginTop: '20px'
                        }}
                                type="submit"
                        >
                            Добавить
                        </button>
                    </form>
                }
            </div>
            
            {/* TODO: Добавьте контекстное меню, появляющееся по правому клику */}
        </div>
    );
}