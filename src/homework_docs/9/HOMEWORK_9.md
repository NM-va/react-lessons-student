# Домашнее задание 9: Создание хука useStepper для оформления заказа

## Цель задания

Создать переиспользуемый хук `useStepper` и применить его для реализации многошагового процесса оформления заказа в интернет-магазине.

## Техническое задание

### 1. Создание хука useStepper

Создайте пользовательский хук со следующими TypeScript интерфейсами:

```typescript
// Шаги как enum
enum CheckoutSteps {
    CART = 'cart',
    DELIVERY = 'delivery', 
    PAYMENT = 'payment',
    CONFIRMATION = 'confirmation'
}

// Enum для способов доставки
enum DeliveryMethods {
    COURIER = 'courier',
    PICKUP = 'pickup'
}

// Enum для способов оплаты
enum PaymentMethods {
    CARD = 'card',
    CASH = 'cash'
}

// Основной интерфейс хука useStepper
export interface Stepper<T extends string> {
    currentStep: T;                    // Текущий активный шаг
    nextStep: () => void;              // Переход к следующему шагу
    previousStep: () => void;          // Возврат к предыдущему шагу
    goToStep: (step: T) => void;       // Переход к конкретному шагу
    reset: () => void;                 // Сброс к первому шагу
    currentStepIndex: number;          // Индекс текущего шага
    totalSteps: number;                // Общее количество шагов
    isFirstStep: boolean;              // Является ли текущий шаг первым
    isLastStep: boolean;               // Является ли текущий шаг последним
    progress: number;                  // Прогресс в процентах (0-100)
}

// Простая конфигурация хука
export interface StepperConfig<T extends string> {
    steps: T[];                        // Массив шагов (enum values)
    initialStep?: T;                   // Начальный шаг (по умолчанию первый)
    onStepChange?: (step: T) => void;  // Колбэк при смене шага
    onComplete?: () => void;           // Колбэк при завершении
}

// Хук useStepper
export declare function useStepper<T extends string>(
    config: StepperConfig<T>
): Stepper<T>;
```

### 2. Упрощенная структура проекта

```
src/
  hooks/
    useStepper.ts              # Основной хук
    useLocalStorage.ts         # Хук для сохранения состояния
    
  components/
    StepIndicator.tsx          # Индикатор прогресса
    ProgressBar.tsx            # Прогресс-бар
    UniversalInput.tsx         # Универсальный компонент ввода
      
  types/
    checkout.ts                # Типы для заказа
    
  data/
    mockData.ts                # Тестовые данные
    
  CheckoutStepper.tsx          # Главный компонент
```

### 3. Функциональные требования

#### Шаг 1: Корзина (CART)

- Список из 3-5 товаров с количеством
- Изменение количества товаров
- Общая стоимость
- Валидация: корзина не пустая

#### Шаг 2: Доставка (DELIVERY)

- Выбор способа доставки (селект: DeliveryMethods.COURIER/PICKUP)
- Адрес доставки (текстовое поле)
- Валидация: все поля заполнены

#### Шаг 3: Оплата (PAYMENT)

- Выбор способа оплаты (радио: PaymentMethods.CARD/CASH)
- Номер карты (если PaymentMethods.CARD)
- Валидация: способ выбран, карта заполнена

#### Шаг 4: Подтверждение (CONFIRMATION)

- Итоговая информация
- Кнопка "Оформить заказ"
- Показ номера заказа

### 4. Упрощенные типы данных с enum

```typescript
// Товар
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// Данные доставки с enum
interface DeliveryData {
    method: DeliveryMethods;
    address: string;
}

// Данные оплаты с enum
interface PaymentData {
    method: PaymentMethods;
    cardNumber?: string;
}

// Заказ
interface Order {
    products: Product[];
    delivery: DeliveryData;
    payment: PaymentData;
    total: number;
}
```

### 5. Технические требования

#### Обязательные

- **Хук useStepper** согласно интерфейсу
- **Enum для всех типов** (CheckoutSteps, DeliveryMethods, PaymentMethods)
- **Валидация** блокирует переход при ошибках
- **localStorage** сохранение состояния
- **TypeScript** без any
- **Адаптивная верстка**

