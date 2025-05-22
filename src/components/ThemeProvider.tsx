import { createContext } from 'react';

export const ThemeContext = createContext('light');
export function ThemeProvider ({children}) {
    
    const theme = 'light';
    
    return (
        <ThemeProvider.Provider value={theme}>
            {children}
        </ThemeProvider.Provider>
    )
}