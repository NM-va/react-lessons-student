import {
    CheckoutSteps,
    DeliveryData,
    DeliveryMethods,
    ErrorDict,
    Order,
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
import { createContext, useEffect, useState } from 'react';
import { mockProducts } from './data/mockData';
import cls from './CheckoutStepper.module.css';
import { validateBankCard, validateCart, validateConfirmation, validateDelivery } from './validators';
import { SuccessOrder } from './components/SuccessOrder';

export interface InitialStepperData {
    products: Product[];
    delivery: DeliveryData;
    payment: PaymentData;
    orderNumber?: string;
}

export interface StepperContentProps {
    data: Order;
    setData: (data: InitialStepperData | ((prevData: InitialStepperData) => InitialStepperData)) => void;
    errors: ValidationErrors;
    setErrors: (prevState: ValidationErrors) => void;
    setIsCompletedSteps: (isCompleted: boolean) => void;
    countOrder: number;
    setCountOrder: (count: number) => void;
    setBalance: (count: number) => void;
}

export const StepperContext = createContext<StepperContentProps>({} as StepperContentProps);

export const CheckoutStepper = () => {
    const initialState: InitialStepperData = {
        products: mockProducts,
        delivery: { method: DeliveryMethods.PICKUP, address: '' },
        payment: { method: PaymentMethods.CASH },
        orderNumber: '0'
    };
    
    const steps = Object.values(CheckoutSteps);
    const totalSteps = steps.length;
    const stepper = useStepper<CheckoutSteps>({
        steps,
        onStepChange: (step: CheckoutSteps) => console.log('Переход на:', step),
        onComplete: () => console.log('Заказ оформлен!'),
    });
    
    const [data, setData] = useLocalStorage('stepperData', initialState);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isValidValue, setIsValidValue] = useState<boolean>(true);
    const [isCompletedSteps, setIsCompletedSteps] = useState<boolean>(false);
    const [countOrder, setCountOrder] = useState<number>(1);
    const math =  Math.floor(Math.random() * (10000 - 100) + 100);
    const [balance, setBalance] = useState<number>(math);
    
    useEffect(() => {
        setIsValidValue(Object.keys(errors).length === 0);
    }, [errors]);
    
    const validateStep =(step: CheckoutSteps): { isValid: boolean; errors: ValidationErrors } => {
        const newErrors:ValidationErrors = {};
        //Done проверить кейс когда у нас выбрано 0 товаров и не дать перейти на следующий шаг
        // Done проверка если удалили все товары

        // debugger;

        
        switch (step) {
            case CheckoutSteps.CART:
                const { errors: cartErrors, isValid } = validateCart(data.products);
                if (!isValid) {
                    newErrors.cart = cartErrors.join(',');
                }
                break;

            case CheckoutSteps.DELIVERY:
                // Done добавить валидатор по аналогии с validateBankCard
                if (data.delivery.method === DeliveryMethods.PICKUP) {
                    const { errors: deliveryErrors, isValid } = validateDelivery(data.delivery.address);
                    if (!isValid) {
                        newErrors.delivery = deliveryErrors.join(',');
                    }
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
                // todo обработку платежа, ты
                const { errors: paymentErrors, isValidConfirmation } = validateConfirmation(data.products, balance);
                console.log('isValidConfirmation', isValidConfirmation)
                if (!isValidConfirmation) {
                    newErrors.payment = paymentErrors.join(', ');
                }
                break;
        }
        
        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors
        };
    };
    
    
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
                return <ConfirmationForm isCompletedSteps={isCompletedSteps} />;
            default:
                return null;
        }
    };
    
    return (
        //DONE: валидация
        //DONE: сохранение в localstorage
        <>
            {/* //Done Затипизировать контекст */}
            <StepperContext.Provider value={{ data, setData, errors, setErrors, setIsCompletedSteps, countOrder, setCountOrder, balance, setBalance }}>
                {renderStepContent()}
                <ProgressBar progress={stepper.progress}/>
                <StepIndicator totalSteps={totalSteps} steps={steps} currentStepIndex={stepper.currentStepIndex} indicatorWidth={20} isCompletedSteps={isCompletedSteps} />
                {
                    isCompletedSteps
                    ? null
                    : <div className={cls.controls}>
                          {/*<button onClick={() => stepper.goToStep(CheckoutSteps.CONFIRMATION)}>Пропустить все этапы</button>*/}
                          {!stepper.isFirstStep && <button onClick={stepper.previousStep}>Предыдущий шаг</button>}
                          {!stepper.isLastStep && <button onClick={nextStepHandler}>Следующий шаг</button>}
                          <button onClick={stepper.reset}>Сбросить</button>
                      </div>
                }
            </StepperContext.Provider>
        </>
    )
}
