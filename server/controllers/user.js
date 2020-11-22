
const User = require('../models/user');


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
        res.status(500).send({
            message: "Internal Server Error"
        });
    })
}

exports.editUser = (req,res,next) => {
    
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