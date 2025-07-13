const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const Employee = require('../models/User');
const Task = require('../models/Task');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const sendTokenResponse = (user, res) => {
  const token = generateToken(user._id);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    sendTokenResponse(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    sendTokenResponse(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!user) return res.status(404).json({ message: 'User not found' });
  const match = await user.matchPassword(currentPassword);
  if (!match) return res.status(400).json({ message: 'Current password incorrect' });

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password changed' });
};

exports.toggle2FA = async (req, res) => {
  const { enabled } = req.body;   // boolean
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.twoFactorEnabled = enabled;
  await user.save();
  res.json({ twoFactorEnabled: user.twoFactorEnabled });
};

exports.signOutAll = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.refreshTokens = [];
  await user.save();

  res.clearCookie('token');
  res.json({ message: 'Signed out from all devices' });
};

exports.updatePreferences = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.preferences = {
    ...user.preferences,
    ...req.body,
  };
  await user.save();
  res.json(user.preferences);
};

exports.deleteAccount = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.clearCookie('token');
  res.json({ message: 'Account deleted' });
};

exports.exportData = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });

  delete user.password;
  res.setHeader('Content-Disposition', 'attachment; filename=userdata.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user, null, 2));
};


exports.exportData = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });

  delete user.password;
  delete user.__v;

  const employees = await Employee.find({ createdBy: req.user.id }).lean();
  const tasks = await Task.find({
    $or: [
      { assignedTo: req.user.id },
      { createdBy: req.user.id }
    ]
  }).lean();

  const clean = (arr) => arr.map(item => {
    delete item.__v;
    return item;
  });

  const exportPayload = {
    profile: user,
    employees: clean(employees),
    tasks: clean(tasks),
  };

  res.setHeader('Content-Disposition', 'attachment; filename=userdata.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(exportPayload, null, 2));
};
