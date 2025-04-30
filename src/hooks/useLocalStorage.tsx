import { useEffect, useState } from 'react';


export function useLocalStorage<T>(key: string, initialValue?: T): [T, (v: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item  ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    
    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        const handleChangeStorageEvent = (e: StorageEvent) => {
            if(e.newValue && e.key === key) {
                try {
                    console.log(JSON.parse(e.newValue));
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error(error);
                }
            }
            console.log(e);
        }
        
        window.addEventListener('storage', handleChangeStorageEvent);
        
        return () => {
            window.removeEventListener('storage', handleChangeStorageEvent);
        }
    }, [key])
    
    return [storedValue, setValue]
}