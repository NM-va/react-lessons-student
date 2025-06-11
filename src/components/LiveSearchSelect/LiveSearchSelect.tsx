import 'react';
import { MonoSelect } from './MonoSelect';
import { SearchField } from './SearchField';
import "./styles/LiveSearchSelect.css";

interface LiveSearchSelectProps<T extends Record<string, any> = Record<string, any>> {
    data: T[];
    fieldName: keyof T;
    labelName: keyof T;
    searchQuery: string;
    selectedCategory: T;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: T) => void;
  }

export function LiveSearchSelect<T extends Record<string, any> = Record<string, any>>(props: LiveSearchSelectProps<T>) {
    const {data, searchQuery, selectedCategory, onSearchChange, onCategoryChange, fieldName, labelName} = props;

    const categorySlot = <div>hi</div>;
    const placeholder = 'поиск';
    const onClear = () => {
        onSearchChange('');
    };
    
    return (
        <div >
            <div>
                <MonoSelect<T> options={data} value={selectedCategory} fieldName={fieldName} labelName={labelName} onChange={onCategoryChange}  />
                <SearchField value={searchQuery} onChange={onSearchChange} categorySlot={categorySlot} placeholder={placeholder} onClear={onClear}/>
            </div>

        </div>
    );
};