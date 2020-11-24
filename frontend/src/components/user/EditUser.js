
// ****React Imports***
import React, { useState, useEffect } from 'react';

// ****API imports****
import * as APIHANDLER from '../../utility/API';


function EditUser(props) {
    const [state, setState] = useState({
        name:"",
        designation:""
    });

    // for getting user details
    useEffect(() => {
        const userId=props.match.params.USER
        APIHANDLER.getUser(userId)
        .then(({ data })=>{
            var name = data.name;
            var designation= data.designation;
            setState({
                ...state,
                name,designation
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
        
        const userId=props.match.params.USER

        const formData = {
          name: state.name,
          designation: state.designation,
        };

        // sending details of user to server
        APIHANDLER.editUser(formData,userId)
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
            <button type="submit" >Edit</button>
            </form>
        </div>
    )
}

export default EditUser;