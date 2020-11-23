
const task = require('../models/task');
const User = require('../models/user');

exports.getUser = (req,res,next) => {
    console.log(1)
    const userId = req.params.userId;
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
        return res.status(400).send({
            message: "Wrong User id"
        });
    });
}

exports.getAllUsers = (req,res,next) => {
    User.find()
    .populate('taskList').exec((err,users)=>{
        console.log(users);
        console.log(err);
        if(err){
            res.json(err);
        }
        else{
            res.json(users)
        }
    })
}
exports.addUser = (req,res,next) => {
    const { name,designation } = req.body;
    var user = new User({ name,designation });
    
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

exports.editUser = (req,res,next) => {
    console.log(2)
    if(!req.body.name && !req.body.designation) {
        return res.status(400).send({
            message: "No details in request"
        });
    }
    
    const userId = req.params.userId;
    const { name,designation } = req.body;
    
    User.findById(userId)
    .then(user=>{
        if(name){
            user.name=name;
        }
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

exports.deleteUser = (req,res,next) => {
    console.log(3)
    const userId = req.params.userId;

    User.findByIdAndRemove(userId)
    .then(user=>{
        if(!user) {
            return res.status(404).send({
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


exports.assignTaskToUser = (req,res,next) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    User.findById(userId)
    .then(user=>{
        user.addToTaskList(taskId)
        .then(response=>{
            res.json('Task Assigned');
        })
        .catch(err=>{
            console.log(err)
            res.json('Error1');
        })
    })
    .catch(err=>{
        console.log(err)
        res.json('Error2');
    })
    
}


exports.retractTaskFromUser = (req,res,next) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    User.findById(userId)
    .then(user=>{
        user.removeFromTaskList(taskId)
        .then(response=>{
            res.json('Task Removed');
        })
        .catch(err=>{
            res.json('Error');
        })
    })
    .catch(err=>{
        res.json('Error');
    })
}


// exports.getTasks = (req,res,next) => {
//     const userId = req.params.userId;
//     console.log('hey')
//     // User.findById(userId)
//     User.find()
//     .populate('taskList').exec((err,users)=>{
//         console.log(users);
//         console.log(err);
//         if(err){
//             res.json(err);
//         }
//         else{
//             res.json(users)
//         }
//     })
    
// }