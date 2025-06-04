import React, { useEffect, useState } from 'react';
import { MonoSelect } from './MonoSelect';
import { SearchField } from './SearchField';
import { monoSelectOptions, sampleProducts } from '../../exercises/Exercise8';
import { useDebounce } from '../../hooks/useDebounce';
import { BaseItem } from './types';
import "./styles/LiveSearchSelect.css";

export function LiveSearchSelect (props) {
    const {data, searchQuery, selectedCategory, onSearchChange, onCategoryChange, categoryOptions, renderItem, gridColumns} = props;
    const [filtered, setFiltered] = useState<BaseItem[]>(sampleProducts);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);

    const categorySlot = <div>hi</div>;
    const placeholder = 'поиск';
    const onClear = () => {
        onSearchChange('');
    };
    
    const categoriesCount = data.reduce((acc, categoryItem) => {
        const key = categoryItem.category;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    useEffect(() => {
        if (!debouncedSearchQuery && selectedCategory === 'all') setFiltered(sampleProducts);
        console.log('filtered 1', filtered);
        
        let filteredData = data.filter((item: BaseItem) => {
            
    
    
            return item.name.toLowerCase()
                        .includes(debouncedSearchQuery?.toLowerCase())
        });
    
        setFiltered(filteredData);
        console.log('filtered', filtered);
    }, [data, searchQuery, selectedCategory])
    
    
    return (
        <div >
            <div>
                <MonoSelect options={monoSelectOptions} value={selectedCategory} onChange={onCategoryChange} />
                <SearchField value={searchQuery} onChange={onSearchChange} categorySlot={categorySlot} placeholder={placeholder} onClear={onClear}/>
                <div>Количество элементов в каждой категории:
                    <div>
                        {
                            Object.entries(categoriesCount).map(([key, value]) => {
                                return <span key={key} style={{display: "inline-block", marginRight: "10px", padding: "2px 4px", border: "1px solid var(--button-bg)", borderRadius: "6px"}}>{`${key}: ${value} `}</span>
                            })
                        }
                    </div>

                </div>
            </div>
            <div className="grid-container">
                {
                    Object.entries(filtered).map(([key, value]) => {
                        return (
                            <div key={key} className={"card"}>
                                {
                                    Array.isArray(value)
                                    ? value.map((item, index) => (
                                        <div key={index}>
                                            {renderItem(item)}
                                        </div>
                                    ))
                                    : typeof value === 'object' && value !== null
                                        ? Object.entries(value).map(([key, val]) => (
                                            key !== 'id' &&
                                            <div key={key}>
                                                <strong>{key}:</strong> {renderItem(val)}
                                            </div>
                                        ))
                                        : renderItem(value)
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};