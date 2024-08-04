var projectModel = require('../models/project');


module.exports = {
  createProject: async (data) => {
    try {
      // const newProject = new projectModel({
      //   title: data.title,
      //   description: data.description,
      //   task_id: data.task_id,
      //   member_id: data.user_id
      // });
      if(data.member_id.length <= 5) {
        const newProject = new projectModel(data);
  
        await newProject.save();
        return { status: "success", code: 200, message: "Project Created Successfully" };
      } else {
        return { status: "failed", code: 400, message: "Maximum of 5 members per project" };
      }
      
    } catch(error) {
      if (error.name === 'ValidationError') {
        let errors = {};
        for (field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return { status: "failed", code: 400, errors: errors };
      } else {
        console.error('Error saving project:', error);
        return { status: "failed", code: 500, message: "Internal Server Error" };
      }
    }
    
  },
  updateProject: async (projectId, data) => {
    try {
      if(data.member_id.length <= 5) {
        const user = await projectModel.findByIdAndUpdate(projectId, data, { new: true });
        if (!user) {
          return { status: "failed", code: 404, message: "Project not found" };
        }
        return { status: "success", code: 200, message: "Project Updated Successfully" };
      } else {
        return { status: "failed", code: 400, message: "Maximum of 5 members per project" };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  },
  getProjects: async (id) => {
    try {
      let res;
      if (id) {
        res = await projectModel.findById(id).populate('member_id').exec();
        if (!res) {
          return { status: "failed", code: 404, message: "Project not found" };
        }
      } else {
        res = await projectModel.find({});
      }
      return { status: "success", code: 200, list: Array.isArray(res) ? res : [res] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  },
  deleteProject: async(projectId) => {
    try {
      const result = await projectModel.deleteOne({ _id: projectId });
      if (result.deletedCount === 1) {
        return { status: "success", code: 200, message: "Project deleted successfully" };
      } else {
        return { status: "failed", code: 404, message: "Project not found" };
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  }
}
