import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Path } from '../../utils/constants';

export const HeaderNavigation = () => {
    return (
        <nav>
            <NavLink to={Path.DASHBOARD}>{Nav.DASHBOARD}</NavLink>
            <NavLink to={Path.USERS}>{Nav.USERS}</NavLink>
            <NavLink to={Path.PRODUCTS}>{Nav.PRODUCTS}</NavLink>
            <NavLink to={Path.ORDERS}>{Nav.ORDERS}</NavLink>
            <NavLink to={Path.SETTINGS}>{Nav.SETTINGS}</NavLink>
        </nav>
    );
};
