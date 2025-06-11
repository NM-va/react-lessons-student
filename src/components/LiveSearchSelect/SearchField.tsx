import React, { useEffect, useRef, useState } from 'react';
import { SearchFieldProps } from './types';

export const SearchField = (props: SearchFieldProps) => {
    const {value, onChange, placeholder, categorySlot, onClear} = props;
    const [newValue, setNewValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    }
    
    const onSearch = () => {
        onChange(newValue);
    }
    
    const onClearSearchValue = () => {
        setNewValue('');
        onClear?.();
    }
    
    useEffect(() => {
        setNewValue(value);
    }, [value]);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter') {
            onChange(newValue);
        }
    }
    
    return (
        <div>
            <div>
                {categorySlot}
            </div>
            {/* Обработчик по ENTER */}
            {/* Очистить сделать X внутри input */}
            {/* Поиск по enter и по клику на кнопку найти */}
            <div className="containerClear">
                <label><input type="text" className="clearField" ref={inputRef} value={newValue} onChange={changeSearchValue} placeholder={placeholder} onKeyDown={onKeyDownHandler}/></label>
                <span onClick={onClearSearchValue} className="btnClear">x</span>
            </div>
            <button type="button" onClick={onSearch}>Найти</button>
        </div>
    );
};