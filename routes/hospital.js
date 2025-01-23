const express = require('express');
const { hospitalModel } = require('../db'); // Correct import if your db.js exports hospitalModel
const hospitalRouter = express.Router();

// Add a new hospital
hospitalRouter.post('/add', async (req, res) => {
  const { name, location, contact, services } = req.body;

  // Validate input (basic validation)
  if (!name || !location || !contact || !services) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newHospital = new hospitalModel({
      name,
      location,
      contact,
      services,
    });
    await newHospital.save();
    res.status(201).json({ message: 'Hospital added successfully', hospital: newHospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error adding hospital: ${error.message}` });
  }
});

// Get all hospitals
hospitalRouter.get('/all', async (req, res) => {
  try {
    const hospitals = await hospitalModel.find(); // Use hospitalModel here
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching hospitals: ${error.message}` });
  }
});

module.exports = { hospitalRouter };
