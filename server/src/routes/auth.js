const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const safe = { _id: user._id, username: user.username, email: user.email };
    res.json({ user: safe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid creds' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const safe = { _id: user._id, username: user.username, email: user.email, profileImage: user.profileImage };
    res.json({ user: safe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
