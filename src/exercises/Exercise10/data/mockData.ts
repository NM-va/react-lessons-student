// 5 товаров в корзине
import {DeliveryMethods, PaymentMethods} from "../types/checkout.ts";

export const mockProducts = [
  { id: 1, name: 'iPhone 14', price: 999, quantity: 1 },
  { id: 2, name: 'MacBook Pro', price: 1999, quantity: 1 },
  { id: 3, name: 'AirPods', price: 199, quantity: 2 },
  { id: 4, name: 'iPad', price: 599, quantity: 1 },
  { id: 5, name: 'Apple Watch', price: 399, quantity: 1 }
];

// Способы доставки с enum
export const deliveryOptions = [
  { value: DeliveryMethods.COURIER, label: 'Курьер (+200₽)' },
  { value: DeliveryMethods.PICKUP, label: 'Самовывоз (бесплатно)' }
];

// // Способы оплаты с enum
const paymentOptions = [
  { value: PaymentMethods.CARD, label: 'Банковская карта' },
  { value: PaymentMethods.CASH, label: 'Наличными при получении' }
];