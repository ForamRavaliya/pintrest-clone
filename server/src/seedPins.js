const mongoose = require('mongoose');
const Pin = require('./models/Pin');
const User = require('./models/User');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pinterest_clone';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error(err));

const images = [
  { title: 'Art 1', filename: 'art1.jpg', category: 'Art' },
  { title: 'Art 2', filename: 'art2.jpg', category: 'Art' },
  { title: 'Avatar 1', filename: 'avatar1.png', category: 'Avatar' },
  { title: 'Avatar 2', filename: 'avatar2.png', category: 'Avatar' },
  { title: 'Avatar 3', filename: 'avatar3.png', category: 'Avatar' },
  { title: 'Food 1', filename: 'food1.jpg', category: 'Food' },
  { title: 'Food 2', filename: 'food2.jpg', category: 'Food' },
  { title: 'Nature 1', filename: 'nature1.jpg', category: 'Nature' },
  { title: 'Nature 2', filename: 'nature2.jpg', category: 'Nature' },
  { title: 'Tech 1', filename: 'tech1.jpg', category: 'Tech' },
  { title: 'Tech 2', filename: 'tech2.jpg', category: 'Tech' },
  { title: 'Travel 1', filename: 'travel1.jpg', category: 'Travel' },
  { title: 'Travel 2', filename: 'travel2.jpg', category: 'Travel' },
];

async function seedPins() {
  try {
    // Clear existing pins
    await Pin.deleteMany({});
    console.log('Existing pins cleared');

    // Ensure uploads folder exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // Create a dummy user for postedBy
    let user = await User.findOne({ username: 'seeduser' });
    if (!user) {
      user = await User.create({
        username: 'seeduser',
        email: 'seeduser@example.com',
        password: 'password123', // you can hash if needed
      });
      console.log('Dummy user created for seed pins');
    }

    for (const img of images) {
      const originalPath = path.join(uploadsDir, img.filename);
      const resizedName = 'resized-' + img.filename;
      const resizedPath = path.join(uploadsDir, resizedName);

      // Resize image to 400x400
      if (fs.existsSync(originalPath)) {
        await sharp(originalPath)
          .resize(400, 400, { fit: 'cover' })
          .toFile(resizedPath);
      } else {
        console.warn(`Image not found: ${originalPath}`);
        continue;
      }

      // Create pin in database
      await Pin.create({
        title: img.title,
        description: img.title,
        image: resizedName,
        category: img.category,
        destination: '',
        postedBy: user._id, // assign dummy user
      });
    }

    console.log('Pins seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

seedPins();
