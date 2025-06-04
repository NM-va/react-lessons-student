import'react';
import { ChangeEvent, useCallback } from 'react';

export interface MonoSelectProps<T extends Record<any, string> = Record<any, string>> {
    options: T[];
    fieldName: keyof T;
    labelName: keyof T;
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    disabled?: boolean;
}

export function MonoSelect<T extends Record<string, any>>(props: MonoSelectProps<T>){
    const { options, fieldName, labelName, value, onChange } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const selectedOption: T | undefined = options.find((v) => `${v[fieldName]}` === `${value}`);
        selectedOption && onChange(selectedOption);
    }, []);
    
    return (
        <div style={{ 'color': '#000' }}>
            <label htmlFor="monoSelect">Категории</label>
            <select name="monoSelect" form="monoSelect" id="monoSelect" value={value[fieldName]} onChange={onChangeHandler}>
                {
                    options.map((item) => (
                        <option value={item[fieldName]} key={item[fieldName]} >{item[labelName]}</option>
                    ))
                }
            </select>
        </div>
    );
};