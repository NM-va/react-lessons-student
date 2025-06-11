import 'react';
import './ProductGrid.css';
import { Product } from './types';
import { CategoriesCount } from './components/CategoriesCount/CategoriesCount';
import { Highlight } from '../../components/Search/Highlight';

export interface Props {
    data: Product[];
    selectedCategory: string;
    searchValue: string;
}

export function ProductGrid({ data = [], selectedCategory, searchValue }: Props) {

    if (!data.length) {
        return (
            <div>Список пуст</div>
        )
    }

    return (
        // DONE использовать счетчик категорий
        // DONE используем для каждого поля Highlight
        
        <>
            <CategoriesCount<Product> data={data} categoryName={'category'} />
            <div className="products-grid">
                {data.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <h3 className="product-name">
                                <HighlightedText 
                                    searchValue={searchValue}
                                    filterCategory={selectedCategory}
                                    categoryKey='name'
                                    text={product.name}
                                />
                            </h3>
                            <span className="product-category">
                                <HighlightedText
                                    searchValue={searchValue}
                                    filterCategory={selectedCategory}
                                    categoryKey='category'
                                    text={product.category}
                                />
                            </span>
                        </div>
    
                        <div className="product-body">
                            <p className="product-description">
                                <HighlightedText
                                    searchValue={searchValue}
                                    filterCategory={selectedCategory}
                                    categoryKey='description'
                                    text={product.description}
                                />
                            </p>
                            <div className="product-price">
                                <HighlightedText
                                    searchValue={searchValue}
                                    filterCategory={selectedCategory}
                                    categoryKey='price'
                                    text={product.price}
                                />
                            </div>
                        </div>
    
                        {product.tags && product.tags.length > 0 && (
                            <div className="product-tags">
                                {product.tags.map((tag) => (
                                    <span key={tag} className="product-tag">
                                        <HighlightedText
                                            searchValue={searchValue}
                                            filterCategory={selectedCategory}
                                            categoryKey='tags'
                                            text={tag}
                                        />
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}


interface HighlightedTextProps {
    filterCategory: string;
    searchValue: string;
    categoryKey: string;
    text: string | number;
}

export function HighlightedText({ filterCategory, searchValue, categoryKey, text }: HighlightedTextProps) {
    const isAllCategory: boolean = filterCategory === 'all';
    const bgHighlight: string = 'var(--accent-color)';

    return (
        <>
            {(`${filterCategory}` === categoryKey || isAllCategory)
                ? <Highlight text={`${text}`} searchValue={searchValue} bgSelectedText={bgHighlight} />
                : text
            }
        </>
    )
}