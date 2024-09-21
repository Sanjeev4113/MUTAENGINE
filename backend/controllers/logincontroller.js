// const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/login');
const generateToken=require("../config/generateToken");

// const router = express.Router();

// Login endpoint
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log(User);
    // Check if username and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) { 
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
 
    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// module.exports = router;