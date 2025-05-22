import { createContext } from 'react';

export const ThemeContext = createContext('light');
export function ThemeProvider ({children}) {
    
    const theme = 'light';
    
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}