const express = require('express');
const { register, login, logout,
  changePassword,
  toggle2FA,
  signOutAll,
  updatePreferences,
  deleteAccount,
  exportData, } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.put('/change-password', protect, changePassword);
router.put('/2fa',             protect, toggle2FA);
router.post('/signout-all',    protect, signOutAll);

router.put('/preferences', protect, updatePreferences);
router.delete('/delete', protect, deleteAccount);
router.get('/export', protect, exportData);

router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
