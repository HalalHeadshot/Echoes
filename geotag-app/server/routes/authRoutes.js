const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
