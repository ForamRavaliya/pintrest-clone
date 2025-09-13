const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

dotenv.config();

const pinRoutes = require('./routes/pins');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pinterest_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Serve uploads folder statically
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/pins', pinRoutes);

// Test route
app.get('/', (req, res) => res.send('Pinterest clone API running'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
