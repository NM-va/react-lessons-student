import { MonoSelectProps } from './types';
import { ChangeEvent } from 'react';


export const MonoSelect = (props: MonoSelectProps) => {
    const {options, value, onChange, placeholder, disabled, showCount} = props;
    
    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };
    
    return (
        <div style={{ 'color': '#000' }}>
            <label htmlFor="monoSelect">Категории</label>
            <select name="monoSelect" form="monoSelect" id="monoSelect" value={value} onChange={onChangeSelect}>
                {
                    options.map((item) => (
                        <option value={item.value} key={item.label}>{item.label}</option>
                    ))
                }
            </select>
        </div>
    );
};