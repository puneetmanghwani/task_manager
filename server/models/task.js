const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
  });

module.exports = mongoose.model('Task', TaskSchema);