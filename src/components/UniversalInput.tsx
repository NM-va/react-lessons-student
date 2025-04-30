import { useRef, useState } from 'react';

interface UniversalInputProps {
    value?: string;
    onChange?: (newValue) => void;
}

export const UniversalInput = (props: UniversalInputProps) => {
    const {value, onChange, defaultValue = ''} = props;
    const [controlledValue, setControlledValue] = useState<string>('');
    const [newValueError, setNewValueError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const isControlled = value !== undefined && onChange !== undefined;
    
    const validatedValue = (value: string) => {
        const reg = /^[a-zA-Zа-яёА-ЯЁ]+$/;
        const isOnlyLetters = reg.test(value);

        return !isOnlyLetters ? "Текст должен состоять только из букв" : ""
    }
    
    const handleChange = (e) => {
        let newValue = e.target.value;
        setControlledValue(newValue);
        setNewValueError(validatedValue(newValue));
    }
    
    return (
        <>
            {!isControlled
                ? <input type="text" ref={inputRef} defaultValue={defaultValue} placeholder="Введите текст"/>
                : ( <>
                    <input type="text" value={controlledValue} onChange={handleChange} placeholder="Введите текст"/>
                    {newValueError && <div style={{ color: 'red' }}>{newValueError}</div>}
                    </>
                )
            }
        </>
    );
};