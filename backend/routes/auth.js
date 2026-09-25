const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Bringing in your blueprint
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// User Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // 2. Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // 2. Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // 3. Generate a secure token (digital key)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || 'fallback_secret_key', 
      { expiresIn: '1d' } // Key expires in 1 day
    );

    res.status(200).json({ 
      message: 'Login successful!', 
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// POST: Save a quiz score to the user's profile
router.post('/score', verifyToken, async (req, res) => {
  try {
    const { siteTitle, score, total } = req.body;
    
    // Find the user by the ID embedded in their digital token
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    
    // Add the new score to their history
    user.scores.push({ siteTitle, score, total });
    await user.save();
    
    res.status(200).json({ message: 'Score saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving score.' });
  }
});

// GET: Fetch the live user profile (including scores)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Find the user but exclude their password from the returned data
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching profile.' });
  }
});

module.exports = router;