import {
    Card, CardContent,
    Box,
    CircularProgress,
    CardHeader,
    LinearProgress, Button, ButtonGroup
} from '@mui/material';
import { TaskItem } from '../Tasks/components/TaskItem';
import { TaskType } from '../../schemas/task/domain';
import { FilterType } from '../../types/index';
import React, { JSX, useState } from 'react';
import { useGetTasksQuery } from '../../api/tasksApi';
import { useDispatch } from 'react-redux';

export const TaskList: React.FC = () => {
  // TODO: Состояние задач и фильтров
  // TODO: Функции фильтрации
  // TODO: Обработчики действий

    const handleChangeFilter = (FilterType: string) => {

    };

    //todo сделать фильтр
    const {
        data: tasks = [],
        error,
        isLoading,
        isFetching,
    } = useGetTasksQuery('');

    if (error) return <Box component="div">Ошибка</Box>;
    if (!tasks?.length) return <Box component="div">Пусто</Box>;


    const filteredTasks = () => {
        return tasks.filter((item: TaskType) => {
            item.isCompleted === filter
        })
    };
  
  return (
      <Card>
        {isLoading && <LinearProgress />}
        <CardHeader>
            Мои задачи ({tasks.length})
            <ButtonGroup>
                <Button onClick={() => handleChangeFilter(FilterType.ALL)}>{FilterType.ALL}</Button>
                <Button onClick={() => handleChangeFilter(FilterType.ACTIVE)}>{FilterType.ACTIVE}</Button>
                <Button onClick={() => handleChangeFilter(FilterType.COMPLETED)}>{FilterType.COMPLETED}</Button>
            </ButtonGroup>
        </CardHeader>
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