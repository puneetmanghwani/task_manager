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

UserSchema.methods.addToTaskList = function(taskId) {
  const taskListIndex = this.taskList.findIndex(cp => {
    return cp._id.toString() === taskId.toString();
  });
  const updatedTaskList= [...this.taskList];

  if(taskListIndex >=0 ){
    return this.save();
  }
  else{
    updatedTaskList.push({ _id:taskId });
  }

  this.taskList=updatedTaskList;
  return this.save();

};
UserSchema.methods.removeFromTaskList = function(taskId) {
  const taskListIndex = this.taskList.findIndex(cp => {
    return cp._id.toString() === taskId.toString();
  });
  const updatedTaskList= [...this.taskList];

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