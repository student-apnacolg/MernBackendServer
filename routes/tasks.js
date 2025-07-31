const express =require('express');
const Task = require('../models/taskModel');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router()

/**
 * Route: /api/tasks
 * Method: GET
 * Description: Get all the tasks
 * Access: Public
 * Parameters: None
 */
router.get('/', getTasks)

// /**
//  * Route: /api/tasks/:id
//  * Method: GET
//  * Description: Get a single task by its ID
//  * Access: Public
//  * Parameters: ID
//  */
router.get('/:id', getTask)

// /**
//  * Route: /api/tasks
//  * Method: POST
//  * Description: Create/Add a new task
//  * Access: Public
//  * Parameters: None
//  */
router.post('/', createTask)

// /**
//  * Route: /api/tasks/:id
//  * Method: PUT
//  * Description: Update a single task by its ID
//  * Access: Public
//  * Parameters: ID
//  */
router.patch('/:id', updateTask)

// /**
//  * Route: /api/tasks
//  * Method: DELETE
//  * Description: Delete a single task by its ID
//  * Access: Public
//  * Parameters: ID
//  */
router.delete('/:id', deleteTask)

module.exports = router