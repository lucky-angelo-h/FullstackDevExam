var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task');

/* GET users listing. */
router.get('/:taskId?', async function(req, res, next) {
  const taskId = req.params.taskId;
  try {
    const result = await taskController.getTask(taskId);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.get('/project/:projectId', async function(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const result = await taskController.getTaskByProject(projectId);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.get('/project/:projectId/members', async function(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const result = await taskController.getMembersByProject(projectId);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.post('/create/:projectId', async function(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const result = await taskController.createTask(req.body, projectId);
    // res.json({ status: result.status, code: result.code, message: result.message });
    res.json({ ...result });
  } catch(error) {
    console.error('Error in create endpoint:', error);
    // res.json({ status: "failed", code: 500, message: "Internal Server Error" });
    res.json({ status: "failed", code: 500, message: error.message });
  }
});

router.put('/update/:taskId', async function(req, res, next) {
  try {
    const userId = req.params.taskId;
    const result = await taskController.updateTask(userId, req.body);
    
    res.json({ ...result });
    
  } catch (error) {
    console.error('Error in update endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.delete('/delete/:taskId', async function(req, res, next) {
  try {
    const taskId = req.params.taskId;
    const result = await taskController.deleteTask(taskId);
    
    res.json({ ...result });
    
  } catch (error) {
    console.error('Error in delete endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
})



module.exports = router;