import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Path, Sidebar } from '../../utils/constants';
import cls from './sidebarNav.module.css';

export const SidebarNavigation = () => {
    const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
    let location = useLocation();
    
    function isActiveNavLink({isActive}) {
        return isActive ? 'active' : ''
    }
    
    return (
        <nav className={cls.sidebarNav}>
            <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`} to={Path.USERS}>{Sidebar.LIST}</NavLink>
            <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`}  to={Path.USERS_CREATE}>{Sidebar.CREATE}</NavLink>
            <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`}  to={Path.USERS_ROLES}>{Sidebar.ROLE}</NavLink>
            {/*<NavLink className={isActiveNavLink} to={Path.PRODUCTS}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.PRODUCTS_CREATE}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.PRODUCTS_CATEGORIES}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.ORDERS}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.ORDERS_PENDING}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.ORDERS_COMPLETED}>{Sidebar.CREATE}</NavLink>*/}
            {/*<NavLink className={isActiveNavLink} to={Path.ORDERS_CANCELLED}>{Sidebar.CREATE}</NavLink>*/}
        </nav>
    );
};
