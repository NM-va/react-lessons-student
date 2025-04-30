import React, { useState, useRef } from 'react';
import { DemoComponent } from '../components/DemoComponent';

// Базовый пример контролируемого компонента
const SimpleControlledInput: React.FC = () => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="demo-area">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Контролируемый ввод"
            />
            <p>Введенный текст: {value}</p>
        </div>
    );
};

// Базовый пример неконтролируемого компонента
const SimpleUncontrolledInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState('');

    const handleButtonClick = () => {
        if (inputRef.current) {
            setDisplayValue(inputRef.current.value);
        }
    };

    return (
        <div className="demo-area">
            <input
                type="text"
                ref={inputRef}
                defaultValue=""
                placeholder="Неконтролируемый ввод"
            />
            <button onClick={handleButtonClick}>Получить значение</button>
            <p>Полученное значение: {displayValue}</p>
        </div>
    );
};

// Пример неполного решения для домашнего задания
const ComboComponent: React.FC = () => {
    // Контролируемое состояние
    const [controlledValue, setControlledValue] = useState('');

    // Ref для неконтролируемого доступа
    const inputRef = useRef<HTMLInputElement>(null);

    // TODO: Здесь студенту нужно реализовать комбинированную логику

    return (
        <div className="demo-area">
            <h3>Комбинированный компонент (заготовка)</h3>
            <input
                type="text"
                value={controlledValue}
                onChange={(e) => setControlledValue(e.target.value)}
                ref={inputRef}
                placeholder="Введите текст"
            />
            <div className="controls">
                <button>Использовать как контролируемый</button>
                <button>Использовать как неконтролируемый</button>
            </div>
            <div className="result">
                <p>Результат будет отображаться здесь</p>
            </div>
        </div>
    );
};


