export enum Path {
    DASHBOARD = '/dashboard',
    USERS = '/users',
    USERS_CREATE = '/users/create',
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
    ERROR = '/*'
}

export enum Nav {
    DASHBOARD = 'Дашборд',
    USERS = 'Пользователи',
    PRODUCTS = 'Товары',
    ORDERS = 'Заказы',
    SETTINGS = 'Настройки',
}

export enum Sidebar {
    LIST ='Список',
    CREATE = 'Создать',
    ROLE = 'Роли'
}

export enum Breadcrumbs {
    BREADCRUMBS_USERS = 'Список всех пользователей',
    BREADCRUMBS_USERS_CREATE = 'Создание пользователя',
    BREADCRUMBS_USERS_ROLES = 'Управление ролями',
    BREADCRUMBS_USERS_USER_ID = 'Профиль пользователя',
    BREADCRUMBS_USERS_USER_ID_EDIT = 'Редактирование пользователя',
    BREADCRUMBS_PRODUCTS = 'Список товаров',
    BREADCRUMBS_PRODUCTS_CREATE = 'Добавить товар',
    BREADCRUMBS_PRODUCTS_CATEGORIES = 'Категории товаров',
    BREADCRUMBS_PRODUCTS_PRODUCT_ID = 'Детали товара',
    BREADCRUMBS_PRODUCTS_PRODUCT_ID_EDIT = 'Редактировать товар',
    BREADCRUMBS_ORDERS = 'Все заказы',
    BREADCRUMBS_ORDERS_PENDING = 'Заказы в обработке',
    BREADCRUMBS_ORDERS_COMPLETED = 'Выполненные заказы',
    BREADCRUMBS_ORDERS_CANCELLED = 'Отмененные заказы',
    BREADCRUMBS_ORDERS_ORDER_ID = 'Детали заказа'
}