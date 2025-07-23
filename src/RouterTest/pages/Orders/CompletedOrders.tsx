import React from 'react';
import { orders } from '../../utils/constants';

export const CompletedOrders = () => {
    const completedOrders = orders.filter(order => order.status === "completed");
    return (
        <div>
            <h2>Выполненные заказы</h2>
            {completedOrders.length === 0
            ? <div>Нет выполненных заказов</div>
            : (
                completedOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>Заказ #{order.id}</h3>
                        <div><strong>Дата:</strong> {order.date}</div>
                        <div><strong>ID пользователя:</strong> {order.userId}</div>
                        <div><strong>Итого:</strong> ${order.total.toFixed(2)}</div>
                    
                        <h4>Товары:</h4>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.productId}>
                                    {item.name} - {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};
