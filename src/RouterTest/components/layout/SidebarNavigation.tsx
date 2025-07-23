import { generatePath, NavLink, useParams } from 'react-router-dom';
import cls from './sidebarNav.module.css';
import { RoutesType } from '../../types/routes';
import { Path } from '../../utils/constants';

export interface Props {
    menuList: RoutesType[];
}

const replaceDynamicParams = (path: string, params: Record<string, string | undefined>) => {
    return path.replace(/:\w+/g, (match) => {
        const paramName = match.substring(1); // убираем двоеточие
        return params[paramName] || match; // если параметра нет, оставляем как было
    });
};

export const SidebarNavigation = (props: Props) => {
    const { menuList } = props;
    const params = useParams();
    
    //Done сделать активным элемент
    const getNavLinkClass = (isActive: boolean): string =>
        `${cls.sidebarNavItem} ${isActive ? cls.active : ''}`;
    
    const shouldShowItem = (item: RoutesType) => {
        if (!!params.userId) return true;
        
        return !item.path.includes(':userId');
    };
    
    return (
        <nav className={cls.sidebarNav}>
            {menuList.map((item: RoutesType ) => {
             
                if (!shouldShowItem(item)) return null;
                const pathWithParams = replaceDynamicParams(item.path, params);

                //Done сделать активным элемент
                return (
                    <NavLink
                        key={item.path}
                        className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                        to={pathWithParams}
                    >
                        {item.label}
                    </NavLink>
                )
            })}
            {/* <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`} to={Path.USERS}>{Sidebar.LIST}</NavLink>
            <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`}  to={Path.USERS_CREATE}>{Sidebar.CREATE}</NavLink>
            <NavLink className={`${cls.sidebarNavItem} ${isActiveNavLink}`}  to={Path.USERS_ROLES}>{Sidebar.ROLE}</NavLink> */}
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
