import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ThemeColors = {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
};

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
};

export type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
    colors: ThemeColors
};


export const ThemeColorMap: Record<ThemeMode, ThemeColors> = {
    [ThemeMode.LIGHT]: {
        background: '#ffffff',
        text: '#333333',
        primary: '#4f46e5',
        secondary: '#6366f1',
        surface: '#ffffff'
    },
    [ThemeMode.DARK]: {
        background: '#1f2937',
        text: '#f3f4f6',
        primary: '#818cf8',
        secondary: '#a5b4fc',
        surface: '#374151',
    }
};

export const UseThemeColor = () => {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeColor должен использоваться внутри ThemeProvider');
    }
    
    return context;
};



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeColorProviderProps {
    children: React.ReactNode;
}


export const ThemeColorProvider: React.FC<ThemeColorProviderProps> = ({
    children,
}) => {
  // Done: Реализуйте состояние темы с сохранением в localStorage
  // Done: Создайте функцию toggleTheme
  // Done: Определите цвета для светлой и темной темы
  // TODO: Создайте MUI тему с кастомизацией компонентов
  // Done: Верните провайдер с контекстом
    const [isDark, setIsDark] = useLocalStorage<boolean>('isDark', false);

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const themeMode = isDark ? ThemeMode.DARK : ThemeMode.LIGHT;

    const colors = {
        primary: isDark ? ThemeColorMap[ThemeMode.DARK].primary : ThemeColorMap[ThemeMode.LIGHT].primary,
        secondary: isDark ? ThemeColorMap[ThemeMode.DARK].secondary : ThemeColorMap[ThemeMode.LIGHT].secondary,
        background: isDark ? ThemeColorMap[ThemeMode.DARK].background : ThemeColorMap[ThemeMode.LIGHT].background,
        surface: isDark ? ThemeColorMap[ThemeMode.DARK].surface : ThemeColorMap[ThemeMode.LIGHT].surface,
        text: isDark ? ThemeColorMap[ThemeMode.DARK].text : ThemeColorMap[ThemeMode.LIGHT].text,
    }


    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: { main: colors.primary },
            secondary: { main: colors.secondary },
            background: { default: colors.background },
            text: { primary: colors.text },
        }
    })


    return (
        <ThemeContext.Provider value={{isDark, toggleTheme, colors }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
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