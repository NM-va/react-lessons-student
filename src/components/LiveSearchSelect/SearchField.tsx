import React, { ChangeEventHandler, useEffect, useRef } from 'react';
import { SearchFieldProps } from './types';

export const SearchField = (props: SearchFieldProps) => {
    const {value, onChange, placeholder, categorySlot, onClear} = props;
    
    const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    useEffect(() => {
        const handleGlobalClick = (e: KeyboardEvent) => {
 
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
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
            <label><input type="text" ref={inputRef} value={value} onChange={changeSearchValue} placeholder={placeholder}/></label>
            <button type="button" onClick={onClear}>Очистить поисковый запрос</button>
        </div>
    );
};