import 'react';
import './ProductGrid.css';
import { Product } from './types';

export interface Props {
    data: Product[];
}

export function ProductGrid({ data = [] }: Props) {


    return (
        // todo использовать счетчик категорий 
        // todo используем для каждого поля Highlight

        <div className="products-grid">
            {data.map((product) => (
                <div key={product.id} className="product-card">
                    <div className="product-header">
                        <h3 className="product-name">{product.name}</h3>
                        <span className="product-category">{product.category}</span>
                    </div>

                    <div className="product-body">
                        <p className="product-description">{product.description}</p>
                        <div className="product-price">${product.price}</div>
                    </div>

                    {product.tags && product.tags.length > 0 && (
                        <div className="product-tags">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="product-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}