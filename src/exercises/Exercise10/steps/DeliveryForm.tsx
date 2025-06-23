import { DeliveryMethods } from '../types/checkout.ts';
import { UniversalInput } from '../../../components/UniversalInput.tsx';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { StepperContext } from '../CheckoutStepper';

export const DeliveryForm = () => {
    const [addressDelivery, setAddressDelivery] = useState<string>('');
    const [selectedDelivery, setSelectedDelivery] = useState('')
    const {data, setData} = useContext(StepperContext);
    
    useEffect(() => {
        setAddressDelivery(data.delivery.address);
        setSelectedDelivery(data.delivery.method);
    }, []);
    
    const onSelectDelivery = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDelivery(e.target.value);
        setData({...data, delivery: {...data.delivery, method: e.target.value }});
    }, [])
    
    const onChangeAddress = (newValue: string) => {
        setAddressDelivery(newValue);
        setData({...data, delivery: {...data.delivery, address: newValue }});
    }
    
    
    
    return (
        <>
            <div>DELIVERY</div>
            <div>Выберите способ доставки:</div>
            <select onChange={onSelectDelivery} value={selectedDelivery}>
                {
                    Object.values(DeliveryMethods).map((item) => {
                        return (
                            <option key={item}>{item}</option>
                        )
                    })
                }
            </select>
            
            {selectedDelivery === DeliveryMethods.COURIER && <div>+200</div>}
            {selectedDelivery === DeliveryMethods.PICKUP && <div>
              <div>Адрес доставки:</div>
              <UniversalInput value={addressDelivery} onChange={onChangeAddress}/>
            </div>}
        </>
    )
}