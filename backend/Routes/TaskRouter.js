const { createTask, fetchAllTask } = require('../controllers/TaskController');

const router = require('express').Router();


// to get all the tasks
router.get('/',fetchAllTask);

// to create the task

router.post('/',createTask)

module.exports = router