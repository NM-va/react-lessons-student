import { useContext } from 'react';
import { StepperContext } from '../CheckoutStepper';
import cls from '../CheckoutStepper.module.css';

export const ConfirmationForm = () => {
    const { data, setData } = useContext(StepperContext);

    let countOrder = 1;
    const countOrderHandler = () => {
        setData({...data, total: countOrder++});
    }
    
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Номер заказа: <span>{countOrder}</span></h2>
            <h3>Подтверждение заказа</h3>
            <div>
                <h4>Состав заказа</h4>
                {
                    data.products.map((product) => {
                        return (
                            <div className={cls.productItemOrder}>
                                <span>{product.name}</span>
                                <span>{product.quantity}</span>
                                <span>{product.price}р.</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className={cls.orderItemBlock}>
                <h4>Доставка</h4>
                <div>{data.delivery.method}</div>
                <div>{data.delivery.address}</div>
            </div>
            <div className={cls.orderItemBlock}>
                <h4>Оплата</h4>
                <div>{data.payment.method}</div>
            </div>
            <div>
                <div>Стоимость товаров: {}</div>
                <div>Доставка: {}</div>
                <div>Итого: {}</div>
            </div>
            
            <button  style={{marginTop: '30px'}} onClick={countOrderHandler} type="submit">Оформить заказ</button>
        </>
    )
}