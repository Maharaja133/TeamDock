const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.post('/', adminOnly, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', adminOnly, deleteTask);

module.exports = router;
