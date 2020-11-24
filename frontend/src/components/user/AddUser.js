
// ***React imports***
import React, { useState } from 'react';

// ***API imports****
import * as APIHANDLER from '../../utility/API';


function AddUser(props) {
    const [state, setState] = useState({
        name:"",
        designation:""
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
          name: state.name,
          designation: state.designation,
        };

        // sending user data to server
        APIHANDLER.addUser(formData)
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
            <input placeholder="Enter Name" name="name" id="name" type="text" value={state.name}  onChange={onChange} />
            <input placeholder="Enter Designation" name="designation" id="designation" type="text" value={state.designation}  onChange={onChange} />
            <button type="submit" >Add</button>
            </form>
        </div>
    )
}

export default AddUser;