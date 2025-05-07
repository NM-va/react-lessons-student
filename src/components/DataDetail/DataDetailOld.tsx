import React, {
  createContext,
  useContext,
  forwardRef,
  useImperativeHandle,
  useState,
  ReactNode,
  RefAttributes, ForwardRefExoticComponent, useRef
} from 'react';
import { useThemeColor } from '../hooks/useThemeColor';


// Определение типов
export interface DataDetailProps {
  children: ReactNode;
  className?: string;
  title?: string;
  expanded: boolean;
  onToggleExpand: (expanded: boolean) => void;
}

// Определение контекста
interface DataDetailContextType {
  expanded: boolean;
  toggleExpand: (expanded: boolean) => void;
}

// Создание контекста
const DataDetailContext = createContext<DataDetailContextType | undefined>(undefined);

// Хук для использования контекста
export const useDataDetail = () => {
  const context = useContext(DataDetailContext);
  if (!context) {
    throw new Error('useDataDetail must be used within a DataDetail component');
  }
  return context;
};

// Интерфейс для императивного хэндла
export interface DataDetailHandles {
  open: () => void;
  close: () => void;
  toggle: (expanded: boolean) => void;
  // Для продвинутого уровня:
  // resetForm?: () => void;
  // validateForm?: () => boolean;
  // submitForm?: () => void;
  // getFormValues?: () => Record<string, any>;
}

interface DataDetailComponent {
  Header: React.FC<{ children: React.ReactNode}>;
  Body: React.FC<{ children: React.ReactNode}>;
  Footer: React.FC<{ children: React.ReactNode}>;
  Actions: React.FC<{ children: React.ReactNode }>;
}

// Основной компонент с forwardRef
export const DataDetail = forwardRef<DataDetailHandles, DataDetailProps>((props, ref) => {
  const { title, onToggleExpand, expanded  } = props;

    // const [expanded, setExpanded] = useState(false);

      const contextValue = {
        expanded,
        toggleExpand: onToggleExpand,
      };

      useImperativeHandle(ref, () => ({
          open: () => {
              if (!expanded) {
                  // setExpanded(true);
                  props.onToggleExpand?.(true);
              }
          },
          close: () => {
              if (expanded) {
                  // setExpanded(false);
                  props.onToggleExpand?.(false);
              }
          },
          toggle: onToggleExpand,
      }));

  return (
    <DataDetailContext.Provider value={contextValue}>
      <>{title}</>
      {props.children}
    </DataDetailContext.Provider>
  );
});


export default DataDetail;