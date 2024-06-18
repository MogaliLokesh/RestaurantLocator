const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, location, locality } = req.body;
  try {
    const newRestaurant = new Restaurant({
      name,
      location: {
        type: 'Point',
        coordinates: location.split(',').map(Number),
      },
      locality,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Error adding restaurant' });
  }
});

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    console.log(restaurants);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurants' });
  }
});


router.post('/searched', async (req, res) => {
  try {
    let query = {};
    const { name, location, locality } = req.body;
    console.log(req, "req in searched restaurants route")
    console.log(req.body,"req.body in searched restaurants route");

    
    console.log(name,"name", location, "location", locality, "locality");

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (location) {
      const [longitude, latitude] = location.split(',').map(Number);
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 2000, // 2 km radius
        },
      };
    }

    if (locality) {
      query.locality = { $regex: locality, $options: 'i' };
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Error searching restaurants' });
  }
});


module.exports = router;
