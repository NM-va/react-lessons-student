import {Stepper, StepperConfig} from "../exercises/Exercise10/types/checkout.ts";
import {ProgressBar} from "../exercises/Exercise10/components/ProgressBar.tsx";
import {StepIndicator} from "../exercises/Exercise10/components/StepIndicator.tsx";

export const useStepper = (config: StepperConfig<any>) => {


  const Stepper = (props: Stepper<string>) => {
    const {
      currentStep, nextStep, previousStep,
      goToStep, reset, currentStepIndex
      , totalSteps, isFirstStep, isLastStep
      , progress
    } = props;
    const step: number = 2;
    return (
      <>
        <ProgressBar progress={progress}/>
        <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />

        <button onClick={() => goToStep(step: number)}>Перейти шагу</button>
        {isLastStep && <button onClick={nextStep}>Следующий шаг</button>}
        {isFirstStep && <button onClick={previousStep}>Предыдущий шаг</button>}
        <button onClick={reset}>Сбросить</button>
      </>
    )
  }

  return <Stepper currentStep={} nextStep={} previousStep={} goToStep={} reset={} currentStepIndex={} totalSteps={} isFirstStep={} isLastStep={} progress={} />
}