import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Path } from '../../utils/constants';
import cls from './HeaderNavigation.module.css';

export const HeaderNavigation = () => {
    
    // const getNavLinkStyle = ({ isActive }) => ({
    //     color: isActive ? '#007bff' : '#333',
    //     fontWeight: isActive ? 'bold' : 'normal',
    //     textDecoration: 'none'
    // });
    //
    // const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    //     `${cls.navLink} ${isActive ? cls.active : ''}`;
    
    return (
        <nav className={cls.headerNav}>
            <NavLink className={cls.navLink} to={Path.DASHBOARD}>{Nav.DASHBOARD}</NavLink>
            <NavLink className={cls.navLink} to={Path.USERS}>{Nav.USERS}</NavLink>
            <NavLink className={cls.navLink} to={Path.PRODUCTS}>{Nav.PRODUCTS}</NavLink>
            <NavLink className={cls.navLink} to={Path.ORDERS}>{Nav.ORDERS}</NavLink>
            <NavLink className={cls.navLink} to={Path.SETTINGS}>{Nav.SETTINGS}</NavLink>
        </nav>
    );
};
