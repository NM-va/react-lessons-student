import React, { useCallback, useEffect, useRef, useState } from 'react';

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

export function useDraggable(): UseDraggableReturn {
    // Ваш код здесь
    
    let [position, setPosition] = useState<Position>({ x: 50, y: 50 });
    let [isDragging, setIsDragging] = useState<boolean>(false);
    let draggableRefElement = useRef<HTMLInputElement | null>(null);
    let draggableBoxElement = useRef<HTMLInputElement | null>(null);
    
    // Начальные координаты перетаскивания
    const dragStartRef = useRef<DragStartPosition>({ x: 0, y: 0, elementX: 0, elementY: 0 });
    console.log('dragStartRef', dragStartRef);
    
    const handleMouseDown = useCallback((e) => {
        // Логика начала перетаскивания
        setPosition({ x: 50, y: 50, elementX: 0, elementY:0 });
        setIsDragging(true);
        console.log('position', position);
    }, []);
    
    const handleMouseMove = useCallback((e) => {
        // Логика перетаскивания

        dragStartRef.current.x = e?.clientX;
        dragStartRef.current.y = e?.clientY;
        let x: number;
        let y: number;
        
        setPosition((prevCount): Position => {
            x = dragStartRef.current.x - prevCount.x;
            y = dragStartRef.current.y - prevCount.y;
        
            return ({x, y})
        } );
    
        console.log('position', position);
        console.log('x', x);
        console.log('y', y);
    }, []);
    
    const handleMouseUp = useCallback(() => {
        // Логика завершения перетаскивания
      

    }, []);
    
    useEffect(() => {
        // Регистрация и очистка глобальных обработчиков событий
        console.log('reg');
        
        
        return () => {
            // Очистка
            handleMouseMove();
            handleMouseUp();
            setIsDragging(false);
            console.log('raz');
        };
    }, [handleMouseMove, handleMouseUp]);
    
    
    return {
        position,
        ref: draggableRefElement,
        isDragging,
        props: {
            onMouseDown: handleMouseDown,
            style: {
                cursor: isDragging ? 'grabbing' : 'grab',
                // Другие стили
                backgroundColor:  isDragging ? 'green' : 'var(--accent-color)'
            }
        }
    };
    
    
    // Подсказки:
    // 1. Используйте useState для отслеживания position и isDragging
    // 2. Используйте useRef для хранения ссылки на элемент
    // 3. Применяйте useCallback для обработчиков событий
    // 4. Не забудьте про useEffect для регистрации и очистки глобальных обработчиков
}