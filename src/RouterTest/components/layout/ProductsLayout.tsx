import _isFunction from 'lodash/isFunction';
import { RoutesType } from '../../types/routes';
import { UniversalLayout, UniversalLayoutProps } from '../common/UniversalLayout';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

export interface ProductsLayoutProps extends UniversalLayoutProps {
    //add something specific props
}

export const ProductsLayout = (props: ProductsLayoutProps) => {
    const { routes,  ...universalLayoutProps } = props;
    const params = useParams();
    
    const shouldShowItem = useCallback((item: RoutesType) => {
        if (!!params.productId) return true;
        
        return !item.path.includes(':productId');
    }, [params]);
    
    const filterForRoutes = useCallback((data: RoutesType[]): RoutesType[] => {
        return data.filter(shouldShowItem);
    }, [params]);
    
    return (
        <UniversalLayout routes={routes} customFilter={filterForRoutes} {...universalLayoutProps} />
    );
}