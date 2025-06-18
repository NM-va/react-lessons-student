import { CheckoutSteps, StepperConfig } from '../exercises/Exercise10/types/checkout.ts';
import { useState } from 'react';

export const useStepper = (config: StepperConfig<any>) => {
    const {steps, onStepChange, onComplete, initialStep } = config;
    const defaultStep = initialStep ? initialStep : steps[0];
    
    const [stepChecked, setStepChecked] = useState<CheckoutSteps>(CheckoutSteps.CART);
    
    const isFirstStepCheck = stepChecked === steps[0];
    const isLastStepCheck = stepChecked === steps[steps.length - 1];
    const currentStepIndexCheck = steps.indexOf(stepChecked);
    const totalSteps = steps.length;
    const progressCheck = ((currentStepIndexCheck + 1) / totalSteps) * 100;
    
    const changeStep = (step) => {
        setStepChecked(step);

        return onStepChange?.(step);
    }
    
    return {
        currentStep: stepChecked,
        nextStep: () => changeStep(steps[currentStepIndexCheck + 1]),
        previousStep: () => changeStep(steps[currentStepIndexCheck - 1]),
        goToStep: () => changeStep(steps[defaultStep]),
        reset: () => changeStep(steps[0]),
        currentStepIndex: currentStepIndexCheck,
        totalSteps: totalSteps,
        isFirstStep: isFirstStepCheck,
        isLastStep: isLastStepCheck,
        progress: progressCheck
    }
}