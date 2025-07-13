import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderNavigationRoutes } from './utils/routes';
import { RoutesType } from './types/routes';

export const RouterTest = () => {
    return (
        <Router>
            <Routes>
                {
                    HeaderNavigationRoutes.map(({path, component}: RoutesType) => {
                        return <Route path={path} component={component}/>
                    })
                }
            </Routes>
        </Router>
    )
}