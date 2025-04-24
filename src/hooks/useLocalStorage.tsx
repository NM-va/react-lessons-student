import { useEffect, useRef } from 'react';


export const useLocalStorage = (key: string, initialValue: string) => {
    let jsonParse;
    let val;
    
    
    const setValueCommon = (newValue) => {

        console.log('newValue', newValue);
        return function setValue () {
        
            try {
                let localStorageJson = localStorage.getItem(key);
                jsonParse = JSON.parse(localStorageJson);
                
                if (!localStorageJson) {
                    localStorage.setItem(key, newValue);
                }
            
            } catch (error: string) {
                console.log(error);
            }
        }
    }
    
    useEffect(() => {
        setValueCommon(initialValue)();
    }, []);
    
    useEffect(() => {
        setValueCommon(val)();
        
        return () => {
            setValueCommon(val)
        }
    }, [val]);
    
    // useEffect(() => {
    //     const handleStorageChange = (event) => {
    //         if (event.key === key) {
    //
    //         }
    //     };
    //
    //     window.addEventListener('storage', handleStorageChange);
    //
    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange)
    //     }
    // }, [key]);
    

    
    return ([jsonParse, setValueCommon]);
};