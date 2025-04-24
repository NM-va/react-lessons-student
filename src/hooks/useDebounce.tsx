import { useEffect, useRef, useState } from 'react';


export const useDebounce = (value, delay: number) => {
    let [updatedValue, setUpdatedValue] = useState('');
    
    useEffect(() => {
        let timerId = setTimeout(() => {
            setUpdatedValue(value)
        }, delay)
        
        return () => {
            clearTimeout(timerId);
        }
    }, [value]);
    
    return updatedValue;
};