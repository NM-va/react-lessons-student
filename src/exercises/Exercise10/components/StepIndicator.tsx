import { useMemo } from 'react';
import cls from './StepIndicator.module.css';


const DEFAULT_WIDTH: number = 20;

interface Props {
    steps: string[];
    totalSteps: number;
    currentStepIndex: number;
    className?: string; // FYI
    indicatorWidth?: number;
    isCompletedSteps: boolean;
}

export const StepIndicator = (props: Props) => {
    const { steps, totalSteps, currentStepIndex, className = '', indicatorWidth = DEFAULT_WIDTH, isCompletedSteps } = props;
    
    const currentSteps = useMemo(() => Array(totalSteps).fill(undefined).map((_e, i) => i + 1), [totalSteps]);

    return (
        <div className={`${cls.stepsList} ${className}`}>
            {currentSteps.map((step: number, i: number) => {
                let isCompleted = currentStepIndex > i;

                if (i === currentSteps.length - 1) {
                    isCompleted = isCompletedSteps;
                }

                const fillClass = (currentStepIndex) > i ? cls.fillStep : '';
                const activeClass = currentStepIndex === i ? cls.activeStep : '';
                
                return (
                    <div
                        className={`${cls.step} ${fillClass} ${activeClass}`}
                        key={i}>
                        <div className={cls.stepContainer}>
                            <div className={`${cls.stepNumber}`}>
                                {isCompleted ? '✓' : i + 1 }
                            </div>
                            <div className={`${cls.stepLabel}`}>
                                {steps[i]}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}