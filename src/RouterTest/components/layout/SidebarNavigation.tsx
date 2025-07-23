import { NavLink, useParams } from 'react-router-dom';
import cls from './sidebarNav.module.css';
import { RoutesType } from '../../types/routes';

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
    
    
    return (
        <nav className={cls.sidebarNav}>
            {menuList.map((item: RoutesType ) => {
            
                const pathWithParams = replaceDynamicParams(item.path, params);

                //Done сделать активным элемент
                return (
                    <NavLink
                        key={item.path}
                        className={({ isActive }: { isActive: boolean }) => getNavLinkClass(isActive)}
                        to={pathWithParams}
                        end
                    >
                        {item.label}
                    </NavLink>
                )
            })}
        </nav>
    );
};
