const SystemSettings = require('../models/SystemSettings');
const User = require('../models/User');

exports.getSystemSettings = async (req, res) => {
  const settings = await SystemSettings.findOne();
  res.status(200).json(settings);
};

exports.updateSystemSettings = async (req, res) => {
  const { companyName, theme } = req.body;

  let settings = await SystemSettings.findOne();
  if (!settings) {
    settings = await SystemSettings.create({ companyName, theme, createdBy: req.user._id });
  } else {
    settings.companyName = companyName || settings.companyName;
    settings.theme = theme || settings.theme;
    await settings.save();
  }

  res.status(200).json({ message: 'System settings updated', settings });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();
  res.status(200).json({ message: 'Profile updated' });
};

exports.updateNotificationSettings = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { emailTaskUpdates, emailNews } = req.body;

  user.notificationSettings.emailTaskUpdates = emailTaskUpdates ?? user.notificationSettings.emailTaskUpdates;
  user.notificationSettings.emailNews = emailNews ?? user.notificationSettings.emailNews;

  await user.save();
  res.status(200).json({ message: 'Notification settings updated' });
};

exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  const { currentPassword, newPassword } = req.body;

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
};
