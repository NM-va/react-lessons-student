import 'react';
import './ProductGrid.css';
import { Product } from './types';
import { CategoriesCount } from './components/CategoriesCount/CategoriesCount';
import { Highlight } from '../../components/Search/Highlight';

export interface Props {
    data: Product[];
}

export function ProductGrid({ data = [] }: Props) {
    console.log('data', data)

    return (
        // DONE использовать счетчик категорий
        // DONE используем для каждого поля Highlight
        
        <>
            <CategoriesCount<CategoriesCount> data={data} fieldName={'asd'} labelName={'asd'} />
            <div className="products-grid">
                {data.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <h3 className="product-name"><Highlight text={product.name}  searchValue={'qwe'} bgSelectedText={'qwe'}/></h3>
                            <span className="product-category"><Highlight text={product.category} searchValue={'wer'} bgSelectedText={'wer'}/></span>
                        </div>
    
                        <div className="product-body">
                            <p className="product-description"><Highlight text={product.description} searchValue={'ert'} bgSelectedText={'ert'}/></p>
                            <div className="product-price"><Highlight text={String(product.price)} searchValue={'rty'} bgSelectedText={'rty'}/></div>
                        </div>
    
                        {product.tags && product.tags.length > 0 && (
                            <div className="product-tags">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="product-tag">
                                        <Highlight text={tag} searchValue={'rty'} bgSelectedText={'rty'}/>
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