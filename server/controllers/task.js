
const Task = require('../models/task');


exports.getTask = (req,res,next) => {
    const taskId = req.params.taskId;
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
        return res.status(400).send({
            message: "Wrong Task id"
        });
    });
}

exports.getAllTasks = (req,res,next) => {
    Task.find()
    .then(tasks=>{
        return res.status(200).send({
            tasks: tasks
        });
    })
    .catch(err => {
        return res.status(400).send({
            message: "Internal Server Error"
        });
    });
}

exports.addTask = (req,res,next) => {
    const { title,description } = req.body;
    var task = new Task({ title,description });
    
    task.save()
    .then(data=>{
        res.status(200).send({
            message: "Task Successfully Created"
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        });
    })
}

exports.editTask = (req,res,next) => {
    
    if(!req.body.title && !req.body.description) {
        return res.status(400).send({
            message: "No details in request"
        });
    }
    
    const taskId = req.params.taskId;
    const { title,description } = req.body;
    
    Task.findById(taskId)
    .then(task=>{
        if(title){
            task.title=title;
        }
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

exports.deleteTask = (req,res,next) => {
    const taskId = req.params.taskId;

    Task.findByIdAndRemove(taskId)
    .then(task=>{
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + taskId
            });
        }
        return res.status(200).send({
            message: "Task Deleted with id" + taskId
        });
    })
    .catch(err=>{
        return res.status(400).send({
            message: "Wrong Tash Id" + taskId
        });
    })
}