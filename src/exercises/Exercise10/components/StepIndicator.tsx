import { useMemo } from 'react';
import cls from './StepIndicator.module.css';


const DEFAULT_WIDTH: number = 20;

interface Props {
    totalSteps: number;
    currentStepIndex: number;
    className?: string; // FYI
    indicatorWidth?: number;
}

export const StepIndicator = (props: Props) => {
    const { totalSteps, currentStepIndex, className = '', indicatorWidth = DEFAULT_WIDTH } = props;
    
    const currentSteps = useMemo(() => Array(totalSteps).fill(undefined).map((_e, i) => i + 1), [totalSteps]);

    return (
        <div className={`${cls.stepsList} ${className}`}>
            {currentSteps.map((step: number, i: number) => {
                const progressCheck = (step / totalSteps) * 100;
                const indicatorPosition = `calc(${progressCheck}% - ${indicatorWidth / 2}px)`;

                return (
                    <div
                        className={`${(currentStepIndex) >= i ? cls.currentStep : ''} ${cls.step}`}
                        style={{ left: `${indicatorPosition}` }}
                        key={i}>
                        {step}
                    </div>
                )
            })}
        </div>
    );
}