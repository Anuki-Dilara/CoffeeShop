// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
const jwt = require('jsonwebtoken');
const router = express.Router();

// Example admin credentials (you should store them securely in a database in production)
const admin = {
  username: 'admin', // Example admin username
  password: '$2a$10$uOWeqVGZhdZiBqPBpqaW/.f5Ub6kfhDa0vMn.yEj1THX7UpCO3iGi' // Example hashed password (bcrypt hash for 'adminpassword')
};

// Admin login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== admin.username) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  bcrypt.compare(password, admin.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking password' });
    }
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Issue JWT token if credentials are valid
    const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
