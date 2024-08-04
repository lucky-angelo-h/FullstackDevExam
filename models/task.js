var mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: [true, "Title is required" ]},
  description: { type: String, required: false },
  member_id: {type: Schema.Types.ObjectId, ref: 'User'},
  priority: { type: String, enum : ['LOW','MEDIUM','HIGH'], default: 'MEDIUM'},
  status: { type: String, enum : ['ASSESSMENT','IN PROGRESS','DONE'], default: 'ASSESSMENT'},
  project_id: {type: Schema.Types.ObjectId, ref: 'Project'},
  created_at:  { type: Date, default: Date.now },
});

const Task = model('Task', taskSchema);
module.exports = Task;