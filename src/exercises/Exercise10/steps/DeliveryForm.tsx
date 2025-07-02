import { DeliveryMethods  } from '../types/checkout.ts';
import UniversalInput from '../components/UniversalInput.tsx';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StepperContext } from '../CheckoutStepper';
import cls from '../CheckoutStepper.module.css'

export const DeliveryForm = () => {
    const [addressDelivery, setAddressDelivery] = useState<string>('');
    const [selectedDelivery, setSelectedDelivery] = useState<string>(DeliveryMethods.COURIER)
    const {data, setData, errors, setErrors} = useContext(StepperContext);

    useEffect(() => {
        setAddressDelivery(data.delivery.address);
        setSelectedDelivery(data.delivery.method);
    }, []);
    
    const onSelectDelivery = useCallback((value: string) => {
        setSelectedDelivery(value);
        setData({...data, delivery: {...data.delivery, value}});
    }, [])
    
    const onChangeAddress = useCallback((newValue: string) => {
        setAddressDelivery(newValue);
        setData({...data, delivery: {...data.delivery, address: newValue }});
        setErrors({});
    },[])
    
    const result = Object.values(DeliveryMethods).map(value => ({value, label: value}));
    
    return (
        <>
            <h2>Доставка</h2>
            <UniversalInput type="radio" label="Выберите способ доставки:" options={result} value={selectedDelivery} onChange={(value) => onSelectDelivery(value)} />
            <div className={cls.deliveryPriceBlock}>
                <div>Стоимость доставки:</div>
    
                {selectedDelivery === DeliveryMethods.COURIER && <span className={cls.deliveryPrice}>200</span>}
                {selectedDelivery === DeliveryMethods.PICKUP && <span className={cls.deliveryPriceFree}>Бесплатно</span>}
            </div>
            {selectedDelivery === DeliveryMethods.PICKUP && (
                <div>
                    {/* убрать ошибки TS */}
                    <UniversalInput label="Адрес доставки:" value={addressDelivery} onChange={(value) => onChangeAddress(value)} required error={errors?.delivery} />
                </div>
            )}
        </>
    )
}