import { useContext } from 'react';
import { StepperContext } from '../CheckoutStepper';
import cls from '../CheckoutStepper.module.css';
import { TotalAmount } from './TotalAmount';
import { DeliveryMethods } from '../types/checkout';

export const SuccessOrder = () => {
    const { data, setData, countOrder } = useContext(StepperContext);
    const totalPriceBasket = data.products?.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );
    
    const deliveryCost = (data.delivery.method === DeliveryMethods.PICKUP) ? 200 : 0;
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Заказ успешно оформлен</h2>
            <div>
                <h3 style={{textAlign: 'center'}}>Номер заказа: <span>{countOrder}</span></h3>
                
                {
                    data.products.map((product) => {
                        return (
                            <div key={product.name} className={cls.productItemOrder}>
                                <span>{product.name}</span>
                                <span>{product.quantity}</span>
                                <span>{product.price}р.</span>
                            </div>
                        )
                    })
                }
    
                <TotalAmount totalPriceBasket={totalPriceBasket} deliveryCost={deliveryCost} />
            </div>
        </>
    )
}