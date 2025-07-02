import { DeliveryMethods, PaymentMethods } from '../types/checkout.ts';
import UniversalInput from '../components/UniversalInput.tsx';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { StepperContext } from '../CheckoutStepper';

export const PaymentForm = () => {
    const [numberCard, setNumberCard] = useState<string>('');
    const [selectedPayment, setSelectedPayment] = useState<string>(PaymentMethods.CASH);
    const { data, setData, errors } = useContext(StepperContext);
    console.log('errors pay', errors)
    const onChangeNumberCard = useCallback((newNumber: string) => {
        setNumberCard(newNumber);
        setData({...data, payment: {...data.payment, cardNumber: newNumber}});
    }, [])
    
    const onSelectPayment = useCallback((value) => {
        setSelectedPayment(value);
        setData({...data, payment: {...data.payment, method: value}});
    }, [])
    
    const result = Object.values(PaymentMethods).map(value => ({value, label: value}));
    
    return (
        <div>
            <h2>Оплата</h2>
            <UniversalInput type="radio" label="Выберите способ оплаты:" options={result} value={selectedPayment} onChange={(value) => onSelectPayment(value)} />
            
            {selectedPayment === PaymentMethods.CARD &&
             <div>
               <div>Номер карты:</div>
               <UniversalInput type="number" value={numberCard} onChange={onChangeNumberCard} error={errors?.payment}/>
             </div>
            }
        </div>
    )
}