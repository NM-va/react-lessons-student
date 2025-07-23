import { RoutesType } from '../../types/routes';
import { Outlet } from 'react-router-dom';
import { SidebarNavigation } from '../layout/SidebarNavigation';
import cls from "../layout/AdminLayout.module.css";

export const UniversalLayout = ({ routes }: RoutesType[]) => {
    return (
        <div className={cls.mainContentBox}>
            <SidebarNavigation menuList={routes} />
            <Outlet />
        </div>
    );
}