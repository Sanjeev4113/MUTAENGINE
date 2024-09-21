const express = require('express');
const { loginUser } = require('../controllers/logincontroller');
const { signupUser } = require('../controllers/signupcontroller');
const router = express.Router();

// Signup Route
router.post('/signup', signupUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
