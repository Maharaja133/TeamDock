const User = require('../models/User');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, position, department } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Employee already exists' });

    const employee = await User.create({
      name,
      email,
      password,
      position,
      department,
      role: 'employee'
    });

    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      role: employee.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');
    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, position, department, role } = req.body;
    const employee = await User.findById(req.params.id);

    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Only allow role change if the requester is admin
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update roles.' });
    }

    // Update fields only if provided
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (position) employee.position = position;
    if (department) employee.department = department;
    if (role) employee.role = role;

    await employee.save();

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        role: employee.role,
      }
    });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.remove();
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      console.error(' req.user is undefined');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updates = {
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      phone: req.body.phone,
    };

    if (req.body.password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.file) {
      updates.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    console.log('Updated user:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.updateNotificationSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.notificationSettings = {
      ...user.notificationSettings,
      ...req.body,
    };

    await user.save();
    res.json(user.notificationSettings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notifications' });
  }
};

