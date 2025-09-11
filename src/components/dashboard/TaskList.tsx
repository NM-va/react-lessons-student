import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CircularProgress,
    LinearProgress,
    TextField,
    Typography
} from '@mui/material';
import { TaskItem } from '../Tasks/components/TaskItem';
import { TaskType } from '../../schemas/task/domain';
import { FilterType } from '../../types/index';
import React, { JSX, useEffect, useState } from 'react';
import { useGetTasksQuery } from '../../api/tasksApi';
import { useAppDispatch } from '../../store/hooks';
import { setTasks, changeTasksFilter, selectFilteredTasks, setSearch } from './store/store';
import { useSelector } from 'react-redux';


export const TaskList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<FilterType>(FilterType.ALL);

    // Done: Состояние задач и фильтров
    // TODO: Функции фильтрации
    // Done: Обработчики действий


    const handleChangeFilter = (filter: FilterType) => {
        dispatch(changeTasksFilter(filter));
    };
    const changeSearchTask = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchTask = () => {
        dispatch(setSearch(searchValue));
    };

    //todo сделать фильтр
    const {
        data: tasks = [],
        error,
        isLoading,
        isFetching,
    } = useGetTasksQuery('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTasks(tasks));
    }, [tasks]);

    //todo dispatch tasks to store and filteredData and searchValue string
    //todo dispatch searchValue

    const filteredTask = useSelector(selectFilteredTasks);


    if (error) return <Box component="div">Ошибка</Box>;
    if (!tasks?.length) return <Box component="div">Пусто</Box>;

    return (
        <Card>
            {isLoading && <LinearProgress/>}
            <CardContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h5" sx={{ mb: 3 }}>
                        Мои задачи ({tasks.length})
                    </Typography>
                    <ButtonGroup>
                        <Button onClick={() => handleChangeFilter(FilterType.ALL)}
                        >{FilterType.ALL}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.ACTIVE)}
                        >{FilterType.ACTIVE}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.COMPLETED)}
                        >{FilterType.COMPLETED}</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField id="outlined-basic" label="Search task" variant="outlined" onChange={changeSearchTask} value={searchValue}/>
                    <Button onClick={handleSearchTask}>Найти</Button>
                </Box>

                {/* TODO: Поиск и фильтры */}
                {/* TODO: Список задач */}

                {isFetching && <CircularProgress/>}
                {filteredTask.map((task: TaskType) => (
                    <TaskItem key={task.taskId} task={task}/>
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
                <CircularProgress/>
            </Box>
        </Box>
    )
}