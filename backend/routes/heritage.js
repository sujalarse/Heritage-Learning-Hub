const express = require('express');
const router = express.Router();
const Heritage = require('../models/Heritage');
const { verifyTeacherOrAdmin } = require('../middleware/auth');

// GET all heritage sites
router.get('/', async (req, res) => {
  try {
    const sites = await Heritage.find();
    res.status(200).json(sites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching heritage sites.' });
  }
});

// GET a single heritage site by ID
router.get('/:id', async (req, res) => {
  try {
    const site = await Heritage.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Heritage site not found' });
    res.status(200).json(site);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching site details.' });
  }
});

// POST a new heritage site (Teacher / Admin only)
router.post('/', verifyTeacherOrAdmin, async (req, res) => {
  try {
    const { title, location, description, imageUrl, historicalPeriod, lessonContent, quiz } = req.body;

    const newSite = new Heritage({
      title,
      location,
      description,
      imageUrl,
      historicalPeriod,
      lessonContent,
      quiz,
      createdBy: req.user.id
    });

    const savedSite = await newSite.save();
    res.status(201).json({ message: 'Heritage site created successfully!', site: savedSite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating heritage site.' });
  }
});

module.exports = router;