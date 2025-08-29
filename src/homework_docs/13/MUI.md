# Лекция 13: Material-UI + Темизация

## Оглавление

1. [Введение в Material-UI](#введение-в-material-ui)
2. [Установка и настройка](#установка-и-настройка)
3. [Система темизации](#система-темизации)
4. [Создание useThemeColor хука](#создание-usethemecolor-хука)
5. [Основные компоненты](#основные-компоненты)
6. [Кастомизация стилей](#кастомизация-стилей)
7. [Адаптивный дизайн](#адаптивный-дизайн)
8. [Лучшие практики](#лучшие-практики)

---

## Введение в Material-UI

**Material-UI (MUI)** — это React библиотека компонентов, которая реализует Google's Material Design. Она предоставляет набор готовых компонентов с современным дизайном, богатой функциональностью и встроенной поддержкой темизации.

### Преимущества MUI

- ✅ **Готовые компоненты** - Более 50 компонентов из коробки
- ✅ **Material Design** - Следует принципам Google Material Design
- ✅ **TypeScript поддержка** - Полная типизация из коробки
- ✅ **Темизация** - Мощная система кастомизации
- ✅ **Accessibility** - A11y поддержка по умолчанию
- ✅ **Большое сообщество** - Активная разработка и поддержка

### Когда использовать MUI

- 🎯 Быстрая разработка MVP
- 🎯 Корпоративные приложения
- 🎯 Админ панели и дашборды
- 🎯 Веб-приложения с Material Design

---

## Установка и настройка

### 1. Установка основных пакетов

```bash
# Основные пакеты MUI
npm install @mui/material @emotion/react @emotion/styled

# Иконки Material Design
npm install @mui/icons-material

# Дополнительные пакеты (при необходимости)
npm install @mui/x-date-pickers  # Компоненты для работы с датами
npm install @mui/lab             # Экспериментальные компоненты
```

### 2. Альтернативная установка со styled-components

```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```

### 3. Базовая настройка приложения

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сбрасывает стили браузера */}
      <YourAppComponents />
    </ThemeProvider>
  );
}

export default App;
```

**Важно:** `CssBaseline` убирает браузерные стили по умолчанию и применяет базовые стили MUI.

---

## Система темизации

MUI предоставляет мощную систему темизации, которая позволяет настроить внешний вид всего приложения.

### Структура темы

```tsx
const theme = createTheme({
  palette: {      // Цветовая палитра
    mode: 'light' | 'dark',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    error: { main: '#d32f2f' },
    warning: { main: '#ed6c02' },
    info: { main: '#0288d1' },
    success: { main: '#2e7d32' },
  },
  typography: {   // Типографика
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem' },
  },
  spacing: 8,     // Базовая единица отступов (8px)
  shape: {        // Форма компонентов
    borderRadius: 4,
  },
  components: {   // Кастомизация компонентов
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }
      }
    }
  }
});
```

### Цветовая система

MUI использует систему цветовых ролей:

- **Primary** - Основной цвет бренда
- **Secondary** - Дополнительный цвет
- **Error** - Ошибки и предупреждения
- **Warning** - Предупреждения
- **Info** - Информационные сообщения
- **Success** - Успешные операции

Каждый цвет имеет варианты:

- `main` - Основной цвет
- `light` - Светлый вариант
- `dark` - Темный вариант
- `contrastText` - Контрастный текст

---

## Создание useThemeColor хука

Создадим пользовательский хук для управления темами:

### 1. Создание контекста и хука

```tsx
// hooks/useThemeColor.ts
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeColor = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeColor must be used within ThemeColorProvider');
  }
  return context;
};
```

### 2. Провайдер темы

```tsx
interface ThemeColorProviderProps {
  children: ReactNode;
}

