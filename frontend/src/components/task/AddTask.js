// ****React IMPORT****
import React, { useState } from 'react';

// ****API IMPORT****
import * as APIHANDLER from '../../utility/API';


function AddTask(props) {
    const [state, setState] = useState({
        title:"",
        description:""
    });

    
    const onChange = e => {
        setState({
            ...state,
            [e.target.id]:e.target.value,
        })
    };

    const onSubmit = e => {
        e.preventDefault();
    
        const formData = {
          title: state.title,
          description: state.description,
        };

        // sending task details to server
        APIHANDLER.addTask(formData)
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
            <button type="submit" >Add</button>
            </form>
        </div>
    )
}

export default AddTask;