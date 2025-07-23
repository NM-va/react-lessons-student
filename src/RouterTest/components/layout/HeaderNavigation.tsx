import 'react';
import { NavLink } from 'react-router-dom';
import { AllPathNamesDict, Path } from '../../utils/constants';
import cls from './HeaderNavigation.module.css';

export const HeaderNavigation = () => {
    const getNavLinkClass = (isActive: boolean): string =>
        `${cls.navLink} ${isActive ? cls.active : ''}`;
    
    return (
        <nav className={cls.headerNav}>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                     to={Path.DASHBOARD}
            >{AllPathNamesDict.dashboard}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.USERS}
            >{AllPathNamesDict.users}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.PRODUCTS}
            >{AllPathNamesDict.products}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.ORDERS}
            >{AllPathNamesDict.orders}</NavLink>
            <NavLink className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                 to={Path.SETTINGS}
            >{AllPathNamesDict.settings}</NavLink>
        </nav>
    );
};
