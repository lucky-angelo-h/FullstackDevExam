var taskModel = require('../models/task');


module.exports = {
  createTask: async (data, projectId) => {
    try {
      const newTask = new taskModel({
        title: data.title,
        description: data.description,
        member_id: data.user_id,
        priority: data.priority,
        status: data.status,
        project_id: projectId
      });
  
      await newTask.save();
      return { status: "success", code: 200, message: "Task Created Successfully" };
    } catch(error) {
      if (error.name === 'ValidationError') {
        let errors = {};
        for (field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return { status: "failed", code: 400, errors: errors };
      } else {
        console.error('Error saving task:', error);
        return { status: "failed", code: 500, message: "Internal Server Error" };
      }
    }
    
  },
  updateTask: async (taskId, data) => {
    try {
      const task = await taskModel.findByIdAndUpdate(taskId, data, { new: true });
      if (!task) {
        return { status: "failed", code: 404, message: "Task not found" };
      }
      return { status: "success", code: 200, message: "Task Updated Successfully" };
    } catch (error) {
      console.error('Error updating task:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  },
  getTask: async (id) => {
    try {
      let res;
      if (id) {
        res = await taskModel.findById(id);
        if (!res) {
          return { status: "failed", code: 404, message: "Task not found" };
        }
      } else {
        res = await taskModel.find({});
      }
      return { status: "success", code: 200, list: Array.isArray(res) ? res : [res] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  },
  getTaskByProject: async (id) => {
    try {
      let res;
      res = await taskModel.find({project_id: id});
      if (!res) {
        return { status: "failed", code: 404, message: "Task not found" };
      }
      return { status: "success", code: 200, list: Array.isArray(res) ? res : [res] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  },
  deleteTask: async(taskId) => {
    try {
      const result = await taskModel.deleteOne({ _id: taskId });
      if (result.deletedCount === 1) {
        return { status: "success", code: 200, message: "Task deleted successfully" };
      } else {
        return { status: "failed", code: 404, message: "Task not found" };
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  }
}
