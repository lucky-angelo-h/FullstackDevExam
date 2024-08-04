var mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: [true, "First name is required" ] },
  lastname: { type: String, required: [true, "Last name is required" ] },
  created_at: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

module.exports = User;