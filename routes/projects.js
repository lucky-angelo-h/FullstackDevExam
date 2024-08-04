var express = require('express');
var router = express.Router();
const projectController = require('../controllers/project');

/* GET users listing. */
router.get('/:projectId?', async function(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const result = await projectController.getProjects(projectId);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.get('/:projectId', async function(req, res, next) {
  try {
    const result = await projectController.getProjects();
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.post('/create', async function(req, res, next) {
  try {
    const result = await projectController.createProject(req.body);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in create endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.put('/update/:projectId', async function(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const result = await projectController.updateProject(projectId, req.body);
    
    res.json({ ...result });
    
  } catch (error) {
    console.error('Error in update endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.delete('/delete/:projectId', async function(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const result = await projectController.deleteProject(projectId);
    
    res.json({ ...result });
  } catch (error) {
    console.error('Error in delete endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

module.exports = router;