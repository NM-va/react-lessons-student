export const ListItem = React.memo(({task, onTaskToggle, onTaskDelete}) => {
    
    return (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onTaskToggle(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => onTaskDelete(task.id)}>Удалить</button>
        </li>
    )
});