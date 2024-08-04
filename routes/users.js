var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/:userId?', async function(req, res, next) {
  const userId = req.params.userId;
  try {
    const result = await userController.getUser(userId);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in fetch endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

router.post('/create', async function(req, res, next) {
  try {
    const result = await userController.createUser(req.body);
    res.json({ ...result });
  } catch(error) {
    console.error('Error in create endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
  
});

router.put('/update/:userId', async function(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await userController.updateUser(userId, req.body);
    
    res.json({ ...result });
    
  } catch (error) {
    console.error('Error in update endpoint:', error);
    res.json({ status: "failed", code: 500, message: "Internal Server Error" });
  }
});

module.exports = router;
