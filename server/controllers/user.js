
const task = require('../models/task');
const User = require('../models/user');


// Get a particular url based on id in url
exports.getUser = (req,res,next) => {
    
    const userId = req.params.userId;

     // if user exist for this id then return the user other wise return bad request.
    User.findById(userId)
    .then(user=>{
        if(user){
            return res.status(200).json(user);
        }
        else{
            return res.status(400).json("No user with this id");
        }
        
    })
    .catch(err => {
        return res.status(500).send({
            message: "Internal Server Error"
        });
    });
}

// get all users
exports.getAllUsers = (req,res,next) => {

    // return all users if there is no error at server side
    User.find()
    .populate('taskList').exec((err,users)=>{
        if(err){
            return res.status(500).json(err);
        }
        else{
            return res.status(200).json(users);
        }
    })
}

// Add a user in database
exports.addUser = (req,res,next) => {

    // get details from request body 
    const { name,designation } = req.body;
    var user = new User({ name,designation });
    

    // if user gets added return success other wise return error.
    user.save()
    .then(data=>{
        res.status(200).send({
            message: "User Successfully Created"
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        });
    })
}

// Edit a user based on id coming in url
exports.editUser = (req,res,next) => {
    
    // if name and designation both are not in request body then return bad request
    if(!req.body.name && !req.body.designation) {
        return res.status(400).send({
            message: "No details in request"
        });
    }
    
    const userId = req.params.userId;
    const { name,designation } = req.body;
    
    // find the user based on id then update the details based on which were present in request body
    User.findById(userId)
    .then(user=>{

        // if name is present
        if(name){
            user.name=name;
        }
        // if designation is present
        if(designation){
            user.designation=designation;
        }
        user.save()
        res.status(200).json("User Edited");
    })
    .catch(err => {
        return res.status(400).send({
            message: "Wrong User id"
        });
    });

}

// Delete a user based on user id coming in url
exports.deleteUser = (req,res,next) => {
    
    const userId = req.params.userId;

    // find the user based on id if no user is present return bad request
    User.findByIdAndRemove(userId)
    .then(user=>{
        if(!user) {
            return res.status(400).send({
                message: "User not found with id " + userId
            });
        }
        return res.status(200).send({
            message: "User Deleted with id" + userId
        });
    })
    .catch(err=>{
        return res.status(400).send({
            message: "Wrong User Id" + userId
        });
    })
}

// assign task to user based on user id and task id
exports.assignTaskToUser = (req,res,next) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    // find user
    User.findById(userId)
    .then(user=>{

        // add task to task list by the addToTaskList custom method of every user object 
        user.addToTaskList(taskId)
        .then(response=>{
            return res.status(200).json('Task Assigned');
        })
        .catch(err=>{
            return res.status(500).json('Internal Server Error');
        })
    })
    .catch(err=>{
        return res.status(400).json('No Id Found with this user');
    })
    
}

// Delete a task assigned to user based on user id and task id
exports.retractTaskFromUser = (req,res,next) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    // find the user
    User.findById(userId)
    .then(user=>{

        // remove task from task list by the removeFromTaskList custom method of every user object
        user.removeFromTaskList(taskId)
        .then(response=>{
            return res.status(200).json('Task Removed');
        })
        .catch(err=>{
            return res.status(500).json('Internal Server Error');
        })
    })
    .catch(err=>{
        return res.status(400).json('No User With this id');
    })
}


