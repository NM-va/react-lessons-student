import { mockProducts } from '../data/mockData.ts';
import { Product } from '../types/checkout.ts';
import React, { useContext, useEffect, useState } from 'react';
import cls from '../CheckoutStepper.module.css'
import { StepperContext } from '../CheckoutStepper';
import { QuantityProduct } from '../components/QuantityProduct';

export const CartForm = () => {
    const [productList, setProductList] = useState<Product[]>(mockProducts);

    const { data, setData, errors, setErrors } = useContext(StepperContext);
    
    const error = errors?.cart;
    
    const totalPriceBasket = data.products?.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );
    const removeProducts = (id: number) => {
        const updatedProductList  = productList?.filter((item) => {return item.id !== id})
        setProductList(updatedProductList);
        setData({...data, products: updatedProductList});
    };
    
    const updateProductQuantity = (productId: number , newQuantity: number) => {
        const updatedProducts = productList.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: newQuantity
                };
            }
            return product;
        });
        
        setProductList(updatedProducts);
        setData({...data, products: updatedProducts});
    };
    
    const addedProduct = (productId: number) => {
        const product = productList.find((item) => item.id === productId);
        if (!product) return;
        
        const currentQuantity = product.quantity;
        if (currentQuantity >= product.availableQuantity) return;

        updateProductQuantity(productId, currentQuantity + 1);
        setErrors({});
    };
    
    const removeProduct = (productId: number) => {
        const product = productList.find((item) => item.id === productId);
        if (!product) return;
    
        const currentQuantity = product.quantity;
        if (currentQuantity <= 0 ) return;
    
        updateProductQuantity(productId, currentQuantity - 1);
    };
    
    useEffect(() => {
        setProductList(data.products);
    }, []);
    
    return (
        <>
            <h2>Корзина</h2>
            {data.products.map((item: Product) => {
                return (
                    <div key={item.id} className={cls.productItem}>
                        <div>
                            <div className={cls.productName}>{item.name}</div>
                            <div className={cls.productPrice}>{item.price}</div>
                        </div>

                        <QuantityProduct 
                            addedProduct={() => addedProduct(item.id)}
                            removeProduct={() => removeProduct(item.id)}
                            price={item.price}
                            quantity={item.quantity}
                            availableQuantityItem={item.availableQuantity - item.quantity}
                        />
                        <button className={cls.removeBtn}
                            onClick={() => removeProducts(item.id)}
                        >x</button>
                    </div>
                )
            })}
            {error && (
                <div style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    fontSize: '14px',
                    color: '#ef4444'
                }}>
                    {error}
                </div>
            )}
            <div className={cls.totalPriceTitle}>Итого:</div>
            <div className={cls.totalPriceBasket}>{totalPriceBasket}</div>
        </>
    )
}