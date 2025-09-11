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
import React, { JSX, useEffect, useRef, useState } from 'react';
import { useCreateTaskMutation, useGetTasksQuery } from '../../api/tasksApi';
import { useAppDispatch } from '../../store/hooks';
import { setTasks, changeTasksFilter, selectFilteredTasks, setSearch, selectState } from './store/store';
import { useSelector } from 'react-redux';


export const TaskList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    // const [taskStatus, setTaskStatus] = useState<FilterType>(FilterType.ALL);
	const filteredTasks = useSelector(selectFilteredTasks);
	const state = useSelector(selectState);
	const isInitializedRef = useRef<boolean>(false);
	const [createTask] = useCreateTaskMutation();

	console.log('%csrc/components/dashboard/TaskList.tsx:28 state', 'color: #007acc;', state);

	//todo сделать фильтр
    const {
      data: tasks = [],
      error,
      isLoading,
      isFetching,
    } = useGetTasksQuery();

	console.log(tasks);

    // Done: Состояние задач и фильтров
    // TODO: Функции фильтрации
    // Done: Обработчики действий

	useEffect(() => {
		console.log('%csrc/components/dashboard/TaskList.tsx:47 error', 'color: #007acc;', error);
	}, [error])


    const handleChangeFilter = (filter: FilterType) => {
        dispatch(changeTasksFilter(filter));
    };
    const changeSearchTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleCreateTask = async() => {
		try {
			await createTask(
				{
					"title": "task12",
					"priorityLevel": 1,
					"todoListId": "08a7be65-255e-4474-8b72-3b5ec30c2dde",
					"order": 2
				}
			).unwrap();
		} catch (err) {
			console.error('Ошибка Создания задачи:', err);
		}
    };

    const handleSearchTask = () => {
        dispatch(setSearch(searchValue));
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
		//todo разобраться почему происходит бесконечный re-render
		if(!isInitializedRef.current && tasks.length > 0) {
			dispatch(setTasks(tasks));
			isInitializedRef.current = true;
		}
	}, [tasks, dispatch, isInitializedRef]);

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
                    <Button onClick={handleCreateTask}>Создать</Button>
                </Box>

                {/* TODO: Поиск и фильтры */}
                {/* TODO: Список задач */}

                {isFetching && <CircularProgress/>}
                {filteredTasks.map((task: TaskType) => (
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