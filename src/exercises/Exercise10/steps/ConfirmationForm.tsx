import { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../CheckoutStepper';
import cls from '../CheckoutStepper.module.css';
import { TotalAmount } from '../components/TotalAmount';
import { DeliveryMethods, ErrorDict } from '../types/checkout';
import { SuccessOrder } from '../components/SuccessOrder';


interface Props {
    isCompletedSteps: boolean;
}

export const ConfirmationForm = ({ isCompletedSteps } : Props) => {
    const { data, setData, setIsCompletedSteps, countOrder, setCountOrder, balance, setBalance } = useContext(StepperContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const totalPriceBasket = data.products?.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );
    
    const deliveryCost = (data.delivery.method === DeliveryMethods.PICKUP) ? 200 : 0;
    
    useEffect(() => {
        const fetch = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        
        return  () => clearTimeout(fetch);
    }, [isLoading]);
    
    
    const countOrderHandler = () => {
        setCountOrder(countOrder + 1);
        setData({...data, total: countOrder});
        setIsLoading(true);
        setIsCompletedSteps(true);
    }
    
    
    const Loader = () => {
        return (
            <div>Загрузка...</div>
        )
    }


    if(isCompletedSteps) {
        //todo вернуть SuccessOrder
        return <SuccessOrder />
    }
    
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Номер заказа: <span>{countOrder}</span></h2>
            <div style={{fontSize: '20px', textAlign: 'right'}}>Ваш баланс: <strong>{balance}</strong>p.</div>
            <h3>Подтверждение заказа</h3>
            <div>
                <h4>Состав заказа</h4>
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
            {/* сделать независимый универсальный компонент и скормить итоговые значения */}
            <TotalAmount totalPriceBasket={totalPriceBasket} deliveryCost={deliveryCost} />
            
            <button  style={{marginTop: '30px'}} onClick={countOrderHandler} type="submit" disabled={isLoading}>Оформить заказ</button>
    
            {isLoading && <Loader/>}
        </>
    )
}