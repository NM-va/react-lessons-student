import React, { useEffect, useState } from 'react'
import { LiveSearchSelect } from '../../components/LiveSearchSelect/LiveSearchSelect';

import "../../components/LiveSearchSelect/styles/LiveSearchSelect.css";
import { ProductGrid } from './ProductGrid';
import { Product } from './types';
import _ from 'lodash';

export interface Category {
    value: string;
    label: string;
}

export const sampleProducts: Product[] = [
    { id: 1, name: 'iPhone 14', category: 'electronics', price: 999, description: 'Смартфон Apple', tags: ['телефон', 'apple']},
    { id: 2, name: 'Samsung Galaxy S23', category: 'electronics', price: 899, description: 'Смартфон Samsung', tags: ['телефон', 'samsung'] },
    { id: 3, name: 'MacBook Pro', category: 'electronics', price: 1999, description: 'Ноутбук Apple', tags: ['ноутбук', 'apple'] },
    { id: 4, name: 'Красное платье', category: 'clothing', price: 89, description: 'Элегантное платье', tags: ['платье', 'красное'] },
    { id: 5, name: 'Джинсы Levis', category: 'clothing', price: 120, description: 'Классические джинсы', tags: ['джинсы', 'levis'] },
    { id: 6, name: 'Спортивные кроссовки', category: 'shoes', price: 150, description: 'Кроссовки для бега', tags: ['кроссовки', 'спорт'] },
    { id: 7, name: 'Кожаные ботинки', category: 'shoes', price: 200, description: 'Классические ботинки', tags: ['ботинки', 'кожа'] },
    { id: 8, name: 'Сковорода', category: 'home', price: 45, description: 'Антипригарная сковорода', tags: ['кухня', 'посуда'] },
    { id: 9, name: 'Диван-кровать', category: 'home', price: 899, description: 'Удобный диван', tags: ['мебель', 'диван'] },
    { id: 10, name: 'Роман "1984"', category: 'books', price: 15, description: 'Книга Джорджа Оруэлла', tags: ['книга', 'фантастика'] },
    { id: 11, name: 'AirPods Pro', category: 'electronics', price: 299, description: 'Беспроводные наушники Apple', tags: ['наушники', 'apple'] },
    { id: 12, name: 'Черная куртка', category: 'clothing', price: 179, description: 'Теплая зимняя куртка', tags: ['куртка', 'зима'] },
    { id: 13, name: 'Сандалии летние', category: 'shoes', price: 75, description: 'Удобные летние сандалии', tags: ['сандалии', 'лето'] },
    { id: 14, name: 'Пылесос Dyson', category: 'home', price: 450, description: 'Мощный беспроводной пылесос', tags: ['техника', 'уборка'] },
    { id: 15, name: 'Учебник JavaScript', category: 'books', price: 35, description: 'Современный учебник программирования', tags: ['учебник', 'программирование'] }
];



export const monoSelectOptions: Category[] = [
    { value: 'all', label: 'все' },
    { value: 'name', label: 'по названию' },
    { value: 'description', label: 'по описанию' },
    { value: 'price', label: 'по цене' },
    { value: 'category', label: 'по категории' },
    { value: 'tags', label: 'по тегам' }
];

// Упражнение 9:
const Exercise9: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [data, setData] = useState<Product[]>(sampleProducts);
    const [filteredData, setFilteredData] = useState<Product[]>(sampleProducts);
    const [selectedOption, setSelectedOption] = useState<Category>(monoSelectOptions[0]);
    
    const onChangeMonoSelect = (value: Category) => {
        console.log('value', value)
        setSelectedOption(_.cloneDeep(value));
    };
    
    useEffect(() => {
        console.log("SelectedOption updated:", selectedOption);
    }, [selectedOption]);
    
    const onSearchChange = (newValue: string) => {
        // DONE фильтрацию делать тут по категории
        
        setSearchValue(newValue);
    
        if (newValue === '') {
            setFilteredData(data);
            return;
        }

        const filtered = data.filter((item) => {
            if (selectedOption.value === 'all') {
                return Object.values(item).some((value) => {
                    return String(value).toLowerCase().includes(newValue.toLowerCase());
                })
            }
            
            return item[selectedOption.value]?.toLowerCase().includes(newValue.toLowerCase());;
        });
        
        setFilteredData(filtered);
    };

    return (
        <div className="wrap-container" style={{"color": "#000"}}>
            <h1>Упражнение 8</h1>
            
            <LiveSearchSelect<Category>
                data={monoSelectOptions}
                searchQuery={searchValue}
                selectedCategory={selectedOption}
                onSearchChange={onSearchChange}
                onCategoryChange={onChangeMonoSelect}
                fieldName='value'
                labelName='label'
            />

            <ProductGrid data={filteredData} selectedCategory={selectedOption.value} searchValue={searchValue} />
        </div>
    );
};

export default Exercise9;