const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  displayName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String // This can be null for Google-authenticated users
});

const User = mongoose.model('User', userSchema);

module.exports = User;
