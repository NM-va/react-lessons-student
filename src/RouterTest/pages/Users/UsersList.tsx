import 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { Path } from '../../utils/constants';

export const UsersList = () => {
    const navigate = useNavigate();
    const users = [
        { id: '1', name: 'Иван Петров', email: 'ivan@example.com', role: 'admin', status: 'active' },
        { id: '2', name: 'Мария Сидорова', email: 'maria@example.com', role: 'user', status: 'active' },
        { id: '3', name: 'Елена Смирнова', email: 'elena@example.com', role: 'manager', status: 'active' },
        { id: '4', name: 'Алексей Иванов', email: 'alex@example.com', role: 'editor', status: 'pending' },
        { id: '5', name: 'Мария Сидорова', email: 'maria@example.com', role: 'user', status: 'active' },
        { id: '6', name: 'Дмитрий Кузнецов', email: 'dmitry@example.com', role: 'user', status: 'inactive' },
        { id: '7', name: 'Ольга Васильева', email: 'olga@example.com', role: 'user', status: 'banned' },
        { id: '8', name: 'Сергей Николаев', email: 'sergey@example.com', role: 'manager', status: 'active' },
        { id: '9', name: 'Анна Павлова', email: 'anna@example.com', role: 'editor', status: 'pending' },
        { id: '10', name: 'Артем Федоров', email: 'artem@example.com', role: 'user', status: 'active' },
        { id: '11', name: 'Наталья Козлова', email: 'natalia@example.com', role: 'user', status: 'inactive' }
    ];
    
    const handleUserClick = (userId: string) => {
        //@ts-ignore
        let newPath = generatePath(Path.USERS_USER_ID_EDIT, { userId } as Record<string, string>)
        navigate(newPath);
    };
    
    return (
        <div>
            Список пользователей
            //Done вывести пользователей если нужно
    
            <table className="users-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    //@ts-ignore
                    let newPath = generatePath(Path.USERS_USER_ID_EDIT, { userId: user.id } as Record<string, string>);
                    return (
                        <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link to={newPath}>Редактировать</Link>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
};
