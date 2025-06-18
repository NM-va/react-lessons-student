export interface Stepper<T extends string> {
  currentStep: T;                    // Текущий активный шаг
  nextStep: () => void;              // Переход к следующему шагу
  previousStep: () => void;          // Возврат к предыдущему шагу
  goToStep: (step: T) => void;       // Переход к конкретному шагу
  reset: () => void;                 // Сброс к первому шагу
  currentStepIndex: number;          // Индекс текущего шага
  totalSteps: number;                // Общее количество шагов
  isFirstStep: boolean;              // Является ли текущий шаг первым
  isLastStep: boolean;               // Является ли текущий шаг последним
  progress: number;                  // Прогресс в процентах (0-100)
}

// Простая конфигурация хука
export interface StepperConfig<T extends string> {
  steps: T[];                        // Массив шагов (enum values)
  initialStep?: T;                   // Начальный шаг (по умолчанию первый)
  onStepChange?: (step: T) => void;  // Колбэк при смене шага
  onComplete?: () => void;           // Колбэк при завершении
}