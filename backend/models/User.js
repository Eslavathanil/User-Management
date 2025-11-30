const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  mob_num: {
    type: String,
    required: true,
    trim: true
  },
  pan_num: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  manager_id: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at timestamp before saving
userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
