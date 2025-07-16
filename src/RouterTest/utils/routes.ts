import { RoutesType } from '../types/routes';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { UsersList } from '../pages/Users/UsersList';
import { ProductsList } from '../pages/Products/ProductsList';
import { OrdersList } from '../pages/Orders/OrdersList';
import { Settings } from '../pages/Settings/Settings';
import { Path } from './constants';
import { CreateUser } from '../pages/Users/CreateUser';
import { UserRoles } from '../pages/Users/UserRoles';
import { CreateProduct } from '../pages/Products/CreateProduct';
import { Categories } from '../pages/Products/Categories';
import { PendingOrders } from '../pages/Orders/PendingOrders';
import { CompletedOrders } from '../pages/Orders/CompletedOrders';
import { OrderDetails } from '../pages/Orders/OrderDetails';

export const HeaderNavigationRoutes: RoutesType[] = [
    {path: Path.DASHBOARD, component: Dashboard},
    {path: Path.USERS, component: UsersList},
    {path: Path.PRODUCTS, component: ProductsList},
    {path: Path.ORDERS, component: OrdersList},
    {path: Path.SETTINGS, component: Settings},
];

export const SidebarNavigationRoutes: RoutesType[] = [
    {path: Path.USERS, component: UsersList},
    {path: Path.USERS_CREATE, component: CreateUser},
    {path: Path.USERS_ROLES, component: UserRoles},
    {path: Path.PRODUCTS, component: ProductsList},
    {path: Path.PRODUCTS_CREATE, component: CreateProduct},
    {path: Path.PRODUCTS_CATEGORIES, component: Categories},
    {path: Path.ORDERS, component: OrdersList},
    {path: Path.ORDERS_PENDING, component: PendingOrders},
    {path: Path.ORDERS_COMPLETED, component: CompletedOrders},
    {path: Path.ORDERS_CANCELLED, component: OrderDetails},
];