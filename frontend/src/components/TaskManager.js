
// ***React Imports****
import React, { useState } from 'react';


// ***Library Functions import***
import { Card,ListGroup } from 'react-bootstrap';

// ***API imports****
import * as APIHANDLER from '../utility/API';

// Initial Drag and drop state
const initialDnDState = {
    draggedTask: null,
    draggedTo: null,
    isDragging: false,
}
   
const TaskManager = (props) => {
    const [tasks, setTasks] = useState([]);

    const [users, setUsers] = useState([]);

    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

    React.useEffect( ()=>{
        getUsers();
        getTasks();
    }, [props])

    // getting all users data from server
    const getUsers = ()=>{
        APIHANDLER.getAllUsers()
        .then(({ data })=>{
            setUsers(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // getting all tasks data from server
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


    // when a particular task is dragged it receives properties about the element dragged
    const onDragStart = (event) => {

        // getting task id of dragged task
        var taskId=event.currentTarget.dataset.position;

        // updating state based on task id
        setDragAndDrop({
            ...dragAndDrop, 
            draggedTask: taskId, 
            isDragging: true,  
        });

        // for firefox
        event.dataTransfer.setData("text/html", '');
    }
      
    // receive event which contains information about where we are draging our element to
    const onDragOver = (event) => {
      
     // stoping the default behavior which is to cancel the drop   
      event.preventDefault();
      
     // updating state based on user on which we are dragging to   
      setDragAndDrop({
            
        ...dragAndDrop, 
    
        draggedTo: event.currentTarget.dataset.position,  
      });

    }

    // on droping the dragged element this event fires
    const onDrop = () => {
        
        // getting task id and user id from state
        var taskId= dragAndDrop.draggedTask;
        var userId = dragAndDrop.draggedTo;
        
        // sending data of the task assigned to user
        APIHANDLER.assignTask(userId,taskId)
        .then(response=>{
              getUsers();
        })
        .catch(err=>{
            console.log(err);
        })

        // reseting the state
        setDragAndDrop({
            ...dragAndDrop,
            draggedTask: null,
            draggedTo: null,
            isDragging: false
        });
    }
  

    return (
        <div>
            
            {/* showing all tasks */}
            <div style = {{float:"left",paddingRight:200,paddingLeft:100,paddingTop:100}} >
                <b>Tasks</b>

                {/* mapping each task to a div */}
                {tasks.map( (task, index) => {
                    return(
                      <div data-position={task._id} key={task._id} draggable="true" onDragStart={onDragStart} >
                        <p>   {task.title}  </p>
                      </div>
                    )
                })}
            </div>

            {/* showing all users in card format in grid */}
            <b style = {{float:"right",paddingTop:100,paddingRight:500}}>Users</b>
            <div style = {{float:"right",borderWidth:2,borderStyle:'solid',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap: '20px'}} >
                
                {/* mapping each user to a card */}
                {users.map( (user, index) => {
                    return(            
                            <Card data-position={user._id}  onDragOver={onDragOver}
                            onDrop={onDrop} style={{ width: '18rem' }}>
                                <Card.Header><b>{user.name}</b></Card.Header>
                                <hr />
                                <ListGroup variant="flush">
                                    {
                                        // mapping each task of users task list to card item
                                        user.taskList.map((task,index)=>{
                                            return(
                                                <ListGroup.Item>{task.title}</ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Card>  
                    )
                })}
            </div>
            
        </div>
    ) 
};

   export default TaskManager;