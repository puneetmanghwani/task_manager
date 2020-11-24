
// ****React Imports*****
import React, { useState, useEffect } from 'react';

// ****Library functions imports****
import { Link } from 'react-router-dom';

// ****API imports*****
import * as APIHANDLER from '../../utility/API';

function UsersList(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, [props]);

    // function for getting users details from server
    const getUsers = ()=>{
        APIHANDLER.getAllUsers()
        .then(({ data })=>{
            
            setUsers(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // deleting user
    const onDeleteUser = userId => {
        APIHANDLER.deleteUser(userId)
        .then(response=>{
            getUsers();
        })
        .catch(err=>{
            console.log(err);
        })
    };
    return (
        <div>
            {/* mapping each user to a list element */}
            {users.map( (user, index) => {
                return(
                  <li key={index} >
                    <p><Link to={'/user/'+user._id} >{user.name}</Link></p>  <p>  {user.designation} </p> <p><button onClick={()=>onDeleteUser(user._id)}>Delete</button></p>
                  </li>
                )
            })}
        </div>
    )
}

export default UsersList;