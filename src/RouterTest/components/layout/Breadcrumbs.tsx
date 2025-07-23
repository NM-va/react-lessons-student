import 'react';
import { Link, useLocation } from 'react-router-dom';
import cls from './Breadcrumb.module.css';
import { AllPathNamesDict } from '../../utils/constants';

export const Breadcrumbs = () => {
    let location = useLocation();
    let pathParts = location.pathname
        .split('/')
        .filter(part => part !== '')
        .map(v => v.replace(/:/g, ''));


    return (
        <div className={cls.breadcrumbs}>
            Хлебные крошки: 
            {
                pathParts.map((name: string, index: number) => {
                    const pathTo = `/${pathParts.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathParts.length - 1;
                    const label: string = AllPathNamesDict[name] || name;

                    return (
                        <span key={pathTo} className={cls.breadcrumbItem}>
                            {
                                isLast
                                ? <span className={cls.breadcrumbCurrent}>{label}</span>
                                : <Link to={pathTo} className={cls.breadcrumbLink}>{label}</Link>
                            }
                            {!isLast && <span className={cls.breadcrumbSeparator}> / </span>}
                        </span>
                    )
                })
            }
        </div>
    );
};
