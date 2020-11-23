
const Task = require('../models/task');


// Get a particular task based on id in url
exports.getTask = (req,res,next) => {
    const taskId = req.params.taskId;

    // if task exist for this id then return the task other wise return bad request. 
    Task.findById(taskId)
    .then(task=>{
        if(task){
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json("No task with this id");
        }
        
    })
    .catch(err => {
        return res.status(500).send({
            message: "Internal Server Error"
        });
    });
}

// get all tasks
exports.getAllTasks = (req,res,next) => {

    // return all tasks if there is no error at server side
    Task.find()
    .then(tasks=>{
        return res.status(200).send({
            tasks: tasks
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Internal Server Error"
        });
    });
}

// Add a task in database
exports.addTask = (req,res,next) => {

    // get details from request body 
    const { title,description } = req.body;
    var task = new Task({ title,description });
    

    // if task gets added return success other wise return error.
    task.save()
    .then(data=>{
        res.status(200).send({
            message: "Task Successfully Created"
        });
    })
    .catch(err=>{
        res.status(500).send({
            message: "Internal Server Error"
        });
    })
}

// Edit a task based on id coming in url
exports.editTask = (req,res,next) => {
    
    // if title and description both are not in request body then return bad request
    if(!req.body.title && !req.body.description) {
        return res.status(400).send({
            message: "No details in request"
        });
    }
    
    const taskId = req.params.taskId;
    const { title,description } = req.body;
    
    // find the task based on id then update the details based on which were present in request body
    Task.findById(taskId)
    .then(task=>{
        // if title is present
        if(title){
            task.title=title;
        }
        // if description is present
        if(description){
            task.description=description;
        }
        task.save()
        res.status(200).json("Task Edited");
    })
    .catch(err => {
        return res.status(400).send({
            message: "Wrong Task id"
        });
    });

}

// Delete a task based on task id coming in url
exports.deleteTask = (req,res,next) => {
    const taskId = req.params.taskId;

    // find the task based on id if no task is present return bad request
    Task.findByIdAndRemove(taskId)
    .then(task=>{
        if(!task) {
            return res.status(400).send({
                message: "Task not found with id " + taskId
            });
        }
        return res.status(200).send({
            message: "Task Deleted with id" + taskId
        });
    })
    .catch(err=>{
        return res.status(400).send({
            message: "Wrong Task Id" + taskId
        });
    })
}