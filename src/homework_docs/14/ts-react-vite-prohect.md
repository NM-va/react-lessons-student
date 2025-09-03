# Домашнее задание: Настройка React + TypeScript + Vite проекта

## Цель задания

Самостоятельно создать и настроить современный React проект с использованием Vite, TypeScript, тестирования и линтинга. Это задание поможет вам освоить инструменты разработки и понять архитектуру проекта.

## Часть 1: Базовая настройка проекта

### Шаг 1: Создание проекта

1. Создайте новую папку для проекта:

   ```bash
   mkdir react-ts-project
   cd react-ts-project
   ```

2. Инициализируйте npm проект:

   ```bash
   npm init -y
   ```

3. Скопируйте все предоставленные файлы в соответствующие папки согласно структуре проекта.

### Шаг 2: Установка зависимостей

1. **Установите основные зависимости React:**

   ```bash
   npm install react react-dom
   ```

2. **Установите dev зависимости для сборки:**

   ```bash
   npm install -D @types/react @types/react-dom @vitejs/plugin-react vite typescript
   ```

3. **Установите зависимости для тестирования:**

   ```bash
   npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

4. **Установите ESLint и настройки для него:**

   ```bash
   npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refresh
   ```

### Шаг 3: Проверка работоспособности

1. **Запустите dev сервер:**

   ```bash
   npm run dev
   ```

   Убедитесь, что проект открывается в браузере на `http://localhost:3000`

2. **Проверьте линтинг:**

   ```bash
   npm run lint
   ```

3. **Запустите тесты:**

   ```bash
   npm run test
   ```

4. **Проверьте сборку:**

   ```bash
   npm run build
   ```

### ✅ Контрольные точки Части 1

- [ ] Проект запускается без ошибок
- [ ] Линтер работает и не показывает ошибок
- [ ] Тесты проходят успешно
- [ ] Проект собирается без ошибок

---

## Часть 2: Дополнительные настройки

### Шаг 4: Настройка VS Code (опционально)

Создайте папку `.vscode` в корне проекта и файл `settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

И файл `extensions.json`:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Шаг 5: Настройка Prettier (опционально)

1. Установите Prettier:

   ```bash
   npm install -D prettier
   ```

2. Создайте `.prettierrc`:

   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100,
     "endOfLine": "lf"
   }
   ```

3. Добавьте скрипт в package.json:

   ```json
   "scripts": {
     "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
   }
   ```

### Шаг 6: Настройка Husky (опционально, для продвинутых)

1. Установите husky и lint-staged:

   ```bash
   npm install -D husky lint-staged
   npm run prepare
   ```

2. Добавьте в package.json:

   ```json
   "lint-staged": {
     "src/**/*.{js,jsx,ts,tsx}": [
       "eslint --fix",
       "prettier --write"
     ]
   }
   ```

3. Создайте pre-commit хук:

   ```bash
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

---

## Часть 3: Практические задания

### Задание 3.1: Создайте компонент TodoList

Создайте файл `src/components/TodoList.tsx` с функционалом:

- Добавление новых задач
- Отметка задач как выполненных
- Удаление задач
- Фильтрация задач (все/активные/выполненные)

**Требования:**

- Используйте TypeScript интерфейсы
- Создайте пользовательский хук `useTodos`
- Добавьте стили в отдельный CSS файл

### Задание 3.2: Напишите тесты

Создайте тесты для:

- Компонента Counter (уже есть, проанализируйте)
- Хука useCounter
- Компонента TodoList
- Хука useTodos

**Требования:**

- Покрытие тестами должно быть > 80%
- Используйте разные типы тестов (unit, integration)

### Задание 3.3: Добавьте роутинг

1. Установите React Router:

   ```bash
   npm install react-router-dom
   npm install -D @types/react-router-dom
   ```

2. Создайте страницы:
   - Главная (`/`) - компонент Counter
   - Todo (`/todo`) - компонент TodoList
   - About (`/about`) - информация о проекте

3. Добавьте навигационное меню

---

## Часть 4: Продвинутые задания (бонус)

### Задание 4.1: Настройка абсолютных импортов

- Настройте алиасы в vite.config.ts и tsconfig.json
- Используйте `@/` для импорта из src
- Обновите существующий код для использования абсолютных импортов

### Задание 4.2: Добавьте стилизацию

Выберите один из вариантов:

- Tailwind CSS
- Styled-components  
- CSS Modules
- Emotion

### Задание 4.3: Интеграция с API

- Создайте сервис для работы с API (можно использовать JSONPlaceholder)
- Добавьте состояние загрузки и ошибок
- Реализуйте кэширование запросов

### Задание 4.4: Добавьте Storybook

1. Установите и настройте Storybook
2. Создайте stories для всех компонентов
3. Добавьте интерактивную документацию

---

## Критерии оценки

### Базовый уровень (зачет)

- ✅ Проект корректно настроен и запускается
- ✅ Все зависимости установлены
- ✅ Линтер настроен и работает без ошибок
- ✅ Тесты проходят успешно
- ✅ Проект собирается для продакшн

### Средний уровень (хорошо)

- ✅ Все пункты базового уровня
- ✅ Выполнено задание 3.1 (TodoList)
- ✅ Выполнено задание 3.2 (тесты)
- ✅ Выполнено задание 3.3 (роутинг)
- ✅ Код организован и читаем

### Продвинутый уровень (отлично)

- ✅ Все пункты среднего уровня
- ✅ Выполнено минимум 2 задания из части 4
- ✅ Настроены pre-commit хуки
- ✅ Добавлена документация и комментарии в коде
- ✅ Покрытие тестами > 90%

---

## Полезные команды для работы

```bash
# Разработка
npm run dev              # Запуск dev сервера
npm run build           # Сборка для продакшн
npm run preview         # Предварительный просмотр сборки

