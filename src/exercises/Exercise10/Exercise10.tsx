import React from 'react'
import {CheckoutStepper} from "./CheckoutStepper.tsx";
import { TaskList } from '../../components/Tasks/TaskList';


// Упражнение 10:
const Exercise10: React.FC = () => {



    return (
        <div className="wrap-container" style={{"color": "#000"}}>
            <h1>Упражнение 10</h1>
            <TaskList/>
            {/*<CheckoutStepper/>*/}
        </div>
    );
};

export default Exercise10;