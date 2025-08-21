# Домашнее задание: Material-UI + Темизация

## Цель задания

Создать полнофункциональное приложение "Персональный дашборд" с использованием Material-UI, системы темизации и пользовательского хука `useThemeColor`.

---

## Техническое задание

### 📋 Функциональные требования

Создайте приложение со следующими возможностями:

1. **Переключение тем** - светлая/темная тема с сохранением в localStorage
2. **Дашборд с виджетами** - статистика, графики, списки задач
3. **Форма добавления задач** - с валидацией
4. **Адаптивный дизайн** - корректное отображение на всех устройствах
5. **Настройки профиля** - изменение данных пользователя

### 🎨 Требования к дизайну

- Использование Material Design принципов
- Анимации и переходы между состояниями
- Консистентная цветовая схема
- Иконки Material Icons
- Красивые карточки и компоненты

---

## Пошаговая инструкция

### Шаг 1: Создание проекта и установка зависимостей

```bash
# Создаем новый React проект
npx create-react-app mui-dashboard --template typescript
cd mui-dashboard

# Устанавливаем Material-UI
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-charts  # Для графиков (опционально)

# Дополнительные библиотеки
npm install react-router-dom
npm install @types/react-router-dom  # Если используете TypeScript
```

### Шаг 2: Базовая структура проекта

Создайте следующую структуру файлов:

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── dashboard/
│   │   ├── StatsCards.tsx
│   │   ├── TaskList.tsx
│   │   ├── RecentActivity.tsx
│   │   └── QuickActions.tsx
│   ├── forms/
│   │   ├── TaskForm.tsx
│   │   └── ProfileForm.tsx
│   └── ui/
│       ├── ThemeToggle.tsx
│       └── CustomCard.tsx
├── hooks/
│   ├── useThemeColor.ts
│   └── useTasks.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Tasks.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── types/
│   └── index.ts
└── utils/
    └── storage.ts
```

### Шаг 3: Реализация useThemeColor хука

Создайте `src/hooks/useThemeColor.ts`:

```typescript
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
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

interface ThemeColorProviderProps {
  children: ReactNode;
}

export const ThemeColorProvider: React.FC<ThemeColorProviderProps> = ({ children }) => {
  // TODO: Реализуйте состояние темы с сохранением в localStorage
  // TODO: Создайте функцию toggleTheme
  // TODO: Определите цвета для светлой и темной темы
  // TODO: Создайте MUI тему с кастомизацией компонентов
  // TODO: Верните провайдер с контекстом

  return (
    <ThemeContext.Provider value={/* TODO */}>
      <ThemeProvider theme={/* TODO */}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
```

### Шаг 4: Основные типы

Создайте `src/types/index.ts`:

```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}
```

---

## Задания по компонентам

### Задание 1: Header с переключателем темы

**Файл:** `src/components/layout/Header.tsx`

**Требования:**

- AppBar с заголовком приложения
- Аватар пользователя с выпадающим меню
- Кнопка переключения темы
- Уведомления (Badge с количеством)

```typescript
// Пример структуры
import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge } from '@mui/material';
import { Notifications, Settings } from '@mui/icons-material';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header: React.FC = () => {
  // TODO: Реализуйте компонент
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* TODO: Логотип и название */}
        {/* TODO: Поиск (опционально) */}
        <div style={{ flexGrow: 1 }} />
        {/* TODO: Уведомления */}
        {/* TODO: Переключатель темы */}
        {/* TODO: Аватар с меню */}
      </Toolbar>
    </AppBar>
  );
};
```

### Задание 2: Dashboard со статистикой

**Файл:** `src/components/dashboard/StatsCards.tsx`

**Требования:**

- 4 карточки со статистикой (всего задач, выполненных, в процессе, просроченных)
- Иконки для каждой карточки
- Цветовое кодирование (зеленый для выполненных, красный для просроченных)
- Анимация при hover

```typescript
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Assignment, CheckCircle, Schedule, Warning } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  // TODO: Реализуйте карточку статистики
};

