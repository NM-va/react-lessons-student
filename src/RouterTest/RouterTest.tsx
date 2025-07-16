import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderNavigationRoutes } from './utils/routes';
import { RoutesType } from './types/routes';
import { AdminLayout } from './components/layout/AdminLayout';
import { Path } from './utils/constants';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UsersList } from './pages/Users/UsersList';
import { ProductsList } from './pages/Products/ProductsList';
import { OrdersList } from './pages/Orders/OrdersList';
import { Settings } from './pages/Settings/Settings';
import { CreateUser } from './pages/Users/CreateUser';
import { UserRoles } from './pages/Users/UserRoles';
import { CreateProduct } from './pages/Products/CreateProduct';
import { Categories } from './pages/Products/Categories';
import { PendingOrders } from './pages/Orders/PendingOrders';
import { CompletedOrders } from './pages/Orders/CompletedOrders';
import { OrderDetails } from './pages/Orders/OrderDetails';

export const RouterTest = () => {
    
    return (
        <div>
            <Router>
                <AdminLayout/>
                <Routes>
                    <Route path={Path.DASHBOARD} element={Dashboard}/>
                    <Route path={Path.USERS} element={UsersList}>
                        <Route path={Path.USERS_CREATE} element={CreateUser}/>
                        <Route path={Path.USERS_ROLES} element={UserRoles}/>
                    </Route>
                    <Route path={Path.PRODUCTS} element={ProductsList}>
                        <Route path={Path.PRODUCTS_CREATE} element={CreateProduct}/>
                        <Route path={Path.PRODUCTS_CATEGORIES} element={Categories}/>
                    </Route>
                    <Route path={Path.ORDERS} element={OrdersList}>
                        <Route path={Path.ORDERS_PENDING} element={PendingOrders}/>
                        <Route path={Path.ORDERS_COMPLETED} element={CompletedOrders}/>
                        <Route path={Path.ORDERS_CANCELLED} element={OrderDetails}/>
                    </Route>
                    <Route path={Path.SETTINGS} element={Settings}/>
                </Routes>
            </Router>
        </div>

    )
}