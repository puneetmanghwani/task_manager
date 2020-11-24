
// ****React Imports****
import React, { useState, useEffect } from 'react';

// ****API imports****
import * as APIHANDLER from '../../utility/API';


function EditTask(props) {
    const [state, setState] = useState({
        title:"",
        description:""
    });

    // for getting task details
    useEffect(() => {
        const taskId=props.match.params.TASK

        // geting a task from server
        APIHANDLER.getTask(taskId)
        .then(({ data })=>{
            var title = data.title;
            var description= data.description;
            setState({
                ...state,
                title,description
            })
        })
        .catch(err=>{
            console.log(err);
        })
    },[props]);
    const onChange = e => {
        setState({
            ...state,
            [e.target.id]:e.target.value,
        })
    };

    const onSubmit = e => {
        e.preventDefault();
        
        const taskId=props.match.params.TASK

        const formData = {
          title: state.title,
          description: state.description,
        };
        // sending task data to server
        APIHANDLER.editTask(formData,taskId)
        .then(response=>{
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return (
        <div style={{ paddingTop:"100px" }}>
            <form onSubmit={onSubmit}>
            <input placeholder="Enter Title" name="title" id="title" type="text" value={state.title}  onChange={onChange} />
            <input placeholder="Enter Description" name="description" id="description" type="text" value={state.description}  onChange={onChange} />
            <button type="submit" >Edit</button>
            </form>
        </div>
    )
}

export default EditTask;