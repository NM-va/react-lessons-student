import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cls from './Breadcrumb.module.css';

export const Breadcrumbs = () => {
    let location = useLocation();
    let pathParts = location.pathname.split('/').filter(part => part !== '');



    return (
        <div className={cls.breadcrumbs}>
            Хлебные крошки: 
            {
                pathParts.map((item: string, index: number) => {
                const pathTo = `/${pathParts.slice(0, index + 1).join('/')}`;
                const isLast = index === pathParts.length - 1;
                    return (
                        <span key={pathTo} className={cls.breadcrumbItem}>
                            {
                                isLast
                                ? <span className={cls.breadcrumbCurrent}>{item}</span>
                                : <Link to={pathTo} className={cls.breadcrumbLink}>{item}</Link>
                            }
                            {!isLast && <span className={cls.breadcrumbSeparator}> / </span>}
                        </span>
                    )
                })
            }
        </div>
    );
};