export const ThemeColorProvider: React.FC<ThemeColorProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Загружаем тему из localStorage
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }, []);

  // Динамические цвета
  const colors = {
    primary: isDark ? '#90caf9' : '#1976d2',
    secondary: isDark ? '#f48fb1' : '#dc004e',
    background: isDark ? '#121212' : '#ffffff',
    surface: isDark ? '#1e1e1e' : '#f5f5f5',
  };

  // Создание MUI темы
  const muiTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });

  const value = {
    isDark,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
```

### 3. Компонент переключателя темы

```tsx
// components/ThemeToggle.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeColor } from '../hooks/useThemeColor';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeColor();

  return (
    <Tooltip title={isDark ? 'Светлая тема' : 'Темная тема'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};
```

---

## Основные компоненты

### Layout компоненты

#### Container

Центрирует контент с максимальной шириной:

```tsx
import { Container } from '@mui/material';

<Container maxWidth="lg">
  <h1>Контент по центру</h1>
</Container>
```

#### Grid System

Flexbox-based сетка для создания layouts:

```tsx
import { Grid } from '@mui/material';

<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <div>Левая колонка</div>
  </Grid>
  <Grid item xs={12} md={6}>
    <div>Правая колонка</div>
  </Grid>
</Grid>
```

#### Box

Универсальный контейнер с sx prop:

```tsx
import { Box } from '@mui/material';

<Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
  Стилизованный контейнер
</Box>
```

### Input компоненты

#### TextField

Поле ввода с множеством вариантов:

```tsx
import { TextField } from '@mui/material';

<TextField
  label="Email"
  variant="outlined"
  type="email"
  fullWidth
  required
  helperText="Введите ваш email"
  error={emailError}
/>
```

#### Button

Кнопки разных типов:

```tsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Contained Button
</Button>

<Button variant="outlined" color="secondary">
  Outlined Button
</Button>

<Button variant="text">
  Text Button
</Button>
```

### Display компоненты

#### Typography

Компонент для текста с семантикой:

```tsx
import { Typography } from '@mui/material';

<Typography variant="h1" component="h1" gutterBottom>
  Главный заголовок
</Typography>

<Typography variant="body1" color="text.secondary">
  Основной текст параграфа
</Typography>
```

#### Card

Карточки для группировки контента:

```tsx
import { Card, CardContent, CardActions, Button } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5" component="div">
      Заголовок карточки
    </Typography>
    <Typography variant="body2">
      Описание содержимого карточки
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Действие</Button>
  </CardActions>
</Card>
```

---

## Кастомизация стилей

### sx prop - система стилизации

sx prop позволяет писать CSS-in-JS стили прямо в компонентах:

```tsx
// Базовые стили
<Box sx={{
  p: 2,                    // padding: theme.spacing(2)
  m: 1,                    // margin: theme.spacing(1)
  bgcolor: 'primary.main', // цвет из темы
  color: 'white',
  borderRadius: 2,         // border-radius: theme.spacing(2)
  boxShadow: 3,           // elevation shadow
}}>
  Стилизованный блок
</Box>

// Псевдоклассы и медиазапросы
<Button sx={{
  bgcolor: 'primary.main',
  '&:hover': {
    bgcolor: 'primary.dark',
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
}}>
  Интерактивная кнопка
</Button>
```

### Адаптивные значения

```tsx
<Box sx={{
  width: {
    xs: '100%',    // 0px и больше
    sm: '75%',     // 600px и больше
    md: '50%',     // 900px и больше
    lg: '25%',     // 1200px и больше
    xl: '20%',     // 1536px и больше
  },
  p: { xs: 1, md: 3 }, // padding адаптивно
}}>
  Адаптивный контент
</Box>
```

### Система spacing

MUI использует функцию spacing для единообразных отступов:

```tsx
// theme.spacing(1) = 8px (по умолчанию)
<Box sx={{
  p: 1,    // padding: 8px
  m: 2,    // margin: 16px
  mt: 3,   // margin-top: 24px
  px: 4,   // padding-left & padding-right: 32px
}}>
```

### Кастомизация через тему

```tsx
const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #f0f0f0',
        },
      },
    },
  },
});
```

---

## Адаптивный дизайн

### Breakpoints системы

MUI предоставляет 5 breakpoints:

- **xs**: 0px+
- **sm**: 600px+
- **md**: 900px+
- **lg**: 1200px+
- **xl**: 1536px+

### useMediaQuery хук

```tsx
import { useMediaQuery, useTheme } from '@mui/material';

function ResponsiveComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </div>
  );
}
```

### Hidden компонент

```tsx
import { Hidden } from '@mui/material';

<Hidden mdDown>
  <div>Скрыто на мобильных устройствах</div>
</Hidden>

<Hidden lgUp>
  <div>Показано только на мобильных</div>
</Hidden>
```

---

## Лучшие практики

### 1. Структура проекта

```
src/
├── components/
│   ├── ui/              # Переиспользуемые UI компоненты
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Input/
│   └── layout/          # Layout компоненты
│       ├── Header/
│       ├── Sidebar/
│       └── Footer/
├── theme/               # Темы и стили
│   ├── theme.ts
│   ├── components.ts    # Кастомизация компонентов
│   └── palette.ts       # Цветовые схемы
├── hooks/
│   └── useThemeColor.ts
└── pages/
```

### 2. Оптимизация производительности

```tsx
// Импортируйте только нужные компоненты
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Вместо
import { Button, TextField } from '@mui/material';
```

### 3. TypeScript интеграция

```tsx
// Расширение темы для кастомных цветов
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
  }
}
```

### 4. Переиспользуемые компоненты

```tsx
// components/ui/CustomCard.tsx
import { Card, CardProps } from '@mui/material';
import { useThemeColor } from '../../hooks/useThemeColor';

interface CustomCardProps extends CardProps {
  variant?: 'elevated' | 'outlined';
}

export const CustomCard: React.FC<CustomCardProps> = ({
  variant = 'elevated',
  sx,
  ...props
}) => {
  const { colors } = useThemeColor();

  return (
    <Card
      sx={{
        borderRadius: 3,
        ...(variant === 'outlined' && {
          border: `1px solid ${colors.primary}`,
          boxShadow: 'none',
        }),
        ...sx,
      }}
      {...props}
    />
  );
};
```

### 5. Тестирование

```tsx
// __tests__/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeColorProvider } from '../hooks/useThemeColor';
import { ThemeToggle } from '../components/ThemeToggle';

test('переключает тему при клике', () => {
  render(
    <ThemeColorProvider>
      <ThemeToggle />
    </ThemeColorProvider>
  );

  const toggleButton = screen.getByRole('button');
  fireEvent.click(toggleButton);
  
  // Проверяем изменение темы
  expect(localStorage.getItem('theme')).toBe('dark');
});
```

---

## Заключение

Material-UI предоставляет мощную основу для создания современных React приложений. Ключевые моменты:

- 🎯 **Быстрая разработка** с готовыми компонентами
- 🎨 **Гибкая темизация** через createTheme и sx prop
- 📱 **Адаптивность** из коробки
- ♿ **Accessibility** по умолчанию
- 🔧 **TypeScript** поддержка

Следующие шаги изучения:

- MUI X компоненты (DataGrid, DatePicker)
- Продвинутая кастомизация стилей
- Создание дизайн-системы
- Интеграция с Storybook
- Оптимизация bundle size
