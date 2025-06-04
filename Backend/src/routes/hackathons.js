const express = require('express');
const router = express.Router();

const getDevpostHackathon = require('../hackathonPlatform/devpost');

router.get('/', async (req, res) => {
  try {
    const devpost = await getDevpostHackathon();

    console.log('Return hackathons ', devpost);
    res.json([...devpost]); 
    
  } catch (error) {
    console.error('Error fetching contests:', error.message);
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
});

module.exports = router;
