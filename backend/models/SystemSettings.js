const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'My Company' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
