import React, { useEffect, useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { UseThemeColor } from '../hooks/useThemeColor';

 type StyleType = {
     textDecoration: string
 }

type TodoList = {
    id: string;
    text: string;
    completed: boolean;
    style: StyleType;
};


interface ContextMenuI {
    visible: boolean;
    positionX: number;
    positionY: number;
}

// TODO: Реализуйте компонент TodoList с оптимизированной обработкой событий
export function TodoList() {
    const [todos, setTodos] = useState<TodoList[]>([
                                                       { id: '1', text: 'Изучить продвинутые хуки', completed: false, style: {textDecoration: 'none'} },
                                                       { id: '2', text: 'Освоить делегирование событий', completed: false, style: {textDecoration: 'none'} },
                                                       { id: '3', text: 'Практиковать оптимизацию производительности', completed: false, style: {textDecoration: 'none'} }
                                                   ]);
    
    // TODO: Реализуйте обработчики с учетом делегирования событий
    // - Делегируйте обработку кликов на уровень списка (ul)
    // - Используйте атрибуты data-* для определения действия
    // - Примените useCallback для оптимизации
    
    const [newTitleTask, setNewTitleTask] = useState<string>("");

    const [contextMenuState, setContextMenu] = useState<ContextMenuI>({ visible: false, positionX: 0, positionY: 0 });
    const themeColor = UseThemeColor();
    
    const handleClick = (e) => {
        let currentElement = e.target;
        const item = currentElement.closest('[data-id]');
        
        if(!item) return;
        
        const id = item.dataset.id;
        
        const actionElement = currentElement.closest('[data-action]');
        
        if(!actionElement) return;
        
        const action = actionElement.dataset.action;
        
        switch (action) {
            case 'toggle':
                setTodos((todos) => {
                    return todos.map((todo) => {
                        
                        if (id === todo.id) {
                            let style = !todo.completed ? { textDecoration: "line-through"} : { textDecoration: "none"};
                            return {...todo, completed: !todo.completed, style}
                        } else {
                            return todo
                        }
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
    
    const changeTitleTask = (e) => {
        setNewTitleTask(e.target.value);
    };
    
    const addItem = () => {
        setTodos((prev) => [...prev, { id: `${Math.random()}`, text: newTitleTask || '', completed: false, style: {textDecoration: "none"} }]);
        setNewTitleTask('');
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        
        const item = e.target.closest('[data-id]');
     
        const itemRect = item.getBoundingClientRect();
        const absoluteTop = itemRect.top + window.scrollY;
        const absoluteLeft = itemRect.left + window.scrollX;
        
        setContextMenu((prev: ContextMenuI) => ({ ...prev, visible: true, positionX: absoluteLeft, positionY: absoluteTop}));
    };
    
    const handleGlobalClick = () => {
        setContextMenu((prev: ContextMenuI) => ({...prev, visible: false }));
    };
    
    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);
        
        return () => {
            document.removeEventListener('click', handleGlobalClick);
        }
    }, [contextMenuState.visible])
    
    return (
        <div className="todo-app">
            <h3>Список задач</h3>
            
            <ul className="todo-list" data-id="todoList" onClick={handleClick}
                onContextMenu={handleContextMenu}>
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
                                        style={{marginRight: '10px'}}
                                        data-action={'toggle'}
                                        checked={item.completed}
                                    />
                                    <label data-action={'toggle'} style={item.style}>{item.text}</label>
                                </div>
                                <button
                                    data-action='close'
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#999',
                                        cursor: 'pointer'
                                    }}
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
                               onChange={changeTitleTask} value={newTitleTask}
                        />
                        <button style={{
                            background: 'var(--page-bg-color)',
                            color: '#999',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)',
                            marginTop: '20px'
                        }}
                                type="submit"
                                onClick={addItem}
                        >
                            Добавить
                        </button>
                    </form>
                }
            </div>
            
            {/* TODO: Добавьте контекстное меню, появляющееся по правому клику */}
            
            <ContextMenu contextMenuParams={contextMenuState}/>
        </div>
    );
}