import { Stepper, StepperConfig } from './types';
import { useState } from 'react';

function useStepper<T extends string = string>(config: StepperConfig<T>): Stepper<T> {
    const {steps, onStepChange, onComplete, initialStep } = config;
    const defaultStep = initialStep ? initialStep : steps[0];
    
    const [stepChecked, setStepChecked] = useState<T>(defaultStep);
    const [currentStepIndexCheck, setCurrentStepIndexCheck] = useState<number>(steps.indexOf(stepChecked));
    
    const isFirstStepCheck = stepChecked === steps[0];
    const isLastStepCheck = stepChecked === steps[steps.length - 1];
    const totalSteps = steps.length;
    const progressCheck = ((currentStepIndexCheck + 1) / totalSteps) * 100;
    
    const changeStep = (step: T) => {
        setStepChecked(step);
        onStepChange?.(step);
        setCurrentStepIndexCheck(steps.indexOf(step));

        if (isLastStepCheck) {
            onComplete?.();
        }
    }
    
    return {
        currentStep: stepChecked,
        nextStep: () => changeStep(steps[currentStepIndexCheck + 1]),
        previousStep: () => changeStep(steps[currentStepIndexCheck - 1]),
        goToStep: (step: T) => changeStep(step),
        reset: () => changeStep(steps[0]),
        currentStepIndex: currentStepIndexCheck,
        totalSteps: totalSteps,
        isFirstStep: isFirstStepCheck,
        isLastStep: isLastStepCheck,
        progress: progressCheck
    }
}

export default useStepper;