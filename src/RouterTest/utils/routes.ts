import { RoutesType } from '../types/routes';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { ProductsList } from '../pages/Products/ProductsList';
import { OrdersList } from '../pages/Orders/OrdersList';
import { Settings } from '../pages/Settings/Settings';
import { AllPathNamesDict, Path } from './constants'; // изменил импорт
import { CreateUser } from '../pages/Users/CreateUser';
import { UserRoles } from '../pages/Users/UserRoles';
import { CreateProduct } from '../pages/Products/CreateProduct';
import { Categories } from '../pages/Products/Categories';
import { PendingOrders } from '../pages/Orders/PendingOrders';
import { CompletedOrders } from '../pages/Orders/CompletedOrders';
import { OrderDetails } from '../pages/Orders/OrderDetails';
import { EditUser } from '../pages/Users/EditUser';
import { UserProfile } from '../pages/Users/UserProfile';
import { ProductDetails } from '../pages/Products/ProductDetails';
import { EditProduct } from '../pages/Products/EditProduct';
import { UsersList } from '../pages/Users/UsersList';

//todo добавить
export const HeaderNavigationRoutes: RoutesType[] = [
    { path: Path.DASHBOARD, element: Dashboard },
    { path: Path.USERS, element: UsersList },
    { path: Path.PRODUCTS, element: ProductsList },
    { path: Path.ORDERS, element: OrdersList },
    { path: Path.SETTINGS, element: Settings },
];

export const SidebarNavigationRoutes: RoutesType[] = [
    { path: Path.USERS, element: UsersList },
    { path: Path.USERS_CREATE, element: CreateUser },
    { path: Path.USERS_ROLES, element: UserRoles },
    { path: Path.PRODUCTS, element: ProductsList },
    { path: Path.PRODUCTS_CREATE, element: CreateProduct },
    { path: Path.PRODUCTS_CATEGORIES, element: Categories },
    { path: Path.ORDERS, element: OrdersList },
    { path: Path.ORDERS_PENDING, element: PendingOrders },
    { path: Path.ORDERS_COMPLETED, element: CompletedOrders },
    { path: Path.ORDERS_CANCELLED, element: OrderDetails },
];

export const userRoutes: RoutesType[] = [
    {
        path: Path.USERS_LIST,
        label: 'Список всех пользователей', // или можно создать составной ключ
        element: UsersList,
    },
    {
        path: Path.USERS_CREATE,
        label: 'Создание пользователя',
        element: CreateUser,
        index: true,
    },
    {
        path: Path.USERS_ROLES,
        label: 'Управление ролями',
        element: UserRoles,
    },
    {
        path: Path.USERS_USER_ID,
        label: 'Профиль пользователя',
        element: UserProfile,
    },
    {
        path: Path.USERS_USER_ID_EDIT,
        label: 'Редактирование пользователя',
        element: EditUser,
    },
]

export const productsRoutes: RoutesType[] = [
    {
        path: Path.PRODUCTS,
        label: AllPathNamesDict.products,
        element: ProductsList,
    },
    {
        path: Path.PRODUCTS_CREATE,
        label: 'Добавить товар',
        element: CreateProduct,
        index: true,
    },
    {
        path: Path.PRODUCTS_CATEGORIES,
        label: 'Категории товаров',
        element: Categories,
    },
    {
        path: Path.PRODUCTS_PRODUCT_ID,
        label: 'Детали товара',
        element: ProductDetails,
    },
    {
        path: Path.PRODUCTS_PRODUCT_ID_EDIT,
        label: 'Редактировать товар',
        element: EditProduct,
    },
]

export const ordersRoutes: RoutesType[] = [
    {
        path: Path.ORDERS,
        label: AllPathNamesDict.orders,
        element: OrdersList,
    },
    {
        path: Path.ORDERS_COMPLETED,
        label: 'Выполненные заказы',
        element: CompletedOrders,
        index: true,
    },
    {
        path: Path.ORDERS_PENDING,
        label: 'Заказы в обработке',
        element: PendingOrders,
    },
    {
        path: Path.ORDERS_ORDER_ID,
        label: 'Детали заказа', 
        element: OrderDetails,
    },
]