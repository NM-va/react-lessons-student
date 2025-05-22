import { createContext, useContext, useState } from 'react';

export const UseThemeColor = () => {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeColor должен использоваться внутри ThemeProvider');
    }
    
    return context;
};

export type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

// Создание контекста с начальным значением
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
}) => {
    // Используем useLocalStorage для сохранения выбранной темы
    // Используем установку классов для body
    const [isDark, setIsDark] = useState<boolean>(false);

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDark(!isDark);
        //todo
    };


    return (
        <ThemeContext.Provider value={{isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

//todo 

// export const ThemeColorMap: Record<ThemeMode, ThemeColors> = {
//     [ThemeMode.LIGHT]: {
//         background: '#ffffff',
//         text: '#333333',
//         primary: '#4f46e5',
//         secondary: '#6366f1',
//         border: '#e5e7eb',
//         shadow: 'rgba(0, 0, 0, 0.1)',
//     },
//     [ThemeMode.DARK]: {
//         background: '#1f2937',
//         text: '#f3f4f6',
//         primary: '#818cf8',
//         secondary: '#a5b4fc',
//         border: '#374151',
//         shadow: 'rgba(0, 0, 0, 0.3)',
//     }
// };

// export type ThemeContextType = {
//     isDark: boolean;
//     colors: ThemeColors;
//     toggleTheme: () => void;
//     setTheme: (theme: ThemeMode) => void;
//     currentTheme: ThemeMode;
// };