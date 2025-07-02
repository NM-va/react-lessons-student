import { useContext } from 'react';
import { StepperContext } from '../CheckoutStepper';

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
                            <div>
                                <span>{product.name}</span>
                                <span>{product.quantity}</span>
                                <span>{product.price}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <h4>Доставка</h4>
                <div>{data.delivery.method}</div>
                <div>{data.delivery.address}</div>
            </div>
            <div>
                <h4>Оплата</h4>
                <div>{data.payment.method}</div>
            </div>
            <div>
                <div>Стоимость товаров {}</div>
                <div>Доставка {}</div>
                <div>Итого: {}</div>
            </div>
            
            <button  style={{marginTop: '30px'}} onClick={countOrderHandler} type="submit">Оформить заказ</button>
        </>
    )
}