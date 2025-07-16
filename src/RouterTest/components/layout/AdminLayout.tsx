import 'react';
import { HeaderNavigation } from './HeaderNavigation';
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import cls from './AdminLayout.module.css';

export const AdminLayout = () => {
    return (
        <div className={cls.adminLayout}>
            <HeaderNavigation/>
            
            <main className={cls.mainContent}>
                <Breadcrumbs/>
                <Outlet/>
            </main>
        </div>
    );
};
