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
import { setTasks, changeTasksFilter, selectFilteredTasks, setSearch, selectState, selectFilter } from './store/store';
import { useSelector } from 'react-redux';


export const TaskList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    // const [taskStatus, setTaskStatus] = useState<FilterType>(FilterType.ALL);
	const filteredTasks = useSelector(selectFilteredTasks);
	const state = useSelector(selectState);
	const filter = useSelector(selectFilter);
	const isInitializedRef = useRef<boolean>(false);
	const [createTask] = useCreateTaskMutation();

    console.log('filteredTasks', filteredTasks);

    const [titleTask, setTitleTask] = useState<string>('');
    const changeTitleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.target.value);
    };

	console.log('%csrc/components/dashboard/TaskList.tsx:28 state', 'color: #007acc;', state);

	//Done сделать фильтр
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
					"title": `${titleTask}`,
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
                        variant={filter === FilterType.ALL ? 'contained' : "outline"}>{FilterType.ALL}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.ACTIVE)}
                        variant={filter === FilterType.ACTIVE ? 'contained' : "outline"}>{FilterType.ACTIVE}</Button>
                        <Button onClick={() => handleChangeFilter(FilterType.COMPLETED)}
                        variant={filter === FilterType.COMPLETED ? 'contained' : "outline"}>{FilterType.COMPLETED}</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField id="outlined-basic" label="Search task" variant="outlined" onChange={changeSearchTask} value={searchValue}/>
                    <Button onClick={handleSearchTask}>Найти</Button>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField id="outlined-basic" label="Create task" variant="outlined" onChange={changeTitleTask} value={titleTask}/>
                    <Button onClick={handleCreateTask}>Создать</Button>
                </Box>

                {/* TODO: Поиск и фильтры */}
                {/* TODO: Список задач */}

                {isFetching && <CircularProgress/>}

                {
                    (!tasks?.length) ? <Box component="div">Пусто</Box>
                    : filteredTasks.map((task: TaskType) => (
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