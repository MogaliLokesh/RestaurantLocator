const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurants');

const app = express();
const port = 5049;

mongoose.connect('mongodb://localhost:27017/restaurant-locator', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/restaurants', restaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
