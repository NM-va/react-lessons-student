import { 
  Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction,
  Checkbox, IconButton, Chip, TextField, Box, ToggleButtonGroup, ToggleButton,
  CircularProgress,
  CardHeader
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TaskItem } from '../Tasks/components/TaskItem';
import { Task } from '../../schemas/task/domain';
import { useState } from 'react';
import { useGetTasksQuery } from '../../api/tasksApi';

export const TaskList: React.FC = () => {
  // TODO: Состояние задач и фильтров
  // TODO: Функции фильтрации
  // TODO: Обработчики действий
    const [filters, setFilters] = useState({});

    const {
        data: tasks,
        error,
        isLoading,
        isFetching,
        refetch
    } = useGetTasksQuery(filters);

    if (isLoading) return <CircularProgress />
    if (error) return <Box component="div">Ошибка</Box>;
    if (!tasks?.length) return <Box component="div">Пусто</Box>;
  
  return (
    <Card>
        <CardHeader>Мои задачи ({tasks.length})</CardHeader>
        <CardContent>
        {/* TODO: Поиск и фильтры */}
        {/* TODO: Список задач */}

            {isFetching && <CircularProgress />}
            {tasks.map((task: Task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </CardContent>
    </Card>
  );
};