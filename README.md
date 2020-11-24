## TASK MANAGER
**Client- localhost:3000**

## APIs
1-**Add new user**
 `localhost:3000/adduser`
 --Add any user with name and designation for each new user a new block will be there in users grid in task manager.
 
2-**List All Users**
 `localhost:3000/users`
 --List All the users for every user you can edit the user by clicking the name of the user if you want to delete the user press delete button.
 
3-**Add New task**
 `localhost:3000/addtask`
 --Add new task with title and description. All tasks will be present at the tasks list in task manager.
 
4-**List all Tasks**
 `localhost:3000/tasks`
 --List All the tasks for every task you can edit the task by clicking the title of the task if you want to delete the task press delete button.
 
5-**Task Manager**
 `localhost:3000/taskmanager`
 -- In task manager on left side there is tasks title list in which there will all tasks which were created and on the right side there is grid of blocks of each user created the name of each user will be shown. In each user block there are tasks which were assigned to them.
 Now to assign a task to a user drag a task to particular user block and it will be assigned to that user. One task can be assigned to any number of users but one task can only be assigned to a user only one time.
 
 
6-**Edit a user**
 `localhost:3000/user/:USER`
 --When you click name of a user in all users list you will be redirected to this page to edit the user.
 
7-**Edit a task**
 `localhost:3000/task/:TASK`
 --When you click title of a task in all tasks list you will be redirected to this page to edit the task.
 


## APIs
**Server- localhost:8000**
1. **API to get all users**
   
   `localhost:8000/users/`  
   Method: GET  
   Response - List of all users  
   
2. **API to add a new user**
   
   `localhost:8000/users/`  
   Method: POST  
   The user data is sent to the server.
   Response - Status  

3. **API to get a user**
   
   `localhost:8000/users/:userId/`  
   Method: GET
   Get a user based on id.
   Response - Status  
   
4. **API to update a user**
   
   `localhost:8000/users/:userId`  
   Method: PUT
   User id is sent to the server with new user details
   Response - Status  
   

   
5. **API to delete user**
   
   `localhost:8000/users/:userId/`  
   Method: DELETE  
   Delete a user based on user id.
   Response - Status  

6. **API to assign task to a user**
   
   `localhost:8000/users/:userId/tasks/:taskId`  
   Method: POST  
   The task based on task id is assigned to a user based on user id.
   Response - Status  

7. **API to remove a assigned task to a user**
   
   `localhost:8000/users/:userId/tasks/:taskId` 
   Method: DELETE  
   The task based on task id is removed from task list of a user based on user id.
   Response - Status  
