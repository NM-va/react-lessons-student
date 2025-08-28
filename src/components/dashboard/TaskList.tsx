import { 
  Card, CardContent,
  Box,
  CircularProgress,
  CardHeader,
  LinearProgress
} from '@mui/material';
import { TaskItem } from '../Tasks/components/TaskItem';
import { TaskType } from '../../schemas/task/domain';
import { JSX, useState } from 'react';
import { useGetTasksQuery } from '../../api/tasksApi';

export const TaskList: React.FC = () => {
  // TODO: Состояние задач и фильтров
  // TODO: Функции фильтрации
  // TODO: Обработчики действий
    const [filters, setFilters] = useState({});

    //todo сделать фильтр
    const {
        data: tasks = [],
        error,
        isLoading,
        isFetching,
    } = useGetTasksQuery('');

    if (error) return <Box component="div">Ошибка</Box>;
    if (!tasks?.length) return <Box component="div">Пусто</Box>;
  
  return (
      <Card>
        {isLoading && <LinearProgress />}
        <CardHeader>Мои задачи ({tasks.length})</CardHeader>
        <CardContent>
          {/* TODO: Поиск и фильтры */}
          {/* TODO: Список задач */}

          {isFetching && <CircularProgress />}
          {tasks.map((task: TaskType) => (
            <TaskItem key={task.taskId} task={task} />
          ))}
        </CardContent>
      </Card>
  );
};


export interface Props {
  loading?: boolean;
  children?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  size?: number;
}

function Progress(props: Props) {
    return (
      <Box>
        {props.children}
        <Box className="progress__preloader">
          <CircularProgress />
        </Box>
      </Box>
    )
}