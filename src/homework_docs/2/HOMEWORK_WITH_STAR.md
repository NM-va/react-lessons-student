# Практическое задание

## Задание: Комбинированная форма регистрации

Разработайте форму регистрации, которая использует как контролируемые, так и неконтролируемые компоненты.

### Требования

1. **Контролируемые поля:**
   - Email (с валидацией в реальном времени)
   - Пароль (с проверкой сложности)
   - Подтверждение пароля (с проверкой совпадения)

2. **Неконтролируемые поля:**
   - Аватар (загрузка файла)
   - Согласие с условиями (чекбокс)

3. Форма должна отображать ошибки валидации в реальном времени для контролируемых полей
4. Кнопка отправки должна быть неактивна, если форма содержит ошибки
5. При отправке формы данные должны выводиться в консоль

### Шаблон для задания

```jsx
import React, { useState, useRef } from 'react';

function RegistrationForm() {
  // Состояния для контролируемых полей
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Состояния для ошибок
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  
  // Refs для неконтролируемых полей
  const avatarRef = useRef(null);
  const termsRef = useRef(null);
  
  // TODO: Реализуйте валидацию полей
  
  // TODO: Реализуйте обработчики изменений
  
  // TODO: Реализуйте обработчик отправки формы
  
  return (
    <form onSubmit={/* Обработчик отправки */}>
      {/* TODO: Реализуйте контролируемые поля (email, password, confirmPassword) */}
      
      {/* TODO: Реализуйте неконтролируемые поля (avatar, terms) */}
      
      <button type="submit" disabled={/* Проверка валидности формы */}>
        Зарегистрироваться
      </button>
    </form>
  );
}

export default RegistrationForm;
```