export const StatsCards: React.FC = () => {
  // TODO: Получите данные статистики
  // TODO: Создайте массив карточек
  // TODO: Отрендерите Grid с карточками
};
```

### Задание 3: Форма добавления задач

**Файл:** `src/components/forms/TaskForm.tsx`

**Требования:**

- Поля: название, описание, приоритет, дата выполнения
- Валидация полей
- Отправка формы с созданием задачи
- Использование Material-UI компонентов

```typescript
import { 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Button, Box 
} from '@mui/material';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit }) => {
  // TODO: Состояние формы
  // TODO: Валидация
  // TODO: Обработка отправки
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* TODO: Реализуйте форму */}
    </Dialog>
  );
};
```

### Задание 4: Список задач с фильтрацией

**Файл:** `src/components/dashboard/TaskList.tsx`

**Требования:**

- Отображение списка задач
- Фильтрация по статусу и приоритету
- Отметка задач как выполненных
- Удаление задач
- Поиск по названию

```typescript
import { 
  Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction,
  Checkbox, IconButton, Chip, TextField, Box, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export const TaskList: React.FC = () => {
  // TODO: Состояние задач и фильтров
  // TODO: Функции фильтрации
  // TODO: Обработчики действий
  
  return (
    <Card>
      <CardContent>
        {/* TODO: Поиск и фильтры */}
        {/* TODO: Список задач */}
      </CardContent>
    </Card>
  );
};
```

### Задание 5: Кастомная карточка

**Файл:** `src/components/ui/CustomCard.tsx`

**Требования:**

- Расширение стандартной Card MUI
- Использование цветов из useThemeColor
- Hover эффекты
- Варианты отображения (elevated, outlined, gradient)

```typescript
import { Card, CardProps } from '@mui/material';
import { useThemeColor } from '../../hooks/useThemeColor';

interface CustomCardProps extends CardProps {
  variant?: 'elevated' | 'outlined' | 'gradient';
  hoverEffect?: boolean;
}

export const CustomCard: React.FC<CustomCardProps> = ({ 
  variant = 'elevated',
  hoverEffect = true,
  sx,
  children,
  ...props 
}) => {
  const { colors, isDark } = useThemeColor();
  
  // TODO: Создайте стили для разных вариантов
  // TODO: Добавьте hover эффекты
  // TODO: Используйте цвета из контекста
  
  return (
    <Card
      sx={{
        // TODO: Добавьте стили
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};
```

---

## Обязательные задания

### ✅ Задание 1: Настройка темизации (30 баллов)

**Что нужно сделать:**

1. Создать полнофункциональный `useThemeColor` хук
2. Реализовать переключение между светлой и темной темой
3. Сохранение выбранной темы в localStorage
4. Кастомизация MUI компонентов через тему

**Критерии оценки:**

- Корректная работа переключения тем (10 баллов)
- Сохранение темы между сессиями (5 баллов)  
- Кастомизация компонентов (10 баллов)
- Использование цветов из контекста (5 баллов)

### ✅ Задание 2: Дашборд с виджетами (40 баллов)

**Что нужно сделать:**

1. Создать страницу дашборда с виджетами
2. Карточки статистики с иконками и цветами
3. Список последних задач
4. Быстрые действия (кнопки)

**Критерии оценки:**

- Статистические карточки (15 баллов)
- Список задач с интерактивностью (15 баллов)
- Адаптивная сетка компонентов (10 баллов)

### ✅ Задание 3: Формы и взаимодействие (30 баллов)

**Что нужно сделать:**

1. Форма добавления задач с валидацией
2. Возможность редактирования задач
3. Удаление задач с подтверждением
4. Фильтрация и поиск

**Критерии оценки:**

- Валидация формы (10 баллов)
- CRUD операции с задачами (15 баллов)
- Фильтрация и поиск (5 баллов)

---

## Дополнительные задания (бонусы)

### 🎯 Бонус 1: Продвинутые компоненты (+15 баллов)

- Календарь с задачами (DatePicker интеграция)
- Графики статистики (Chart.js или MUI X Charts)
- Drag & Drop для задач
- Notifications с Snackbar

### 🎯 Бонус 2: Анимации и UX (+10 баллов)

- Плавные переходы между темами
- Loading состояния с Skeleton
- Анимации появления компонентов
- Красивые hover эффекты

### 🎯 Бонус 3: Мобильная адаптация (+10 баллов)

- Responsive Drawer для навигации
- Адаптивные карточки статистики
- Touch-friendly интерфейс
- Bottom Navigation для мобильных

### 🎯 Бонус 4: Дополнительная функциональность (+15 баллов)

- Экспорт данных в JSON/CSV
- Импорт задач из файла
- Настройки пользователя (профиль)
- Темы на выбор (не только светлая/темная)

---

## Пример финальной структуры

```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeColorProvider } from './hooks/useThemeColor';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, Tasks, Profile, Settings } from './pages';

function App() {
  return (
    <ThemeColorProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeColorProvider>
  );
}

export default App;
```

---

## Технические требования

### 📋 Обязательные технологии

- ✅ **React 18+** с TypeScript
- ✅ **Material-UI (MUI) 5+** - основная UI библиотека
- ✅ **Emotion** - для стилизации (идет с MUI)
- ✅ **React Router** - для навигации
- ✅ **localStorage** - для сохранения данных

### 📋 Код-стайл и качество

- ✅ **TypeScript** - строгая типизация
- ✅ **ESLint** - линтинг кода
- ✅ **Prettier** - форматирование
- ✅ **Комментарии** - объяснение сложных частей
- ✅ **Именование** - понятные названия переменных и функций

### 📋 Структура проекта

- ✅ **Модульность** - разделение на компоненты
- ✅ **Переиспользование** - общие компоненты в папке ui/
- ✅ **Хуки** - логика вынесена в пользовательские хуки
- ✅ **Типы** - отдельные файлы для типов

---

## Критерии оценки

### 🎯 Отлично (90-100 баллов)

- Все обязательные задания выполнены на высоком уровне
- Код хорошо структурирован и читаем
- Использованы продвинутые возможности MUI
- Выполнены дополнительные задания
- Красивый и интуитивный интерфейс

### 🎯 Хорошо (70-89 баллов)

- Все обязательные задания выполнены
- Есть незначительные недочеты в коде или дизайне
- Базовая функциональность работает корректно
- Тема переключается правильно

### 🎯 Удовлетворительно (50-69 баллов)

- Выполнено большинство обязательных заданий
- Есть ошибки или недоработки
- Основная функциональность частично работает
- Требуются доработки

### 🎯 Неудовлетворительно (0-49 баллов)

- Задания выполнены частично или с критическими ошибками
- Приложение не запускается или работает некорректно
- Не соблюдены технические требования

---

## Инструкции по сдаче

### 📤 Формат сдачи

1. **GitHub репозиторий** с исходным кодом
2. **README.md** с инструкциями по запуску
3. **Deployed версия** (Vercel, Netlify или GitHub Pages)
4. **Скриншоты** основных экранов

### 📤 README.md должен содержать

```markdown
# Material-UI Dashboard

## Описание
Персональный дашборд с поддержкой темизации, созданный на React + Material-UI.

## Функциональность
- ✅ Переключение светлой/темной темы
- ✅ Управление задачами (CRUD)
- ✅ Статистика и виджеты
- ✅ Адаптивный дизайн

## Технологии
- React 18 + TypeScript
- Material-UI 5
- React Router
- Local Storage

## Установка и запуск
\`\`\`bash
npm install
npm start
\`\`\`

## Структура проекта
\`\`\`
src/
├── components/
├── hooks/
├── pages/
└── types/
\`\`\`

## Демо
[Ссылка на deployed версию]

## Скриншоты
[Скриншоты светлой и темной темы]
```

### 📤 Сроки сдачи

- **Дедлайн:** 1 неделя с момента выдачи задания
- **Защита:** Презентация работы 5-10 минут
- **Вопросы:** Готовность ответить на вопросы по коду

---

## Полезные ресурсы

### 📚 Документация

- [Material-UI документация](https://mui.com/)
- [Material Design Guidelines](https://material.io/design)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### 📚 Примеры и вдохновение

- [MUI Templates](https://mui.com/store/)
- [Material Dashboard Examples](https://github.com/creativetimofficial/material-dashboard-react)
- [Color Palette Generator](https://material.io/resources/color/)

### 📚 Полезные библиотеки

```bash
# Дополнительные MUI компоненты
npm install @mui/x-data-grid      # Таблицы
npm install @mui/x-date-pickers   # Календари
npm install @mui/lab              # Экспериментальные компоненты

# Иконки
npm install @mui/icons-material   # Material Icons
npm install @iconify/react        # Альтернативные иконки

# Утилиты
npm install date-fns              # Работа с датами
npm install uuid                  # Генерация ID
npm install react-hot-toast       # Уведомления
```

---

## Чек-лист перед сдачей

### ✅ Функциональность

- [ ] Приложение запускается без ошибок
- [ ] Темы переключаются корректно
- [ ] Все формы работают с валидацией
- [ ] CRUD операции с задачами выполняются
- [ ] Данные сохраняются в localStorage
- [ ] Адаптивный дизайн на разных экранах

### ✅ Код

- [ ] Код отформатирован и без линтер ошибок
- [ ] Все компоненты типизированы
- [ ] Используются пользовательские хуки
- [ ] Нет дублирования кода
- [ ] Комментарии в сложных местах

### ✅ UI/UX

- [ ] Интерфейс интуитивно понятен
- [ ] Цвета согласованы между темами
- [ ] Анимации работают плавно
- [ ] Loading состояния обработаны
- [ ] Ошибки отображаются пользователю

### ✅ Документация

- [ ] README.md заполнен
- [ ] Инструкции по запуску корректны
- [ ] Скриншоты добавлены
- [ ] Deployed версия доступна

---

## Удачи в выполнении задания! 🚀