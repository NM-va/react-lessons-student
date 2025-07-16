import { Outlet } from 'react-router-dom';
import { SidebarNavigation } from '../../components/layout/SidebarNavigation';
import { RoutesType } from '../../types/routes';
import { Path } from '../../utils/constants';
import { CreateUser } from './CreateUser';
import { UsersList } from './UsetList';
import { UserRoles } from './UserRoles';

    // {path: Path.USERS, component: UsersList},
    // {path: Path.USERS_CREATE, component: CreateUser},
    // {path: Path.USERS_ROLES, component: UserRoles},


//todo  <Route path={Path.USERS} element={<Navigate to={`${Path.USERS_LIST}`} replace  key={Path.USERS  }/>} />

export const userRoutes: RoutesType[] = [
    {
        path: Path.USERS_LIST,
        label: 'Список пользователей',
        component: UsersList,
    },
    {
        path: Path.USERS_CREATE,
        label: 'Создание пользователя',
        component: CreateUser,
        index: true,
    },
    {
        path: Path.USERS_ROLES,
        label: 'Список ролей',
        component: UserRoles,
    },
]


//todo  UsersListLayout сделать универсальным routes: RoutesType[]
export const UsersListLayout = () => {
    return (
        <div>
            {/* <UniversalLayout routes=сюда поместить маршруты пользователей/> */}
            <SidebarNavigation menuList={userRoutes} />
            <Outlet />
        </div>
    );
};
