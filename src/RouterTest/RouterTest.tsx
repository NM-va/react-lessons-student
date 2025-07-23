import { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
// import { HeaderNavigationRoutes } from './utils/routes';
// import { RoutesType } from './types/routes';
import { AdminLayout } from './components/layout/AdminLayout';
import { Path } from './utils/constants';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UsersListLayout } from './pages/Users/UsersListLayout';
import { ProductsList } from './pages/Products/ProductsList';
import { OrdersList } from './pages/Orders/OrdersList';
import { Settings } from './pages/Settings/Settings';
import { CreateProduct } from './pages/Products/CreateProduct';
import { Categories } from './pages/Products/Categories';
import { PendingOrders } from './pages/Orders/PendingOrders';
import { CompletedOrders } from './pages/Orders/CompletedOrders';
import { OrderDetails } from './pages/Orders/OrderDetails';
import { RoutesType } from './types/routes';
import { NotFound } from './components/common/NotFound';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { UniversalLayout } from './components/common/UniversalLayout';
import { ordersRoutes, productsRoutes, userRoutes } from './utils/routes';

export const RouterTest = () => {
    
    return (
        <div>
            <Router>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<AdminLayout />}>
                            <Route path={Path.DASHBOARD} element={<Dashboard />} />
                            <Route path={Path.USERS} element={<UniversalLayout routes={userRoutes} />}>
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
                            <Route path={Path.ORDERS} element={<UniversalLayout routed={ordersRoutes} />}>
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