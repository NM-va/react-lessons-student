import { useDebounce } from '../hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';

interface searchBarProps {
    onSearch: any;
    debounceTime: number;
}

export const SearchBar = ({ onSearch, debounceTime = 500 }: searchBarProps) => {
    const [value, setValue] = useState<string>('');
    const updatedValue = useDebounce(value, debounceTime);
    
    
    let onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);
    
    useEffect(() => {
        console.log(new Date().getSeconds())
        onSearch(updatedValue);
    }, [updatedValue]);
    
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <label htmlFor=""></label>
                <input onChange={onChangeHandler} value={value} type="text"/>
            </div>
        </div>
    );
};