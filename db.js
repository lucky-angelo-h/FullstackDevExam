var mongoose = require('mongoose');

module.exports = async () => {
  try {
      await mongoose.connect(
        'mongodb://mongo:27017/activityDB'
        // 'mongodb://localhost:27017/activityDB'
        , {});
      console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
      console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  }
};
