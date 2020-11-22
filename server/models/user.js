const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    designation: { type: String, required: true},
  });

module.exports = mongoose.model('User', UserSchema);