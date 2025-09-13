const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');

// Create collection
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const collection = await Collection.create({ name, user: req.userId });
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add pin to collection
router.post('/:id/add', auth, async (req, res) => {
  try {
    const { pinId } = req.body;
    const coll = await Collection.findById(req.params.id);
    if (!coll) return res.status(404).json({ message: 'Collection not found' });
    if (coll.user.toString() !== req.userId.toString()) return res.status(403).json({ message: 'Forbidden' });
    coll.pins = coll.pins || [];
    if (!coll.pins.includes(pinId)) coll.pins.push(pinId);
    await coll.save();
    res.json(coll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user collections
router.get('/user/:userId', async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.params.userId }).populate('pins').sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
