import { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { Path } from './utils/constants';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Settings } from './pages/Settings/Settings';
import { RoutesType } from './types/routes';
import { NotFound } from './components/common/NotFound';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { UniversalLayout } from './components/common/UniversalLayout';
import { ordersRoutes, productsRoutes, userRoutes } from './utils/routes';
import { UsersLayout } from './components/layout/UsersLayout';

export const RouterTest = () => {
    
    return (
        <div>
            <Router>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<AdminLayout />}>
                            <Route path={Path.DASHBOARD} element={<Dashboard />} />
                            <Route path={Path.USERS} element={<UsersLayout routes={userRoutes}  />}>
                                <Route path={Path.USERS} element={<Navigate to={`${Path.USERS_LIST}`} replace />} />
                                {userRoutes.map((item: RoutesType) => (
                                    <Route path={item.path} element={<item.element />} key={item.path} />
                                ))}
                            </Route>
                            <Route path={Path.PRODUCTS} element={<UniversalLayout routes={productsRoutes} />}>
                                <Route path={Path.PRODUCTS} element={<Navigate to={`${Path.PRODUCTS}`} replace />} />
                                {productsRoutes.map((item: RoutesType) => (
                                    <Route path={item.path} element={<item.element />} key={item.path} />
                                ))}
                            </Route>
                            <Route path={Path.ORDERS} element={<UniversalLayout routes={ordersRoutes} />}>
                                <Route path={Path.ORDERS} element={<Navigate to={`${Path.ORDERS}`} replace />} />
                                {ordersRoutes.map((item: RoutesType) => (
                                    <Route path={item.path} element={<item.element />} key={item.path} />
                                ))}
                            </Route>
                            <Route path={Path.SETTINGS} element={<Settings />} />
                            <Route path={Path.NOTFOUND} element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>

    )
}