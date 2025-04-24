import { useDraggable } from '../../utils/hooks/useDraggable';
import React from 'react';

export function DraggableBox() {
    // TODO: Используйте хук useDraggable
    const {position, refElement, isDragging, props} = useDraggable();
    let {onMouseDown, style} = props;
    const commonStyles = {
        width: '100px',
        height: '100px',
        backgroundColor: 'var(--accent-color)',
        position: 'absolute',
        // TODO: Используйте position из хука
        top: `${ position.y }px`,
        left: `${ position.x }px`,
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        userSelect: 'none',
    }
    
    return (
        <div
            // TODO: Примените props из хука для перетаскивания
            ref={refElement}
            onMouseDown={(e) => onMouseDown(e)}
            style={isDragging
                ? { ...commonStyles, ...style}
                : { ...commonStyles }
            }
        >
            Перетащи меня
        </div>
    );
}