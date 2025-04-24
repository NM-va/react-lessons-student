import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';

interface searchBarProps {
    onSearch: any;
    debounceTime: number;
}

export const SearchBar = ({ onSearch, debounceTime = 500 }: searchBarProps) => {
    const [value, setValue] = useState<string>('');
    let changeSearchValue = (e) => {
        setValue(e.target.value);
   };
    
    const updatedValue = useDebounce(value, debounceTime);
    
    useEffect(() => {
        onSearch(updatedValue);
        
    }, [updatedValue]);
    
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <label htmlFor=""></label>
                <input onChange={changeSearchValue} value={value} type="text"/>
            </div>
        </div>
    );
};