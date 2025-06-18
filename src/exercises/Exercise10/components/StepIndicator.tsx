import cls from './StepIndicator.module.css';
interface Props {
  totalSteps: number;
  currentStepIndex: number;
}
export const StepIndicator = (props: Props) => {
  const {totalSteps, currentStepIndex} = props;
  const indicatorWidth = 20;

  const steps = [];
  
  for (let i = 1; i < totalSteps; i++) {
    const progressCheck = (i / totalSteps) * 100;
    const indicatorPosition = `calc(${progressCheck}% - ${indicatorWidth / 2}px)`;
    steps.push(<div className={`${(currentStepIndex + 1) >= i ? cls.currentStep  : ''} ${cls.step}`} style={{left: `${indicatorPosition}`}} key={i}>{i}</div>);
  }
  
  return (
    <div className={cls.stepsList}>
      {steps}
    </div>
  );
}