const Exercise3: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="exercise-container">
            <h1>Лекция 3: Контролируемые и неконтролируемые компоненты</h1>

            <div className="exercise-tabs">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Обзор
                    </div>
                    <div
                        className={`tab ${activeTab === 'controlled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('controlled')}
                    >
                        Контролируемые
                    </div>
                    <div
                        className={`tab ${activeTab === 'uncontrolled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('uncontrolled')}
                    >
                        Неконтролируемые
                    </div>
                    <div
                        className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comparison')}
                    >
                        Сравнение
                    </div>
                    <div
                        className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
                        onClick={() => setActiveTab('practice')}
                    >
                        Практика
                    </div>
                    <div
                        className={`tab ${activeTab === 'homework' ? 'active' : ''}`}
                        onClick={() => setActiveTab('homework')}
                    >
                        Домашнее задание
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-content">
                            <h2>Контролируемые и неконтролируемые компоненты в React</h2>
                            <p>
                                В React существует два основных подхода к работе с элементами форм, такими как input, textarea, select и другие:
                            </p>
                            <ul>
                                <li><strong>Контролируемые компоненты (Controlled Components)</strong> - состояние элемента формы контролируется React через состояние (state)</li>
                                <li><strong>Неконтролируемые компоненты (Uncontrolled Components)</strong> - состояние элемента формы хранится в DOM, а доступ осуществляется через ref</li>
                            </ul>
                            <p>
                                Эти два подхода имеют разные преимущества и используются в различных сценариях. В этой лекции мы рассмотрим оба подхода,
                                их различия, преимущества и недостатки, а также научимся выбирать подходящий вариант для конкретной задачи.
                            </p>

                            <div className="tip-box">
                                <h3>Ключевое различие</h3>
                                <p>
                                    В контролируемых компонентах React является <strong>"источником истины"</strong> для состояния формы.
                                    В неконтролируемых компонентах DOM является <strong>"источником истины"</strong>.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'controlled' && (
                        <div className="controlled-content">
                            <h2>Контролируемые компоненты</h2>
                            <p>
                                Контролируемый компонент - это компонент формы, значение которого контролируется React через состояние (state).
                                При каждом изменении в поле ввода, React обновляет состояние, что делает React "источником истины" для данных формы.
                            </p>

                            <h3>Основные характеристики:</h3>
                            <ul>
                                <li>Значения элементов формы хранятся в React состоянии</li>
                                <li>Используют свойства value/checked и обработчики событий onChange</li>
                                <li>Обновление UI происходит при обновлении состояния</li>
                                <li>Удобны для валидации при вводе и форматирования данных</li>
                            </ul>

                            <h3>Пример контролируемого компонента:</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Контролируемый компонент</div>
                                <pre>
                                    {`import React, { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <p>Введенный текст: {value}</p>
    </div>
  );
}`}
                                </pre>
                            </div>

                            <h3>Преимущества:</h3>
                            <ul>
                                <li>Полный контроль над вводом пользователя</li>
                                <li>Мгновенная валидация и форматирование</li>
                                <li>Легко реализовать зависимости между полями</li>
                                <li>Упрощенное тестирование</li>
                                <li>Соответствует "React-way" разработки</li>
                            </ul>

                            <h3>Недостатки:</h3>
                            <ul>
                                <li>Требуется больше кода для базовых случаев</li>
                                <li>Больше ререндеров (при каждом вводе)</li>
                                <li>Сложнее интегрировать с некоторыми сторонними библиотеками</li>
                            </ul>

                            <h3>Живой пример:</h3>
                            <SimpleControlledInput />

                        </div>
                    )}

                    {activeTab === 'uncontrolled' && (
                        <div className="uncontrolled-content">
                            <h2>Неконтролируемые компоненты</h2>
                            <p>
                                Неконтролируемый компонент - это компонент формы, значение которого хранится в DOM, а не в React состоянии.
                                React использует ссылки (refs) для доступа к значениям формы, что делает DOM "источником истины".
                            </p>

                            <h3>Основные характеристики:</h3>
                            <ul>
                                <li>Значения элементов формы хранятся в DOM</li>
                                <li>Используют defaultValue/defaultChecked вместо value/checked</li>
                                <li>Доступ к значениям через ref</li>
                                <li>Меньше кода для простых форм</li>
                                <li>Идеальны для загрузки файлов (input type="file")</li>
                            </ul>

                            <h3>Пример неконтролируемого компонента:</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Неконтролируемый компонент</div>
                                <pre>
                                    {`import React, { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    // Получение текущего значения из DOM
    alert('Введенное значение: ' + inputRef.current.value);
  };
  
  return (
    <div>
      <input
        type="text"
        defaultValue=""
        ref={inputRef}
      />
      <button onClick={handleClick}>
        Показать значение
      </button>
    </div>
  );
}`}
                                </pre>
                            </div>

                            <h3>Преимущества:</h3>
                            <ul>
                                <li>Меньше кода для простых случаев</li>
                                <li>Меньше ререндеров (лучшая производительность)</li>
                                <li>Проще интегрировать с внешними библиотеками</li>
                                <li>Единственный способ для загрузки файлов</li>
                            </ul>

                            <h3>Недостатки:</h3>
                            <ul>
                                <li>Сложнее контролировать ввод пользователя</li>
                                <li>Валидация обычно при отправке, а не при вводе</li>
                                <li>Сложнее создавать зависимости между полями</li>
                                <li>Сложнее тестировать</li>
                            </ul>

                            <h3>Живой пример:</h3>
                            <SimpleUncontrolledInput />
                        </div>
                    )}

                    {activeTab === 'comparison' && (
                        <div className="comparison-content">
                            <h2>Сравнение подходов</h2>

                            <div className="comparison-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Характеристика</th>
                                            <th>Контролируемые</th>
                                            <th>Неконтролируемые</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Источник истины</td>
                                            <td>React состояние</td>
                                            <td>DOM</td>
                                        </tr>
                                        <tr>
                                            <td>Доступ к значениям</td>
                                            <td>Через состояние (напр. value)</td>
                                            <td>Через refs (напр. inputRef.current.value)</td>
                                        </tr>
                                        <tr>
                                            <td>Атрибуты</td>
                                            <td>value, checked</td>
                                            <td>defaultValue, defaultChecked</td>
                                        </tr>
                                        <tr>
                                            <td>Обработчики событий</td>
                                            <td>Требуются (onChange)</td>
                                            <td>Опциональны</td>
                                        </tr>
                                        <tr>
                                            <td>Валидация</td>
                                            <td>При каждом изменении</td>
                                            <td>Обычно при отправке</td>
                                        </tr>
                                        <tr>
                                            <td>Синхронизация UI</td>
                                            <td>Автоматическая</td>
                                            <td>Требует ручного обновления</td>
                                        </tr>
                                        <tr>
                                            <td>Количество кода</td>
                                            <td>Больше</td>
                                            <td>Меньше</td>
                                        </tr>
                                        <tr>
                                            <td>Производительность</td>
                                            <td>Больше ререндеров</td>
                                            <td>Меньше ререндеров</td>
                                        </tr>
                                        <tr>
                                            <td>Загрузка файлов</td>
                                            <td>Не подходит</td>
                                            <td>Идеально подходит</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>Когда использовать контролируемые компоненты:</h3>
                            <ul>
                                <li>Требуется мгновенная валидация при вводе</li>
                                <li>Есть зависимости между полями формы</li>
                                <li>Нужно динамически изменять доступные опции</li>
                                <li>Требуется форматирование данных при вводе</li>
                                <li>Сложные формы с множеством полей и состояний</li>
                            </ul>

                            <h3>Когда использовать неконтролируемые компоненты:</h3>
                            <ul>
                                <li>Загрузка файлов</li>
                                <li>Простые формы без сложной валидации</li>
                                <li>Интеграция со сторонними DOM-библиотеками</li>
                                <li>Миграция существующего HTML-кода в React</li>
                                <li>Критична производительность при вводе</li>
                            </ul>

                            <div className="tip-box">
                                <h3>Рекомендация React</h3>
                                <p>
                                    Официальная документация React рекомендует использовать контролируемые компоненты в большинстве случаев.
                                    Однако неконтролируемые компоненты имеют свои законные случаи применения и не считаются "антипаттерном".
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'practice' && (
                        <div className="practice-content">
                            <h2>Практические примеры</h2>

                            <h3>Пример 1: Форма с мгновенной валидацией (контролируемый подход)</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Контролируемая форма с валидацией</div>
                                <pre>
                                    {`import React, { useState } from 'react';

function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateEmail = (value) => {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!value) {
      return 'Email обязателен';
    } else if (!re.test(value)) {
      return 'Некорректный формат email';
    }
    return '';
  };
  
  const validatePassword = (value) => {
    if (!value) {
      return 'Пароль обязателен';
    } else if (value.length < 8) {
      return 'Пароль должен содержать не менее 8 символов';
    }
    return '';
  };
  
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailError(validateEmail(newValue));
  };
  
  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(validatePassword(newValue));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);
    
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    
    if (!newEmailError && !newPasswordError) {
      alert('Форма отправлена!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      
      <button type="submit">Войти</button>
    </form>
  );
}`}
                                </pre>
                            </div>

                            <h3>Пример 2: Загрузка файлов (неконтролируемый подход)</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Загрузка файлов</div>
                                <pre>
                                    {`import React, { useRef, useState } from 'react';

function FileUploader() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  
  const handleFileChange = () => {
    const fileInput = fileInputRef.current;
    
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setFileName(file.name);
      
      // Форматирование размера файла
      const size = file.size;
      if (size < 1024) {
        setFileSize(\`\${size} байт\`);
      } else if (size < 1024 * 1024) {
        setFileSize(\`\${(size / 1024).toFixed(2)} КБ\`);
      } else {
        setFileSize(\`\${(size / (1024 * 1024)).toFixed(2)} МБ\`);
      }
    } else {
      setFileName('');
      setFileSize('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fileInputRef.current.files.length) {
      alert('Пожалуйста, выберите файл');
      return;
    }
    
    alert(\`Загрузка файла "\${fileName}" (\${fileSize})\`);
    // В реальном приложении здесь была бы отправка на сервер
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Выберите файл:</label>
        <input
          id="file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      
      {fileName && (
        <div className="file-info">
          <p>Выбран файл: {fileName}</p>
          <p>Размер: {fileSize}</p>
        </div>
      )}
      
      <button type="submit">Загрузить</button>
    </form>
  );
}`}
                                </pre>
                            </div>

                            <h3>Пример 3: Гибридный подход</h3>
                            <div className="code-editor">
                                <div className="code-block-title">Гибридный подход</div>
                                <pre>
                                    {`import React, { useState, useRef } from 'react';

function HybridForm() {
  // Контролируемое состояние для полей с валидацией
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  // Refs для неконтролируемых полей
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  
  const validateEmail = (email) => {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
  };
  
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail) || newEmail === '');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Получение данных из обоих типов полей
    const name = nameRef.current.value;
    const file = fileRef.current.files[0];
    
    // Валидация
    if (!name) {
      alert('Пожалуйста, введите имя');
      return;
    }
    
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    
    // Отправка данных
    alert(\`Форма отправлена:
Имя: \${name}
Email: \${email}
Файл: \${file ? file.name : 'не выбран'}\`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Неконтролируемое поле без валидации */}
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue=""
        />
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
        {!isEmailValid && <div className="error-message">Некорректный email</div>}
      </div>
      
      {/* Неконтролируемое поле для файла */}
      <div>
        <label htmlFor="file">Файл:</label>
        <input
          id="file"
          type="file"
          ref={fileRef}
        />
      </div>
      
      <button type="submit">Отправить</button>
    </form>
  );
}`}
                                </pre>
                            </div>

                            <div className="tip-box">
                                <h3>Важный момент</h3>
                                <p>
                                    React не рекомендует смешивать контролируемые и неконтролируемые атрибуты для одного и того же поля.
                                    Например, не используйте одновременно <code>value</code> и <code>ref</code> без <code>onChange</code> для одного input.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'homework' && (
                        <div className="homework-content">
                            <h2>Домашнее задание: Универсальный компонент ввода</h2>
                            <p>
                                Вашей задачей будет создать универсальный компонент ввода, который может работать
                                как в контролируемом, так и в неконтролируемом режиме, в зависимости от переданных пропсов.
                            </p>

                            <h3>Требования:</h3>
                            <ol>
                                <li>Создайте компонент <code>UniversalInput</code>, который:</li>
                                <ul>
                                    <li>Работает как контролируемый компонент, если передан проп <code>value</code> и <code>onChange</code></li>
                                    <li>Работает как неконтролируемый компонент, если не передан проп <code>value</code></li>
                                    <li>Поддерживает все стандартные атрибуты input (placeholder, type, disabled и т.д.)</li>
                                    <li>Предоставляет доступ к DOM-элементу через <code>ref</code></li>
                                </ul>
                                <li>Создайте демо-компонент, демонстрирующий работу <code>UniversalInput</code> в обоих режимах</li>
                                <li>Добавьте валидацию для контролируемого режима и отображение ошибок</li>
                                <li>Реализуйте возможность программного управления фокусом через ref</li>
                                <li>Напишите понятные комментарии, объясняющие ваш код</li>
                            </ol>

                            <h3>Шаблон для начала работы:</h3>
                            <div className="code-editor">
                                <div className="code-block-title">UniversalInput.js</div>
                                <pre>
                                    {`import React, { useRef, useEffect } from 'react';

// Универсальный компонент ввода, работающий как контролируемый или неконтролируемый
function UniversalInput({ 
  value, 
  onChange,
  defaultValue = '',
  // Добавьте другие необходимые пропсы
  ...props 
}) {
  const inputRef = useRef(null);
  
  // Определяем, является ли компонент контролируемым
  const isControlled = value !== undefined && onChange !== undefined;
  
  // TODO: Реализуйте логику компонента
  
  return (
    <input
      ref={inputRef}
      // TODO: Добавьте правильные пропсы в зависимости от режима
      {...props}
    />
  );
}

export default UniversalInput;`}
                                </pre>
                            </div>

                            <div className="code-editor">
                                <div className="code-block-title">DemoComponent.js</div>
                                <pre>
                                    {`import React, { useState, useRef } from 'react';
import UniversalInput from './UniversalInput';

function DemoComponent() {
  // Состояние для контролируемого режима
  const [controlledValue, setControlledValue] = useState('');
  
  // Ref для доступа к неконтролируемому инпуту
  const uncontrolledInputRef = useRef(null);
  
  // Ref для доступа к универсальному инпуту в неконтролируемом режиме
  const universalUncontrolledRef = useRef(null);
  
  // TODO: Реализуйте демо-компонент, показывающий работу UniversalInput
  // в обоих режимах: контролируемом и неконтролируемом
  
  return (
    <div className="demo-container">
      <h2>Демонстрация UniversalInput</h2>
      
      {/* Контролируемый режим */}
      <div className="input-section">
        <h3>Контролируемый режим</h3>
        {/* TODO: Добавьте UniversalInput в контролируемом режиме */}
      </div>
      
      {/* Неконтролируемый режим */}
      <div className="input-section">
        <h3>Неконтролируемый режим</h3>
        {/* TODO: Добавьте UniversalInput в неконтролируемом режиме */}
      </div>
      
      {/* Элементы управления */}
      <div className="controls">
        {/* TODO: Добавьте кнопки для демонстрации функциональности */}
      </div>
    </div>
  );
}

export default DemoComponent;`}
                                </pre>
                            </div>

                            <h3>Рекомендации:</h3>
                            <ul>
                                <li>Используйте <code>forwardRef</code> для корректной работы с ссылками</li>
                                <li>Проверяйте значения пропсов для определения режима работы</li>
                                <li>Не забудьте о проверке типов (с помощью PropTypes или TypeScript)</li>
                                <li>Обратите внимание на правильное использование <code>defaultValue</code> в неконтролируемом режиме</li>
                                <li>Избегайте предупреждений React о переходе между контролируемым и неконтролируемым компонентом</li>
                            </ul>

                            <h3>Пример работы готового решения:</h3>
                            <ComboComponent />
                            <DemoComponent />

                            <div className="tip-box">
                                <h3>Подсказка</h3>
                                <p>
                                    Ключевой момент реализации - правильно определить, в каком режиме работает компонент,
                                    и передать соответствующие пропсы. При этом, остерегайтесь смешивания контролируемых и
                                    неконтролируемых атрибутов для одного элемента.
                                </p>
                            </div>

                            <h3>Критерии оценки:</h3>
                            <ol>
                                <li>Функциональная работа компонента в обоих режимах</li>
                                <li>Корректное определение режима работы</li>
                                <li>Обработка валидации и ошибок</li>
                                <li>Соблюдение лучших практик React</li>
                                <li>Качество и понятность кода</li>
                                <li>Наличие и качество комментариев</li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exercise3;