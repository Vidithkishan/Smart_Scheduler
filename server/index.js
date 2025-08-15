// Import libraries and configuration files
const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({ origin: process.env.CLIENT_URL }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const timetableRoutes = require('./routes/timetableRoute');
const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes);
app.use('/api', timetableRoutes);

// Server listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
