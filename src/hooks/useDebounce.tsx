import { useEffect, useState } from 'react';


export function useDebounce<T>(value: T, delay: number): T {
    const [updatedValue, setUpdatedValue] = useState(value);
    
    useEffect(() => {
        let timerId = setTimeout(() => {
            setUpdatedValue(value);
        }, delay)
        
        return () => {
            clearTimeout(timerId);
        }
    }, [value, delay]);
    
    return updatedValue;
}