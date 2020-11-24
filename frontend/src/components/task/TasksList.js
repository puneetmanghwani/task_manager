
// ***React Imports****
import React, { useState, useEffect } from 'react';

// ***Library imports****
import { Link } from 'react-router-dom';

// ****API imports*****
import * as APIHANDLER from '../../utility/API';

function TasksList(props) {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks();
    }, [props]);

    // function for getting all tasks from server
    const getTasks = ()=>{
        APIHANDLER.getAllTasks()
        .then(({ data })=>{
            var tasks= data.tasks;
            setTasks(tasks);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // deleting a task
    const onDeleteTask = taskId => {
        APIHANDLER.deleteTask(taskId)
        .then(response=>{
            getTasks();
        })
        .catch(err=>{
            console.log(err);
        })
    };
    return (
        <div>
            {/* mapping each task to a list element */}
            {tasks.map( (task, index) => {
                return(
                  <li key={index} >
                    <p><Link to={'/task/'+task._id} >{task.title}</Link></p>  <p>  {task.description}</p> <p> <button onClick={()=>onDeleteTask(task._id)}>Delete</button></p>
                  </li>
                )
            })}
        </div>
    )
}

export default TasksList;