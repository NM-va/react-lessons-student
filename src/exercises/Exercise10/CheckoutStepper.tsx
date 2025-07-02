import {
    CheckoutSteps,
    DeliveryData,
    DeliveryMethods,
    ErrorsList,
    PaymentData,
    PaymentMethods,
    Product,
    ValidationErrors
} from './types/checkout';
import useStepper from '../../hooks/useStepper';
import { ProgressBar } from './components/ProgressBar';
import { StepIndicator } from './components/StepIndicator';
import { CartForm } from './steps/CartForm';
import { DeliveryForm } from './steps/DeliveryForm';
import { PaymentForm } from './steps/PaymentForm';
import { ConfirmationForm } from './steps/ConfirmationForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { createContext, useCallback, useEffect, useState } from 'react';
import { mockProducts } from './data/mockData';
import cls from './CheckoutStepper.module.css';
import { isNumber } from 'lodash';
import { validateBankCard } from './validators';

interface InitialStepperData {
    products: Product[];
    delivery: DeliveryData;
    payment: PaymentData;
    total: number;
}

export const StepperContext = createContext<any | null>(null);

export const CheckoutStepper = () => {
    const initialState: InitialStepperData = {
        products: mockProducts,
        delivery: { method: DeliveryMethods.PICKUP, address: '' },
        payment: { method: PaymentMethods.CASH },
        total: 0
    };
    
    const steps = Object.values(CheckoutSteps);
    const totalSteps = steps.length;
    const stepper = useStepper<CheckoutSteps>({
        steps,
        onStepChange: (step: CheckoutSteps) => console.log('Переход на:', step),
        onComplete: () => console.log('Заказ оформлен!')
    });
    
    const [data, setData] = useLocalStorage('stepperData', initialState);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isValidValue, setIsValidValue] = useState<boolean>(true);

    useEffect(() => {
        setIsValidValue(Object.keys(errors).length === 0);
    }, [errors]);
    
    const validateStep = useCallback((step: CheckoutSteps): { isValid: boolean; errors: ValidationErrors } => {
        const newErrors:ValidationErrors = {};
        //todo проверить кейс когда у нас выбрано 0 товаров и не дать перейти на следующий шаг
        // todo проверка если удалили все товары

        // debugger;

        
        switch (step) {
            case CheckoutSteps.CART:
                if (data.products.length === 0) {
                    newErrors.cart = ErrorsList.EMPTYBUSKET
                }
                break;

            case CheckoutSteps.DELIVERY:
                if (data.delivery.address === '') {
                    newErrors.delivery = ErrorsList.ADDRESSEMPTY
                    // todo добавить валидатор по аналогии с validateBankCard
                }
                break;

            case CheckoutSteps.PAYMENT:
                if (data.payment.method === PaymentMethods.CARD) {
                    const { errors: paymentErrors, isValid } = validateBankCard(data.payment.cardNumber);
                    if (!isValid) {
                        newErrors.payment = paymentErrors.join(', ');
                    }
                }
                break;
            //
            case CheckoutSteps.CONFIRMATION:
                //todo обработку платежа, ты 
                break;
        }
        
        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors
        };
    }, [CheckoutSteps, data.delivery.address, data.delivery.method, data.payment.cardNumber, data.payment.method]);
    
    
    const nextStepHandler = () => {
        const valid = validateStep(stepper.currentStep);
        setIsValidValue(valid.isValid);
        
        if (valid.isValid) {
            stepper.nextStep();
        } else {
            setErrors(valid.errors);
        }
    };
    
    // useEffect(() => {
    //     const valid = validateStep(stepper.currentStep);
    //     setIsValidValue(valid.isValid);
    //     setErrors(valid.errors);
    // }, [data.products.length, stepper.currentStep, data.delivery.address, data.delivery.method, data.payment.method, data.payment.cardNumber]);
    
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
        //DONE: сохранение в localstorage
        <>
            {/* //todo Затипизировать контекст */}
            <StepperContext.Provider value={{ data, setData, errors, setErrors }}>
                {renderStepContent()}
                <ProgressBar progress={stepper.progress}/>
                <StepIndicator totalSteps={totalSteps} steps={steps} currentStepIndex={stepper.currentStepIndex} indicatorWidth={20} />
                <div className={cls.controls}>
                    {/*<button onClick={() => stepper.goToStep(CheckoutSteps.CONFIRMATION)}>Пропустить все этапы</button>*/}
                    {!stepper.isFirstStep && <button onClick={stepper.previousStep}>Предыдущий шаг</button>}
                    {!stepper.isLastStep && <button onClick={nextStepHandler} disabled={!isValidValue}>Следующий шаг</button>}
                    <button onClick={stepper.reset}>Сбросить</button>
                </div>
            </StepperContext.Provider>
        </>
    )
}
