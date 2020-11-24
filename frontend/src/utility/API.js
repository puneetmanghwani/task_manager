import axios from 'axios';

// base url of the server
const BASE_URL = "http://127.0.0.1:8000";

// endpoint for adding user
export const addUser = payload => {
    console.log(payload)
    return axios(BASE_URL+'/users/', {
      method: 'POST',
      headers: {
        'content-type': "application/json", 
      },
      data: payload,
    })
};

// endpoint for updating user
export const editUser = (payload, userId) => {
    return axios(BASE_URL+'/users/'+userId, {
      method: 'PUT',
      headers: {
        'content-type': "application/json", 
      },
      data: payload,
    })
   
};

// endpoint for deleting user
export const deleteUser = (userId) => {
    return axios(BASE_URL+'/users/'+userId, {
      method: 'DELETE',
      headers: {
        'content-type': "application/json", 
      },
    })
   
};

// endpoint for getting all users
export const getAllUsers = () => {
    return axios(BASE_URL+'/users/', {
      method: 'GET',
      headers: {
        'content-type': "application/json", 
      },
    })
   
};

// endpoint for geting a particular user based on id
export const getUser = (userId) => {
    return axios(BASE_URL+'/users/'+userId, {
      method: 'GET',
      headers: {
        'content-type': "application/json", 
      },
    })
  
};

// endpoint for adding task
export const addTask = payload => {
    return axios(BASE_URL+'/tasks/', {
      method: 'POST',
      headers: {
        'content-type': "application/json", 
      },
      data: payload,
    })
};

// endpoint for updating the task
export const editTask = (payload, taskId) => {
    return axios(BASE_URL+'/tasks/'+taskId, {
      method: 'PUT',
      headers: {
        'content-type': "application/json", 
      },
      data: payload,
    })
   
};

// endpoint for deleting the task
export const deleteTask = (taskId) => {
    return axios(BASE_URL+'/tasks/'+taskId, {
      method: 'DELETE',
      headers: {
        'content-type': "application/json", 
      },
    })
   
};

// endpoint for getting all tasks
export const getAllTasks = () => {
    return axios(BASE_URL+'/tasks/', {
      method: 'GET',
      headers: {
        'content-type': "application/json", 
      },
    })
   
};

// endpoint for getting a particular task based on id
export const getTask = (taskId) => {
    return axios(BASE_URL+'/tasks/'+taskId, {
      method: 'GET',
      headers: {
        'content-type': "application/json", 
      },
    })
  
};

// endpoint for assigning a task to a user
export const assignTask = (userId,task_id) => {
  return axios(BASE_URL+'/users/'+userId+'/tasks/'+task_id, {
    method: 'POST',
    headers: {
      'content-type': "application/json", 
    },
  })
};
