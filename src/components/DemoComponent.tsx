import React, { useRef, useState } from 'react';
import { UniversalInput } from './UniversalInput';

export const DemoComponent: React.FC = () => {
    // Состояние для контролируемого режима
    const [controlledValue, setControlledValue] = useState('23');
    const [isControlledMode, setIsControlledMode] = useState<boolean>(false);
    
    // Ref для доступа к неконтролируемому инпуту
    const uncontrolledInputRef = useRef(null);
    
    // Ref для доступа к универсальному инпуту в неконтролируемом режиме
    const universalUncontrolledRef = useRef(null);
    
    const onChangeValue = (value: string) => {
        setControlledValue(value);
    }

    
    const handleControl = () => {
        setIsControlledMode(true);
    };
    
    const handleUncontrol = () => {
        setIsControlledMode(false);
    };

    const attrs = {
        ...(isControlledMode ? { value: controlledValue, onChange: onChangeValue} : {})
    }
    
    return (
        <div className="demo-container">
            <h2>Демонстрация UniversalInput</h2>
        
            {/* Контролируемый режим */}
            <div className="input-section">
                <h3>Контролируемый режим</h3>
                {/* TODO: Добавьте UniversalInput в контролируемом режиме */}
                <UniversalInput value={controlledValue} onChange={onChangeValue} />
                <div></div>
            </div>
        
            {/* Неконтролируемый режим */}
            <div className="input-section">
                <h3>Неконтролируемый режим</h3>
                {/* TODO: Добавьте UniversalInput в неконтролируемом режиме */}
                <UniversalInput  defaultValue='777'/>
            </div>
    
            <div className="input-section">
                <h3>Универсальный режим</h3>
                {/* TODO: Добавьте UniversalInput в неконтролируемом режиме */}
                <UniversalInput {...attrs }/>
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