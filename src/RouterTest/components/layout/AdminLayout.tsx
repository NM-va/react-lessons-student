import React from 'react';
import { HeaderNavigation } from './HeaderNavigation';
import { SidebarNavigation } from './SidebarNavigation';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
    return (
        <div>
            <HeaderNavigation/>
            <SidebarNavigation/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};
