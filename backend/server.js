const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const heritageRoutes = require('./routes/heritage'); // Your new route!

app.use('/api/auth', authRoutes);
app.use('/api/heritage', heritageRoutes); // Your new route!

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  family: 4 // This strictly forces Node.js to use IPv4
})
  .then(() => console.log('Successfully connected to the MongoDB filing cabinet!'))
  .catch((err) => console.log('Database connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Heritage Learning Hub API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});