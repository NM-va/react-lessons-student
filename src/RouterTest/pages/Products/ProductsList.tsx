import React from 'react';

export const ProductsList = () => {
    const products = [
        { id: '1', name: 'Ноутбук ProBook 450', price: 899.99, category: 'Электроника' },
        { id: '2', name: 'Смартфон Galaxy S21', price: 799.99, category: 'Электроника' },
        { id: '3', name: 'Кофемашина Deluxe', price: 499.99, category: 'Бытовая техника' },
        { id: '4', name: 'Беспроводные наушники', price: 149.99, category: 'Электроника' },
        { id: '5', name: 'Умные часы Pro', price: 249.99, category: 'Гаджеты' }
    ];
    return (
        <div>
            {
                products.map((product) => {
                    return <div>product.name</div>
                })
            }
        </div>
    );
};
