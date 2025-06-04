import React, { useState, useMemo } from 'react'
import { LiveSearchSelect } from '../../components/LiveSearchSelect/LiveSearchSelect';
import { BaseItem, CategoryOption } from '../../components/LiveSearchSelect/types';
import { useDebounce } from '../../hooks/useDebounce';
import "./styles/LiveSearchSelect.css";
import { Highlight } from '../../components/Search/Highlight';

export interface Product extends BaseItem {
    price: number;
    description: string;
    tags: string[];
}

export const sampleProducts: Product[] = [
    { id: 1, name: 'iPhone 14', category: 'electronics', price: 999, description: 'Смартфон Apple', tags: ['телефон', 'apple'] },
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

const Exercise8: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchValue, setSearchValue] = useState<string>('');

    const debouncedSearchQuery = useDebounce(searchValue, 300);

    // Создаем опции категорий с подсчетом
    const categoryOptions: CategoryOption[] = useMemo(() => {
        const categoryCounts = sampleProducts.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const uniqueCategories = Object.keys(categoryCounts);

        return [
            { value: 'all', label: 'Все категории', count: sampleProducts.length },
            ...uniqueCategories.map(category => ({
                value: category,
                label: category.charAt(0).toUpperCase() + category.slice(1),
                count: categoryCounts[category]
            }))
        ];
    }, []);

    // Фильтрация данных (в родительском компоненте)
    const filteredData = useMemo(() => {
        let filtered = sampleProducts;

        // Фильтр по категории
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Фильтр по поисковому запросу
        if (debouncedSearchQuery.trim()) {
            const query = debouncedSearchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [selectedCategory, debouncedSearchQuery]);

    // Функция для подсветки текста
    const highlightText = (text: string) => {
        if (!debouncedSearchQuery.trim()) return text;
        return (
            <Highlight
                text={text}
                searchValue={debouncedSearchQuery}
                bgSelectedText="yellow"
            />
        );
    };

    // Render функция для карточки продукта
    const renderProductCard = (item: Product) => (
        <div className="product-card">
            <h3>{highlightText(item.name)}</h3>
            <p className="price">${item.price}</p>
            <p className="description">{highlightText(item.description)}</p>
            <div className="tags">
                {item.tags.map(tag => (
                    <span key={tag} className="tag">
                        {highlightText(tag)}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="wrap-container">
            <h1>Упражнение 8: LiveSearchSelect с фильтрацией</h1>

            {/* Компонент только для поиска и выбора категории */}
            <LiveSearchSelect
                searchQuery={searchValue}
                selectedCategory={selectedCategory}
                onSearchChange={setSearchValue}
                onCategoryChange={setSelectedCategory}
                categoryOptions={categoryOptions}
            />

            {/* Результаты и грид в родительском компоненте */}
            <div className="results-section">
                {filteredData.length > 0 ? (
                    <>
                        <p className="results-count">
                            Найдено: {filteredData.length} из {sampleProducts.length}
                        </p>
                        <div className="product-grid">
                            {filteredData.map(item => (
                                <div key={item.id} className="grid-item">
                                    {renderProductCard(item)}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-results">
                        <p>По запросу "{searchValue}" в категории "{selectedCategory}" ничего не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exercise8;