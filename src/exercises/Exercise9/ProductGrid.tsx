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

enum Categories {
  NAME = 'name',
  CATEGORY = 'category',
  PRICE = 'price',
  DESCRIPTION = 'description',
  TAGS = 'tags'

}

export function ProductGrid({ data = [], selectedCategory, searchValue }: Props) {
    console.log('data', data);
    console.log('selectedCategory', selectedCategory);

    const bgHighlight: string = 'var(--accent-color)';


    return (
        // DONE использовать счетчик категорий
        // DONE используем для каждого поля Highlight
        
        <>
            <CategoriesCount<CategoriesCount> data={data} categoryName={'category'} />
            <div className="products-grid">
                {data.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <h3 className="product-name">{
                              `${selectedCategory}` === "name"
                              ? <Highlight text={product.name} searchValue={searchValue}
                                           bgSelectedText={bgHighlight}/>
                              : product.name

                            }</h3>
                            <span className="product-category">{
                              `${selectedCategory}` === "category"
                              ? <Highlight text={product.category} searchValue={searchValue}
                                                                           bgSelectedText={bgHighlight}/>
                                : product.category
                            }</span>
                        </div>
    
                        <div className="product-body">
                            <p className="product-description">
                              {
                                `${selectedCategory}` === "description"
                                ? <Highlight text={product.description} searchValue={searchValue}
                                          bgSelectedText={bgHighlight}/>
                                  : product.description
                              }
                            </p>
                            <div className="product-price">{
                              `${selectedCategory}` === "price"
                              ? <Highlight text={String(product.price)}
                                                                       searchValue={searchValue}
                                                                       bgSelectedText={bgHighlight}/>
                                : product.price
                            }</div>
                        </div>
    
                        {product.tags && product.tags.length > 0 && (
                            <div className="product-tags">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="product-tag">
                                        {
                                          `${selectedCategory}` === "tags"
                                          ? <Highlight text={tag} searchValue={searchValue} bgSelectedText={bgHighlight}/>
                                            : tag
                                        }
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