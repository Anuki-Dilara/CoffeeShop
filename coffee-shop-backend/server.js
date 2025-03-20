const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
require('dotenv').config(); // For environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // To parse JSON in requests

// Use the authentication routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
