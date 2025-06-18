import { CheckoutSteps } from './types/checkout';
import useStepper from '../../hooks/useStepper';
import { ProgressBar } from './components/ProgressBar';
import { StepIndicator } from './components/StepIndicator';
import { CartForm } from './steps/CartForm';
import { DeliveryForm } from './steps/DeliveryForm';
import { PaymentForm } from './steps/PaymentForm';
import { ConfirmationForm } from './steps/ConfirmationForm';

export const CheckoutStepper = () => {
    const steps = Object.values(CheckoutSteps);
    const stepper = useStepper<CheckoutSteps>({
        steps,
        onStepChange: (step: CheckoutSteps) => console.log('Переход на:', step),
        onComplete: () => console.log('Заказ оформлен!')
    });
    
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
            {renderStepContent()}
            <ProgressBar progress={stepper.progress}/>
            <StepIndicator totalSteps={totalSteps} currentStepIndex={stepper.currentStepIndex} indicatorWidth={20} />
            <div style={{marginTop: '30px'}}>
                <button onClick={() => stepper.goToStep(CheckoutSteps.CONFIRMATION)}>Пропустить все этапы</button>
                {!stepper.isFirstStep && <button onClick={stepper.previousStep}>Предыдущий шаг</button>}
                {!stepper.isLastStep && <button onClick={stepper.nextStep}>Следующий шаг</button>}
                <button onClick={stepper.reset}>Сбросить</button>
            </div>

        </>
    )
    
    
}