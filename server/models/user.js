const mongoose = require('mongoose');
const task = require('../models/task');

const Task = require('../models/task');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true},
    taskList:[{
      type: Schema.Types.ObjectId, ref:'Task'
    }]
});


// method added to every user object which is used to add task in the task list.
UserSchema.methods.addToTaskList = function(taskId) {

  // finding the task id in task list.
  const taskListIndex = this.taskList.findIndex(cp => {
    return cp._id.toString() === taskId.toString();
  });
  const updatedTaskList= [...this.taskList];

  // if task already exist then just return other wise push the task in task list
  if(taskListIndex >=0 ){
    return this.save();
  }
  else{
    updatedTaskList.push({ _id:taskId });
  }

  this.taskList=updatedTaskList;
  return this.save();

};

// method added to every user object which is used to remove task in the task list.
UserSchema.methods.removeFromTaskList = function(taskId) {

  // finding the task id in task list.
  const taskListIndex = this.taskList.findIndex(cp => {
    return cp._id.toString() === taskId.toString();
  });
  const updatedTaskList= [...this.taskList];

  // if task exisit then remove the task from task list other wise just return the object
  if(taskListIndex>=0){
    updatedTaskList.splice(taskListIndex,1);
  }
  else{
    return this.save();
  }

  this.taskList=updatedTaskList;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);