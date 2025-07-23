import { RoutesType } from '../../types/routes';
import _isFunction from 'lodash/isFunction';
import { Outlet } from 'react-router-dom';
import { SidebarNavigation } from '../layout/SidebarNavigation';
import cls from "../layout/AdminLayout.module.css";
import { useMemo } from 'react';

export interface  UniversalLayoutProps {
    routes: RoutesType[];
    customFilter?: (routes: RoutesType[]) => RoutesType[];
}

export const UniversalLayout = ({ routes, customFilter }: UniversalLayoutProps) => {
    const filteredRoutes: RoutesType[] = useMemo(() => _isFunction(customFilter) ? customFilter(routes) : routes, [routes, customFilter]);

    return (
        <div className={cls.mainContentBox}>
            <SidebarNavigation menuList={filteredRoutes} />
            <Outlet />
        </div>
    );
}