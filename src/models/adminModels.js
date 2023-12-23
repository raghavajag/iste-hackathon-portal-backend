const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Admin', adminSchema);
