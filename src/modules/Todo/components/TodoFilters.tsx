import React from 'react';
import { FilterValues } from '../types';
import { useAppDispatch } from '../../../store/hooks';
import { setTodoList } from '../store';

export const TodoFilters = () => {
    const dispatch = useAppDispatch();

    const changeFilter = (filter: FilterValues) => {
        // dispatch(setTodoList(filter));
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {/*<button onClick={() => changeFilter("All")}>All</button>*/}
            {/*<button onClick={() => changeFilter("Active")}>Active</button>*/}
            {/*<button onClick={() => changeFilter("Completed")}>Completed</button>*/}
        </div>
    );
};