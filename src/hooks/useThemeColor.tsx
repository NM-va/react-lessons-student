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
        secondary: '#b9b9f3',
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
        primary: ThemeColorMap[themeMode].primary,
        secondary: ThemeColorMap[themeMode].secondary,
        background: ThemeColorMap[themeMode].background,
        surface: ThemeColorMap[themeMode].surface,
        text: ThemeColorMap[themeMode].text,
    };


    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: { main: colors.primary },
            secondary: { main: colors.secondary },
            background: { default: colors.background },
            text: { primary: colors.text, secondary: colors.secondary },
        },
        spacing: (factor: number) => `${4 * factor}px`,
        typography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
            allVariants: {
                '& a': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                    '&:hover': {
                        color: 'primary',
                    },
                    '&:visited': {
                        color: 'primary',
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: 'palette.primary.main', // Основной цвет
                        textDecoration: 'none', // Убрать подчеркивание
                        '&:hover': {
                            color: 'palette.primary.dark', // Цвет при наведении
                            textDecoration: 'underline', // Подчеркивание при наведении
                        },
                        '&:visited': {
                            color: 'palette.secondary.main', // Цвет посещенной ссылки
                        },
                        '&:active': {
                            color: 'palette.error.main', // Цвет при клике
                        },
                    },
                },
            },
        }
    });


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