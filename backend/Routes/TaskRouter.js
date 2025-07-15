const { createTask, fetchAllTask, deleteTask, updateTask } = require('../controllers/TaskController');

const router = require('express').Router();


// to get all the tasks
router.get('/',fetchAllTask);

// to create the task

router.post('/',createTask)
// delete the tasks
router.delete('/:id',deleteTask)
router.put('/:id',updateTask)


module.exports = router