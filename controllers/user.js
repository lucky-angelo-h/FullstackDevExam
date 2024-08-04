var userModel = require('../models/user');


module.exports = {
  createUser: async (data) => {
    console.log(data);
    try {
      const newUser = new userModel({
        firstname: data.firstname,
        lastname: data.lastname
      });
  
      await newUser.save();
      return { status: 'success', code: 200, message: "User Created Successfully" };
    } catch(error) {
      if (error.name === 'ValidationError') {
        let errors = {};
        for (field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return { status: "failed", code: 400, errors: errors };
      } else {
        console.error('Error saving user:', error);
        return { status: "failed", code: 500, message: "Internal Server Error" };
      }
    }
    
  },
  updateUser: async (userId, data) => {
    try {
      const user = await userModel.findByIdAndUpdate(userId, data, { new: true });
      if (!user) {
        return { status: "failed", code: 404, message: "User not found" };
      }
      return { status: "success", code: 200, message: "User Updated Successfully" };
    } catch (error) {
      if (error.name === 'ValidationError') {
        let errors = {};
        for (field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return { status: "failed", code: 400, errors: errors };
      } else {
        console.error('Error saving user:', error);
        return { status: "failed", code: 500, message: "Internal Server Error" };
      }
    }
  },
  getUser: async (id) => {
    try {
      let res;
      if (id) {
        res = await userModel.findById(id);
        if (!res) {
          return { status: "failed", code: 404, message: "Project not found" };
        }
      } else {
        res = await userModel.find({});
      }
      return { status: "success", code: 200, list: Array.isArray(res) ? res : [res] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: "failed", code: 500, message: "Internal Server Error" };
    }
  }
}
