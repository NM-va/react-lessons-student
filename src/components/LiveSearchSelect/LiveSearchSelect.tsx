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
    
    //todo categoriesCount перенести в ProductGrid ( лучше сделать как отдельный универсальный компонент с fieldName и labelName)
    // props     
    // data: T[];
    // fieldName: keyof T;
    // labelName: keyof T;
    // const categoriesCount = (filteredData || [])?.reduce((acc, categoryItem) => {
    //     const key = categoryItem.category;
    //     acc[key] = (acc[key] || 0) + 1;
    //     return acc;
    // }, {});
    
    return (
        <div >
            <div>
                <MonoSelect<T> options={data} value={selectedCategory} fieldName={fieldName} labelName={labelName} onChange={onCategoryChange}  />
                <SearchField value={searchQuery} onChange={onSearchChange} categorySlot={categorySlot} placeholder={placeholder} onClear={onClear}/>
                {/* <div>Количество элементов в каждой категории:
                    <div>
                        {
                            Object.entries(categoriesCount).map(([key, value]) => {
                                return <span key={key} style={{display: "inline-block", marginRight: "10px", padding: "2px 4px", border: "1px solid var(--button-bg)", borderRadius: "6px"}}>{`${key}: ${value} `}</span>
                            })
                        }
                    </div>

                </div> */}
            </div>

        </div>
    );
};