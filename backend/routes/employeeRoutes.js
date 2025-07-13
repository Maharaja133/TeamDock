const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  updateProfile,
  updateNotificationSettings,
} = require('../controllers/employeeController');
const upload = require('../middleware/upload');

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.put('/me', protect, upload.single('profilePic'), updateProfile);
router.put('/me/notifications', protect, updateNotificationSettings);

router.get('/', adminOnly, getEmployees);
router.post('/', adminOnly, createEmployee);
router.delete('/:id', adminOnly, deleteEmployee);

router.get('/:id', getEmployee);
router.put('/:id', protect, updateEmployee);

module.exports = router;