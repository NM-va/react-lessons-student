import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavNamesDict, Path } from '../../utils/constants';
import cls from './HeaderNavigation.module.css';

export const HeaderNavigation = () => {
    const getNavLinkClass = (isActive: boolean): string =>
        `${cls.navLink} ${isActive ? cls.active : ''}`;
    
    return (
        <nav className={cls.headerNav}>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                     to={Path.DASHBOARD}
            >{NavNamesDict.DASHBOARD}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.USERS}
            >{NavNamesDict.USERS}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.PRODUCTS}
            >{NavNamesDict.PRODUCTS}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.ORDERS}
            >{NavNamesDict.ORDERS}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.SETTINGS}
            >{NavNamesDict.SETTINGS}</NavLink>
        </nav>
    );
};
