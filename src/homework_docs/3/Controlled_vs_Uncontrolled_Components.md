---
tags: react, forms, components
created: "2025-04-22"
updated: 2025-04-22
id: "react-form-components"
---
# Контролируемые и неконтролируемые компоненты в React

## Оглавление

- [Введение](#введение)
- [Контролируемые компоненты](#контролируемые-компоненты)
- [Неконтролируемые компоненты](#неконтролируемые-компоненты)
- [Сравнение подходов](#сравнение-подходов)
- [Гибридный подход](#гибридный-подход)
- [Лучшие практики](#лучшие-практики)
- [Типичные задачи и решения](#типичные-задачи-и-решения)
- [Заключение](#заключение)

---

## Введение

В React существует два принципиально разных подхода к работе с формами и элементами ввода: **контролируемые** и **неконтролируемые** компоненты. Выбор между этими подходами зависит от требований к компоненту, сложности формы и предпочтений команды разработчиков.

> "В большинстве случаев мы рекомендуем использовать контролируемые компоненты для форм. В контролируемом компоненте данные формы обрабатываются компонентом React. Альтернативой являются неконтролируемые компоненты, где данные формы обрабатываются самим DOM."
>
> — Официальная документация React

### Ключевые различия

| Аспект | Контролируемые | Неконтролируемые |
|--------|----------------|------------------|
| Источник истины | React состояние | DOM |
| Обновление UI | Через setState | Обновляет браузер |
| Чтение значений | Из состояния компонента | Через refs |
| Типичное использование | Сложные формы с валидацией | Простые формы, загрузка файлов |

---

## Контролируемые компоненты

### Что такое контролируемый компонент?

Контролируемый компонент — это компонент формы, в котором React контролирует то, что отображается в форме. Состояние элемента формы хранится в состоянии компонента React и обновляется через обработчики событий.

### Принцип работы

1. Значение элемента ввода привязано к состоянию React через `value` или `checked`
2. Пользователь вводит данные → срабатывает событие (например, `onChange`)
3. Обработчик обновляет состояние через `setState`
4. Компонент перерисовывается с новым значением

### Пример контролируемого компонента

```jsx
import React, { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');
  
  function handleChange(event) {
    setValue(event.target.value);
  }
  
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <p>Текущее значение: {value}</p>
    </div>
  );
}
```

### Преимущества контролируемых компонентов

1. **Полный контроль над данными формы**
   - Значения всегда точно соответствуют состоянию React
   - Возможность программно изменять значения в любой момент

2. **Мгновенная валидация и форматирование**
   - Проверка ввода при каждом изменении
   - Форматирование данных (например, маски ввода)

3. **Динамические зависимости между полями**
   - Легко создавать поля, зависящие от значений других полей

4. **Условная логика**
   - Показ или скрытие элементов на основе текущих значений

5. **Удобство в работе с формами**
   - Централизованный доступ ко всем значениям при отправке
   - Упрощенное тестирование через проверку состояния

### Недостатки контролируемых компонентов

1. **Многословность**
   - Требуется больше кода для реализации простых форм
   - Для каждого поля необходимо состояние и обработчик

2. **Производительность**
   - При каждом вводе происходит ререндер компонента
   - Может быть критично для очень сложных форм с множеством полей

3. **Сложность интеграции**
   - Некоторые сторонние библиотеки сложно интегрировать как контролируемые

### Типичные случаи использования

- Формы с валидацией при вводе
- Интерактивные компоненты (поиск, фильтры, калькуляторы)
- Мастера форм с многими шагами
- Формы с зависимыми полями
- Реализация автозаполнения или автоматических подсказок

---

## Неконтролируемые компоненты

### Что такое неконтролируемый компонент?

Неконтролируемый компонент — это компонент формы, где состояние элемента управляется самим DOM, а не компонентом React. React не контролирует то, что пользователь видит в форме, а доступ к значениям осуществляется через refs.

### Принцип работы

1. React создает начальный рендер с помощью `defaultValue` или `defaultChecked`
2. Пользователь вводит данные → DOM обновляет значение поля
3. При необходимости React получает текущее значение через ref

### Пример неконтролируемого компонента

```jsx
import React, { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef(null);
  
  function handleSubmit(event) {
    event.preventDefault();
    alert('Введенное значение: ' + inputRef.current.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue="Начальное значение"
        ref={inputRef}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Преимущества неконтролируемых компонентов

1. **Простота реализации**
   - Меньше кода для базовых форм
   - Быстрее писать и отлаживать

2. **Производительность**
   - Меньше ререндеров, так как React не отслеживает каждое изменение
   - Лучше работает с большими формами

3. **Совместимость**
   - Легче интегрировать с не-React кодом
   - Лучше работает с некоторыми сторонними библиотеками

4. **Загрузка файлов**
   - Единственный способ работать с `<input type="file">`

### Недостатки неконтролируемых компонентов

1. **Меньше контроля**
   - Сложнее управлять значениями программно
   - Нет централизованного доступа к значениям

2. **Ограниченная валидация**
   - Валидация обычно происходит при отправке, а не при вводе
   - Сложнее реализовать мгновенную обратную связь

3. **Непредсказуемость**
   - Значения могут не соответствовать ожидаемому состоянию
   - Сложнее отслеживать текущее состояние формы

4. **Сложность тестирования**
   - Требуется больше манипуляций с DOM в тестах

### Типичные случаи использования

- Простые формы без сложной валидации
- Формы для загрузки файлов
- Интеграция с нативными DOM API или сторонними библиотеками
- Миграция существующих HTML форм в React
- Простые формы с одним шагом

---

## Сравнение подходов

### Контролируемые компоненты

```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    // Валидация при каждом изменении
    setIsValid(name.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [name, email]);
  
  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      console.log('Отправка:', { name, email });
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={!isValid}>Отправить</button>
      {!isValid && <p>Пожалуйста, заполните все поля корректно</p>}
    </form>
  );
}
```

### Неконтролируемые компоненты

```jsx
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  
  function handleSubmit(event) {
    event.preventDefault();
    
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    
    // Валидация при отправке
    if (name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Отправка:', { name, email });
    } else {
      alert('Пожалуйста, заполните все поля корректно');
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input defaultValue="" ref={nameRef} />
      <input defaultValue="" ref={emailRef} />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Ключевые различия на практике

| Функциональность | Контролируемые | Неконтролируемые |
|-----------------|----------------|------------------|
| Доступ к значениям | `value` из состояния | `ref.current.value` |
| Начальное значение | `value="..."` | `defaultValue="..."` |
| Программное изменение | `setValue(...)` | `ref.current.value = ...` |
| Валидация | При каждом изменении | Обычно при отправке |
| Подробный контроль | Высокий | Ограниченный |

---

## Гибридный подход

В реальных приложениях часто используется комбинированный подход, где часть полей контролируемые, а часть — неконтролируемые.

### Когда имеет смысл комбинирование

1. Для загрузки файлов (всегда неконтролируемые) вместе с другими полями
2. Для простых полей, не требующих валидации (неконтролируемые)
3. Для полей с валидацией или динамическими зависимостями (контролируемые)

### Пример гибридного подхода

```jsx
function HybridForm() {
  // Контролируемые поля с валидацией
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  // Неконтролируемые поля
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail) || newEmail === '');
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    // Получение значений из обоих типов полей
    const name = nameRef.current.value;
    const file = fileRef.current.files[0];
    
    if (!name) {
      alert('Пожалуйста, введите имя');
      return;
    }
    
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    
    console.log('Отправка формы:', { name, email, file });
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Неконтролируемое поле */}
      <div>
        <label htmlFor="name">Имя:</label>
        <input id="name" type="text" ref={nameRef} defaultValue="" />
      </div>
      
      {/* Контролируемое поле с валидацией */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={isEmailValid ? '' : 'error'}
        />
        {!isEmailValid && <p className="error-text">Некорректный email</p>}
      </div>
      
      {/* Неконтролируемое поле для файла */}
      <div>
        <label htmlFor="file">Файл:</label>
        <input id="file" type="file" ref={fileRef} />
      </div>
      
      <button type="submit">Отправить</button>
    </form>
  );
}
```

---

## Лучшие практики

### Для контролируемых компонентов

1. **Разделение логики и UI**
   - Выносите логику валидации и форматирования в отдельные функции
   - Используйте кастомные хуки для повторного использования логики форм

2. **Оптимизация производительности**
   - Используйте дебаунс для предотвращения частых обновлений состояния
   - Группируйте обновления состояния, если возможно

3. **Структурирование состояния**
   - Для простых форм используйте отдельные состояния для каждого поля
   - Для сложных форм рассмотрите единый объект состояния с useReducer

4. **Обработка ошибок**
   - Храните состояние ошибок рядом с состоянием полей
   - Отображайте сообщения об ошибках рядом с соответствующими полями

### Для неконтролируемых компонентов

1. **Именование refs**
   - Используйте понятные имена для refs, соответствующие полям
   - Добавляйте префикс "ref" для отличия (например, emailRef)

2. **Доступ к DOM-узлам**
   - Проверяйте наличие ref.current перед использованием
   - Используйте useEffect для работы с refs после монтирования

3. **Инициализация**
   - Используйте атрибут `defaultValue` вместо `value`
   - Для чекбоксов используйте `defaultChecked` вместо `checked`

4. **Валидация**
   - Реализуйте четкую стратегию валидации при отправке формы
   - Рассмотрите использование HTML5 валидации (required, pattern и т.д.)

### Общие рекомендации

1. **Выбор подхода**
   - Предпочитайте контролируемые компоненты для большинства случаев
   - Используйте неконтролируемые для простых форм и загрузки файлов

2. **Доступность (a11y)**
   - Всегда связывайте labels с полями ввода (htmlFor)
   - Используйте aria-атрибуты для дополнительной информации

3. **Обработка отправки**
   - Всегда предотвращайте стандартное поведение формы (preventDefault)
   - Выполняйте финальную валидацию перед отправкой данных

4. **Тестирование**
   - Пишите тесты для обоих типов компонентов
   - Для неконтролируемых компонентов используйте инструменты, имитирующие DOM

---

## Типичные задачи и решения

### Маски ввода (контролируемый подход)

```jsx
function PhoneInput() {
  const [phone, setPhone] = useState('');
  
  function formatPhone(value) {
    // Удаляем все нецифровые символы
    const digits = value.replace(/\D/g, '');
    
    // Форматируем как (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  }
  
  function handleChange(e) {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  }
  
  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      placeholder="(XXX) XXX-XXXX"
    />
  );
}
```

### Загрузка файлов (неконтролируемый подход)

```jsx
function FileUpload() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  
  function handleFileChange() {
    if (fileInputRef.current.files.length > 0) {
      setFileName(fileInputRef.current.files[0].name);
    } else {
      setFileName('');
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (!fileInputRef.current.files.length) {
      alert('Пожалуйста, выберите файл');
      return;
    }
    
    const file = fileInputRef.current.files[0];
    console.log('Загрузка файла:', file.name, file.size);
    
    // Здесь обычно идет отправка на сервер
    // const formData = new FormData();
    // formData.append('file', file);
    // fetch('/upload', { method: 'POST', body: formData });
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
      {fileName && <p>Выбран файл: {fileName}</p>}
      <button type="submit">Загрузить</button>
    </form>
  );
}
```

### Динамические формы (контролируемый подход)

```jsx
function DynamicForm() {
  const [fields, setFields] = useState([{ id: 1, value: '' }]);
  
  function addField() {
    const newId = fields.length > 0 
      ? Math.max(...fields.map(f => f.id)) + 1 
      : 1;
    
    setFields([...fields, { id: newId, value: '' }]);
  }
  
  function removeField(id) {
    setFields(fields.filter(field => field.id !== id));
  }
  
  function updateField(id, value) {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Отправка данных:', fields.map(f => f.value));
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.id} className="field-row">
          <input
            value={field.value}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={`Поле ${field.id}`}
          />
          <button 
            type="button" 
            onClick={() => removeField(field.id)}
            disabled={fields.length <= 1}
          >
            Удалить
          </button>
        </div>
      ))}
      
      <button type="button" onClick={addField}>Добавить поле</button>
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Работа с выпадающими списками (контролируемый подход)

```jsx
function CountrySelector() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  
  // Предположим, что у нас есть объект с регионами по странам
  const regionsByCountry = {
    'usa': ['Калифорния', 'Техас', 'Нью-Йорк', 'Флорида'],
    'canada': ['Онтарио', 'Квебек', 'Британская Колумбия'],
    'germany': ['Бавария', 'Берлин', 'Гамбург', 'Саксония']
  };
  
  // Доступные регионы для выбранной страны
  const availableRegions = country ? regionsByCountry[country] || [] : [];
  
  function handleCountryChange(e) {
    const newCountry = e.target.value;
    setCountry(newCountry);
    // Сбрасываем регион при
