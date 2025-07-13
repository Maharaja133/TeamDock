const express = require('express');
const {
  getSystemSettings,
  updateSystemSettings,
  updateProfile,
  updateNotificationSettings,
  changePassword
} = require('../controllers/settingsController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/system', adminOnly, getSystemSettings);
router.put('/system', adminOnly, updateSystemSettings);
router.put('/profile', updateProfile);
router.put('/notifications', updateNotificationSettings);
router.put('/security/password', changePassword);

module.exports = router;
