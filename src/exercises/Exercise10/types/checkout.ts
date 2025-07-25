// Шаги как enum
export enum CheckoutSteps {
  CART = 'cart',
  DELIVERY = 'delivery',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation'
}

// Enum для способов доставки
export enum DeliveryMethods {
  COURIER = 'courier',
  PICKUP = 'pickup'
}

// Enum для способов оплаты
export enum PaymentMethods {
  CARD = 'card',
  CASH = 'cash'
}


// Товар
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
}

// Данные доставки с enum
export interface DeliveryData {
    method: DeliveryMethods;
    address: string;
}

// Данные оплаты с enum
export interface PaymentData {
    method: PaymentMethods;
    cardNumber?: string;
}

// Заказ
export interface Order {
    products: Product[];
    delivery: DeliveryData;
    payment: PaymentData;
    orderNumber?: string;
}

export type ValidationErrors = Record<string, any>

export enum ErrorsList {
    EMPTYBUSKET = "EMPTYBUSKET",
    ADDRESSEMPTY = "ADDRESSEMPTY",
    CARDEMPTY = "CARDEMPTY",
    CARDLENGTH = "CARDLENGTH",
    QUANTITYZERO = "QUANTITYZERO",
    NOTENOUGHMONEY = "NOTENOUGHMONEY",
}

export const ErrorDict: Record<ErrorsList, string> = {
    [ErrorsList.EMPTYBUSKET]: "Корзина не может быть пустой",
    [ErrorsList.ADDRESSEMPTY]: "Укажите адрес доставки",
    [ErrorsList.CARDEMPTY]: "Номер не может быть пустым",
    [ErrorsList.CARDLENGTH]: "Номер карты должен состоять из 16 цифр",
    [ErrorsList.QUANTITYZERO]: "Ни один продукт не выбран",
    [ErrorsList.NOTENOUGHMONEY]: "Не хватает дененг на балансе",
}