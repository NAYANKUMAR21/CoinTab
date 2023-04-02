const mongoose = require('mongoose');
const file = {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
};
const userSchema = new mongoose.Schema(file);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
