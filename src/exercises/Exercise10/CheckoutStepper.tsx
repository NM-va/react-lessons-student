import {
    CheckoutSteps,
    DeliveryData,
    DeliveryMethods,
    Order,
    PaymentData,
    PaymentMethods,
    Product
} from './types/checkout';
import useStepper from '../../hooks/useStepper';
import { ProgressBar } from './components/ProgressBar';
import { StepIndicator } from './components/StepIndicator';
import { CartForm } from './steps/CartForm';
import { DeliveryForm } from './steps/DeliveryForm';
import { PaymentForm } from './steps/PaymentForm';
import { ConfirmationForm } from './steps/ConfirmationForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { createContext, useState } from 'react';
import { mockProducts } from './data/mockData';

interface initialStepperData {
    products: Product[];
    delivery: DeliveryData;
    payment: PaymentData;
    total: number;
}

// interface contextData {
//     data: initialStepperData;
//     setData: () => void;
// }


export const StepperContext = createContext<any | null>(null);

export const CheckoutStepper = () => {
    const steps = Object.values(CheckoutSteps);
    const stepper = useStepper<CheckoutSteps>({
        steps,
        onStepChange: (step: CheckoutSteps) => console.log('Переход на:', step),
        onComplete: () => console.log('Заказ оформлен!')
    });
    
    const initialState: initialStepperData = {
        products: mockProducts,
        delivery: { method: DeliveryMethods.PICKUP, address: '' },
        payment: { method: PaymentMethods.CARD },
        total: 0
    };
    
    const [data, setData] = useLocalStorage('stepperData', initialState);

    // const updateState = (newData: any) => {
    //     setData(newData);
    // }
    
    const totalSteps = steps.length;
    
    const renderStepContent = () => {
        switch (stepper.currentStep) {
            case CheckoutSteps.CART:
                return <CartForm />;
            case CheckoutSteps.DELIVERY:
                return <DeliveryForm />;
            case CheckoutSteps.PAYMENT:
                return <PaymentForm />;
            case CheckoutSteps.CONFIRMATION:
                return <ConfirmationForm />;
            default:
                return null;
        }
    };
    
    
    return (
    
        //todo: валидация
        //todo: сохранение в localstorage
        <>
            <StepperContext.Provider value={{ data, setData }}>
                {renderStepContent()}
                <ProgressBar progress={stepper.progress}/>
                <StepIndicator totalSteps={totalSteps} currentStepIndex={stepper.currentStepIndex} indicatorWidth={20} />
                <div style={{marginTop: '30px'}}>
                    <button onClick={() => stepper.goToStep(CheckoutSteps.CONFIRMATION)}>Пропустить все этапы</button>
                    {!stepper.isFirstStep && <button onClick={stepper.previousStep}>Предыдущий шаг</button>}
                    {!stepper.isLastStep && <button onClick={stepper.nextStep}>Следующий шаг</button>}
                    <button onClick={stepper.reset}>Сбросить</button>
                </div>
            </StepperContext.Provider>
        </>
    )
    
    
}