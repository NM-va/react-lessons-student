export enum Path {
    DASHBOARD = '/dashboard',
    USERS = '/users',
    USERS_CREATE = '/users/create',
    USERS_LIST = '/users/list',
    USERS_ROLES = '/users/roles',
    USERS_USER_ID = '/users/:userId',
    USERS_USER_ID_EDIT = '/users/:userId/edit',
    PRODUCTS = '/products',
    PRODUCTS_CREATE = '/products/create',
    PRODUCTS_CATEGORIES  = '/products/categories',
    PRODUCTS_PRODUCT_ID = '/products/:productId',
    PRODUCTS_PRODUCT_ID_EDIT = '/products/:productId/edit',
    ORDERS = '/orders',
    ORDERS_PENDING = 'orders/pending',
    ORDERS_COMPLETED = 'orders/completed',
    ORDERS_CANCELLED = 'orders/cancelled',
    ORDERS_ORDER_ID = 'orders/:orderId',
    SETTINGS = '/settings',
    NOTFOUND = '/*'
}

//Done поправить enum
export enum NavNames {
    USERS = "USERS",
    DASHBOARD = "DASHBOARD",
    PRODUCTS = "PRODUCTS",
    ORDERS = "ORDERS",
    SETTINGS = "SETTINGS",
}

export const NavNamesDict: Record<NavNames, string> = {
    [NavNames.USERS]: "Пользователи",
    [NavNames.DASHBOARD]: "Дашборд",
    [NavNames.PRODUCTS]: "Продукты",
    [NavNames.ORDERS]: "Заказы",
    [NavNames.SETTINGS]: "Настройки",
}

export enum SidebarNames {
    LIST = "LIST",
    CREATE = "CREATE",
    ROLE = "ROLE"
}

export const SidebarNamesDict = {
    [SidebarNames.LIST]: 'Список',
    [SidebarNames.CREATE]: 'Создать',
    [SidebarNames.ROLE]: 'Роли'
}

export enum BreadcrumbsList {
    USERS = "BREADCRUMBS_USERS",
    USERS_CREATE = "BREADCRUMBS_USERS_CREATE",
    USERS_ROLES = "BREADCRUMBS_USERS_ROLES",
    USERS_USER_ID = "BREADCRUMBS_USERS_USER_ID",
    USERS_USER_ID_EDIT = "BREADCRUMBS_USERS_USER_ID_EDIT",
    PRODUCTS = "BREADCRUMBS_PRODUCTS",
    PRODUCTS_CREATE = "BREADCRUMBS_PRODUCTS_CREATE",
    PRODUCTS_CATEGORIES = "BREADCRUMBS_PRODUCTS_CATEGORIES",
    PRODUCTS_PRODUCT_ID = "BREADCRUMBS_PRODUCTS_PRODUCT_ID",
    PRODUCTS_PRODUCT_ID_EDIT = "BREADCRUMBS_PRODUCTS_PRODUCT_ID_EDIT",
    ORDERS = "BREADCRUMBS_ORDERS",
    ORDERS_PENDING = "BREADCRUMBS_ORDERS_PENDING",
    ORDERS_COMPLETED = "BREADCRUMBS_ORDERS_COMPLETED",
    ORDERS_CANCELLED = "BREADCRUMBS_ORDERS_CANCELLED",
    ORDERS_ORDER_ID = "BREADCRUMBS_ORDERS_ORDER_ID"
}

export const BreadcrumbsDict: Record<BreadcrumbsList, string> = {
    [BreadcrumbsList.USERS]: 'Список всех пользователей',
    [BreadcrumbsList.USERS_CREATE]: 'Создание пользователя',
    [BreadcrumbsList.USERS_ROLES]: 'Управление ролями',
    [BreadcrumbsList.USERS_USER_ID]: 'Профиль пользователя',
    [BreadcrumbsList.USERS_USER_ID_EDIT]: 'Редактирование пользователя',
    [BreadcrumbsList.PRODUCTS]: 'Список товаров',
    [BreadcrumbsList.PRODUCTS_CREATE]: 'Добавить товар',
    [BreadcrumbsList.PRODUCTS_CATEGORIES]: 'Категории товаров',
    [BreadcrumbsList.PRODUCTS_PRODUCT_ID]: 'Детали товара',
    [BreadcrumbsList.PRODUCTS_PRODUCT_ID_EDIT]: 'Редактировать товар',
    [BreadcrumbsList.ORDERS]: 'Все заказы',
    [BreadcrumbsList.ORDERS_PENDING]: 'Заказы в обработке',
    [BreadcrumbsList.ORDERS_COMPLETED]: 'Выполненные заказы',
    [BreadcrumbsList.ORDERS_CANCELLED]: 'Отмененные заказы',
    [BreadcrumbsList.ORDERS_ORDER_ID]: 'Детали заказа'
}


export const orders = [
    {
        id: 'order-1001',
        userId: 'user-123',
        date: '2023-06-15',
        items: [
            { productId: 'prod-1001', name: 'iPhone 13 Pro', quantity: 1, price: 999 },
            { productId: 'prod-1003', name: 'Чехол для iPhone', quantity: 2, price: 19.99 }
        ],
        total: 1038.98,
        status: 'completed'
    },
    {
        id: 'order-1002',
        userId: 'user-456',
        date: '2023-06-18',
        items: [
            { productId: 'prod-1002', name: 'MacBook Air M2', quantity: 1, price: 1199 }
        ],
        total: 1199,
        status: 'pending'
    }
];