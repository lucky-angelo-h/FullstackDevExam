var mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: [true, "Title is required" ] },
  description: { type: String, required: false },
  member_id: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created_at:  { type: Date, default: Date.now },
});

const Project = model('Project', projectSchema);
module.exports = Project;