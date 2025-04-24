import { useLocalStorage } from '../hooks/useLocalStorage';
import React from 'react';

export function TestLocalStorage() {
    const [name, setName] = useLocalStorage('name', 'Гость');
    console.log('setname', setName);
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', 'false');
    
    return (
        <div className={darkMode ? 'dark' : 'light'}>
            <h1>Привет, {name}!</h1>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => setDarkMode(!darkMode)}>
                Переключить тему
            </button>
        </div>
    );
}