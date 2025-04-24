import { useMemo } from 'react';
import { ListItem } from './ListItem';

export function TaskList({ tasks, onTaskToggle, onTaskDelete }) {
    
    //массив не должен пересоздаваться при каждом рендере иначе это заставит пересчитывать функцию completedCount, для этого используем хук useMemo
    let stableTasks = useMemo(() => tasks, []);
    
    //для сложных, больших вычислений используем хук useMemo чтобы при обновлении страницы вычисления не выполнялись заново,
    // заново вычисления будут выполняться при изменении массива tasks
    const completedCount = useMemo(() => {
        stableTasks.filter(task => task.completed).length
    }, [stableTasks]);
    
    
    //спользование useMemo здесь возможно будет лишним
    const pendingCount = tasks.length - completedCount;
    
    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a.completed === b.completed) {
            return a.title.localeCompare(b.title);
        }
        return a.completed ? 1 : -1;
    });
    

    
    return (
        <div>
            <div className="stats">
                <p>Всего задач: {tasks.length}</p>
                <p>Выполнено: {completedCount}</p>
                <p>Осталось: {pendingCount}</p>
            </div>
            
            <ul className="task-list">
                {sortedTasks.map(task => (
                    <ListItem task={task} onTaskToggle={onTaskToggle} onTaskDelete={onTaskDelete} />
                ))}
            </ul>
        </div>
    );
}