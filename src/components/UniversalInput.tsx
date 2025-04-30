import { useCallback, useEffect, useRef, useState } from 'react';

interface UniversalInputProps {
    value?: string;
    onChange?: (newValue: string) => void;
    defaultValue?: string;
}

const INVALID_TEXT: string = "Текст должен состоять только из букв";

export const UniversalInput = (props: UniversalInputProps) => {
    const { value, onChange, defaultValue = ''} = props;
    const [controlledValue, setControlledValue] = useState<string>('');
    const [newValueError, setNewValueError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled: boolean = value !== undefined && onChange !== undefined;
    const inputValue: string = isControlled ? value || '': controlledValue;

    useEffect(() => {
        setControlledValue(defaultValue);
    }, [defaultValue]);
    
    const validatedValue =  useCallback((value: string): boolean => {
        const reg = /^[a-zA-Zа-яёА-ЯЁ]+$/;
        const isOnlyLetters = reg.test(value);
        return isOnlyLetters;
    }, []);
    
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        !isControlled && setNewValueError(validatedValue(newValue) ? '' : INVALID_TEXT); 

        if (isControlled) {
            onChange?.(newValue);
        } else {
            setControlledValue(newValue);
        }
    }, [isControlled, controlledValue, onChange]);
    
    return (
        <>
            <input 
                ref={inputRef}
                type="text" 
                value={inputValue} 
                onChange={handleChange} 
                placeholder="Введите текст" 
            />
            {newValueError && <div style={{ color: 'red' }}>{newValueError}</div>}
        </>
    );
};