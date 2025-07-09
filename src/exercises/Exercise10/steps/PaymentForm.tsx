import { PaymentMethods } from '../types/checkout.ts';
import UniversalInput from '../components/UniversalInput.tsx';
import { useCallback, useContext,  useState } from 'react';
import { StepperContentProps, StepperContext } from '../CheckoutStepper';

export const PaymentForm = () => {

    const [selectedPayment, setSelectedPayment] = useState<string>(PaymentMethods.CASH);
    const { data, setData, errors, setErrors } = useContext<StepperContentProps>(StepperContext);

    console.log('errors pay', errors)
    const onChangeNumberCard = useCallback((newNumber: string) => {
        setData({...data, payment: {...data.payment, cardNumber: newNumber}});
        setErrors({});
    }, [])
    
    const onSelectPayment = useCallback((value: string) => {
        setSelectedPayment(value);
        setData({...data, payment: {...data.payment, method: value}});
    }, [])
    
    const result = Object.values(PaymentMethods).map(value => ({value, label: value}));
    
    return (
        <div>
            <h2>Оплата</h2>
            <UniversalInput type="radio" label="Выберите способ оплаты:" options={result} value={selectedPayment} onChange={(value) => onSelectPayment(value)} />
            
            {selectedPayment === PaymentMethods.CARD &&
                <UniversalInput type="number" value={data.payment?.cardNumber || ''} onChange={onChangeNumberCard} error={errors?.payment} label='Номер карты' />
            }
        </div>
    )
}