# Тестирование
npm run test            # Запуск тестов
npm run test:ui         # Запуск тестов с UI
npm run test:coverage   # Запуск тестов с покрытием

# Линтинг и форматирование
npm run lint            # Проверка линтером
npm run lint:fix        # Исправление ошибок линтера
npm run format          # Форматирование кода (если настроен Prettier)

# Проверка типов
npm run type-check      # Проверка TypeScript без сборки
```

---

## Troubleshooting (Решение проблем)

### Проблема: "Module not found" ошибки

**Решение:** Убедитесь, что:

- Все зависимости установлены (`npm install`)
- Пути в импортах корректны
- Алиасы правильно настроены в vite.config.ts и tsconfig.json

### Проблема: Тесты не запускаются

**Решение:**

- Проверьте, что jsdom установлен
- Убедитесь, что файл setup.ts существует и правильно настроен
- Проверьте настройки в vitest.config.ts

### Проблема: ESLint ошибки

**Решение:**

- Проверьте конфигурацию .eslintrc.json
- Убедитесь, что все плагины ESLint установлены
- Запустите `npm run lint:fix` для автоисправления

### Проблема: TypeScript ошибки

**Решение:**

- Проверьте настройки tsconfig.json
- Убедитесь, что все типы установлены (@types/...)
- Запустите `npm run type-check` для проверки

---

## Дополнительные материалы для изучения

### Документация

- [Vite](https://vitejs.dev/) - сборщик и dev сервер
- [Vitest](https://vitest.dev/) - тестирование
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [ESLint](https://eslint.org/docs/)

### Полезные ресурсы

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Modern React Testing](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vite + React Best Practices](https://vitejs.dev/guide/best-practices.html)

---

## Срок выполнения

**Дедлайн:** 2 недели с момента выдачи задания

**Формат сдачи:**

1. Загрузите проект на GitHub
2. Создайте README.md с инструкциями по запуску
3. Добавьте скриншоты работающего приложения
4. Опишите возникшие трудности и их решения

**Оценка:**

- Автоматическая проверка: линтинг, тесты, сборка
- Ручная проверка: качество кода, архитектура, выполнение заданий
- Защита: презентация проекта и ответы на вопросы

---

## Чек-лист перед сдачей

### Обязательно

- [ ] Проект запускается командой `npm run dev`
- [ ] Все тесты проходят (`npm run test`)
- [ ] Линтер не показывает ошибок (`npm run lint`)
- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] README.md с инструкциями создан
- [ ] Код загружен на GitHub

### Желательно

- [ ] Настроен Prettier
- [ ] Добавлены pre-commit хуки
- [ ] Покрытие тестами > 80%
- [ ] Компоненты имеют TypeScript типы
- [ ] Есть обработка ошибок

### Для продвинутого уровня

- [ ] Настроен роутинг
- [ ] Добавлена стилизация
- [ ] Интеграция с API
- [ ] Документация компонентов (Storybook или комментарии)

---

## Ответы на частые вопросы

**В: Можно ли использовать другие библиотеки?**
О: Да, но обоснуйте выбор и убедитесь, что они не конфликтуют с базовым стеком.

**В: Что делать, если тесты падают в CI/CD?**
О: Проверьте, что все зависимости указаны в package.json и тесты проходят локально.

**В: Можно ли изменить структуру проекта?**
О: Да, но сохраните основные принципы организации кода и добавьте описание в README.

**В: Как лучше организовать компоненты?**
О: Используйте принцип единой ответственности, создавайте переиспользуемые компоненты, группируйте по функциональности.

Удачи в выполнении задания! 🚀
