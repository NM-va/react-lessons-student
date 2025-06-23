import { mockProducts } from '../data/mockData.ts';
import { Product } from '../types/checkout.ts';
import { useContext, useEffect, useState } from 'react';
import cls from '../CheckoutStepper.module.css'
import { StepperContext } from '../CheckoutStepper';

export const CartForm = () => {
    const [productList, setProductList] = useState<Product[]>(mockProducts);
    const totalSum = productList?.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );
    const {data, setData} = useContext(StepperContext);
    
    useEffect(() => {
        setProductList(data.products);
    }, []);
    
    const removeProducts = (id) => {
        const updatedProductList  = productList?.filter((item) => {return item.id !== id})
        setProductList(updatedProductList);
        setData({...data, products: updatedProductList});
    }
    
    const QuantityProduct = ({ product }: Product) => {
        const { price, availableQuantity } = product;
        const [quantity, setQuantity] = useState<number>(0);
        const [availableQuantityItem, setAvailableQuantityItem] = useState<number>(Number(availableQuantity));
        const [totalPrice, setTotalPrice] = useState<number>(Number(price));
        
        const addedProduct = () => {
            if ((availableQuantityItem < 1) || quantity > availableQuantity) return;
            setQuantity(quantity + 1);
            setAvailableQuantityItem(availableQuantityItem - 1);
        }
    
        const removeProduct = () => {
            if (quantity < 1) return;
            setQuantity(quantity - 1);
            if (availableQuantityItem > availableQuantity) return;
            setAvailableQuantityItem(availableQuantityItem + 1);
        }
        
        useEffect(() => {
            setTotalPrice(quantity * price);
        }, [quantity, price])
        
        return (
            <div style={{width: '40%'}}>
                <button type="button" onClick={addedProduct}>+</button>
                <span>{quantity}</span>
                <button type="button" onClick={removeProduct}>-</button>
                <span>{totalPrice}</span>
                <span>осталось: {availableQuantityItem}</span>
            </div>
        )
    }
    
    return (
        <>
            <div>CART</div>
            {productList.map((item: Product) => {
                return (
                    <div key={item.id} className={cls.productItem}>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                        <QuantityProduct product={item} />
                        <button
                            onClick={() => removeProducts(item.id)}
                        >x</button>
                    </div>
                )
            })}
            
            <div>Итого:</div>
            <div>{totalSum}</div>
        </>
    )
}