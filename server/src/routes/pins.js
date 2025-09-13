const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST route with Sharp resize
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    const resizedPath = req.file.destination + 'resized-' + req.file.filename;

    // Resize image to 400x400 and overwrite resized file
    await sharp(req.file.path)
      .resize(400, 400, { fit: 'cover' })
      .toFile(resizedPath);

    // Delete original if you want to save space
    fs.unlinkSync(req.file.path);

    const pin = await Pin.create({
      title: req.body.title,
      description: req.body.description,
      image: 'resized-' + req.file.filename, // save resized image name
      destination: req.body.destination,
      category: req.body.category,
    });

    res.json(pin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all pins
router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json(pins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