#### Дополнительные (бонус)

- **Анимации переходов** (+10%)
- **Тесты для хука** (+10%)

### 6. UI требования

- **Индикатор шагов** с номерами 1-4
- **Прогресс-бар** показывает процент
- **Кнопки навигации** Назад/Далее
- **Валидация** с сообщениями об ошибках

### 7. Тестовые данные с enum

```typescript
// 5 товаров в корзине
const mockProducts = [
    { id: 1, name: 'iPhone 14', price: 999, quantity: 1 },
    { id: 2, name: 'MacBook Pro', price: 1999, quantity: 1 },
    { id: 3, name: 'AirPods', price: 199, quantity: 2 },
    { id: 4, name: 'iPad', price: 599, quantity: 1 },
    { id: 5, name: 'Apple Watch', price: 399, quantity: 1 }
];

// Способы доставки с enum
const deliveryOptions = [
    { value: DeliveryMethods.COURIER, label: 'Курьер (+200₽)' },
    { value: DeliveryMethods.PICKUP, label: 'Самовывоз (бесплатно)' }
];

// Способы оплаты с enum
const paymentOptions = [
    { value: PaymentMethods.CARD, label: 'Банковская карта' },
    { value: PaymentMethods.CASH, label: 'Наличными при получении' }
];
```

### 8. Критерии оценки

#### Базовый уровень (70%)

- Хук useStepper работает
- Все enum правильно используются
- Все 4 шага реализованы
- Валидация блокирует переходы
- Сохранение в localStorage

#### Средний уровень (85%)

- Хорошая типизация TypeScript
- Адаптивная верстка
- Обработка ошибок

#### Продвинутый уровень (100%)

- Отличный UX и дизайн
- Все требования выполнены качественно

### 9. Упрощенная сдача

**Срок:** 1 неделя

**Формат:**

- GitHub репозиторий
- Демо ссылка (Vercel/Netlify)
- README с инструкцией запуска

### 10. Подсказки

💡 **Начните с enum** для всех типов данных  
💡 **Создайте хук** перед компонентами  
💡 **Используйте Object.values(CheckoutSteps)** для получения массива шагов  
💡 **Валидируйте enum значения** в switch case  
💡 **Тестируйте типизацию** - TypeScript должен подсказывать варианты  

### 11. Пример использования хука с enum

```typescript
const steps = Object.values(CheckoutSteps);

const stepper = useStepper({
    steps,
    onStepChange: (step) => console.log('Переход на:', step),
    onComplete: () => console.log('Заказ оформлен!')
});

// Типобезопасное использование
const renderStepContent = () => {
    switch (stepper.currentStep) {
        case CheckoutSteps.CART:
            return <CartForm />;
        case CheckoutSteps.DELIVERY:
            return <DeliveryForm />;
        case CheckoutSteps.PAYMENT:
            return <PaymentForm />;
        case CheckoutSteps.CONFIRMATION:
            return <ConfirmationForm />;
        default:
            return null; // TypeScript проверит все случаи
    }
};

// Валидация с enum
const validateStep = (step: CheckoutSteps): boolean => {
    switch (step) {
        case CheckoutSteps.CART:
            return cartItems.length > 0;
        case CheckoutSteps.DELIVERY:
            return deliveryData.method !== null && deliveryData.address.length > 0;
        case CheckoutSteps.PAYMENT:
            return paymentData.method !== null && 
                   (paymentData.method === PaymentMethods.CASH || paymentData.cardNumber?.length > 0);
        default:
            return true;
    }
};
```

### 12. Преимущества использования enum

✅ **Типобезопасность** - TypeScript проверит все варианты  
✅ **Автодополнение** - IDE подскажет доступные значения  
✅ **Рефакторинг** - легко переименовать значения  
✅ **Читаемость** - код становится более понятным  
✅ **Валидация** - impossible states становятся impossible  

---

**Успехов! Фокус на качественном использовании enum и типизации TypeScript.**
