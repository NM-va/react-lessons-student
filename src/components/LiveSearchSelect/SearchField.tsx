import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { SearchFieldProps } from './types';

export const SearchField = (props: SearchFieldProps) => {
    const {value, onChange, placeholder, categorySlot, onClear} = props;
    const [newValue, setNewValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const newValueRef = useRef<string>(newValue);
    
    const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    }
    
    const onSearch = () => {
        onChange(newValue);
    }
    
    const onClearSearchValue = () => {
        setNewValue('');
        onClear();
    }
    
    useEffect(() => {
        newValueRef.current = newValue;
    }, [newValue]);
    
    useEffect(() => {
        const handleGlobalClick = (e: KeyboardEvent) => {
     
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            
            if (e.key === 'Enter') {
                onChange(newValueRef.current);
            }
        };
        
        document.addEventListener('keydown', handleGlobalClick, { capture: true });
        
        return () => document.removeEventListener('keydown', handleGlobalClick, { capture: true });
    }, []);
    
    return (
        <div>
            <div>
                {categorySlot}
            </div>
            {/* Обработчик по ENTER */}
            {/* Очистить сделать X внутри input */}
            {/* Поиск по enter и по клику на кнопку найти */}
            <div className="containerClear">
                <label><input type="text" className="clearField" ref={inputRef} value={newValue} onChange={changeSearchValue} placeholder={placeholder}/></label>
                <span onClick={onClearSearchValue} className="btnClear">x</span>
            </div>
            <button type="button" onClick={onSearch}>Найти</button>
        </div>
    );
};