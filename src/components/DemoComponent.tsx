import React, { useRef, useState } from 'react';
import { UniversalInput } from './UniversalInput';

export const DemoComponent: React.FC = () => {
    // Состояние для контролируемого режима
    const [controlledValue, setControlledValue] = useState('');
    
    // Ref для доступа к неконтролируемому инпуту
    const uncontrolledInputRef = useRef(null);
    
    // Ref для доступа к универсальному инпуту в неконтролируемом режиме
    const universalUncontrolledRef = useRef(null);
    
    const [attributes, setAttributes] = useState({});
    const onChangeValue = (value) => {
        setControlledValue(value);
    }
    
    const handleControl = () => {
        setAttributes((prev) => {
            return {...prev, value: `${controlledValue}`, onChange: onChangeValue}
        });
    };
    
    const handleUncontrol = () => {
        setAttributes({})
    };
    
    return (
        <div className="demo-container">
            <h2>Демонстрация UniversalInput</h2>
        
            {/* Контролируемый режим */}
            <div className="input-section">
                <h3>Контролируемый режим</h3>
                {/* TODO: Добавьте UniversalInput в контролируемом режиме */}
                <UniversalInput value="23" onChange={onChangeValue} />
                <div></div>
            </div>
        
            {/* Неконтролируемый режим */}
            <div className="input-section">
                <h3>Неконтролируемый режим</h3>
                {/* TODO: Добавьте UniversalInput в неконтролируемом режиме */}
                <UniversalInput />
            </div>
    
            <div className="input-section">
                <h3>Универсальный режим</h3>
                {/* TODO: Добавьте UniversalInput в неконтролируемом режиме */}
                <UniversalInput {...attributes} />
            </div>
            
            {/* Элементы управления */}
            <div className="controls">
                {/* TODO: Добавьте кнопки для демонстрации функциональности */}
                <button onClick={handleControl}>Использовать как контролируемый</button>
                <button onClick={handleUncontrol}>Использовать как неконтролируемый</button>
            </div>
        </div>
    );
};