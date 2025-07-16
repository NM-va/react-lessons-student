import React, { useEffect, useState } from 'react';
import { HeaderNavigation } from './HeaderNavigation';
import { SidebarNavigation } from './SidebarNavigation';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { Path } from '../../utils/constants';
import cls from './AdminLayout.module.css';

export const AdminLayout = () => {
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
    let location = useLocation();
    
    useEffect(() => {

        //@ts-ignore
        let locationIncludes = [Path.USERS, Path.USERS_CREATE,
            Path.USERS_ROLES, Path.PRODUCTS, Path.PRODUCTS_CREATE,
            Path.PRODUCTS_CATEGORIES, Path.ORDERS, Path.ORDERS_PENDING,
            Path.ORDERS_COMPLETED, Path.ORDERS_CANCELLED].includes(location.pathname);
    
        locationIncludes ? setIsShowSidebar(true) : setIsShowSidebar(false);
    }, [location.pathname])
    
    
    return (
        <div className={cls.adminLayout}>
            <HeaderNavigation/>
            {isShowSidebar && <SidebarNavigation/>}
            <main className={cls.mainContent}>
                <Breadcrumbs/>
                <Outlet/>
            </main>
        </div>
    );
};
