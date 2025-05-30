const express = require('express');
const fetchLeetCodeContests = require('../contestPlatform/leetcode');
const getCodechefContests = require('../contestPlatform/codechef');
const getCodeforcesContests = require('../contestPlatform/codeforces');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leetcode = await fetchLeetCodeContests();
    const codechef = await getCodechefContests();
    const codeforces = await getCodeforcesContests();

    res.json([ ...leetcode , ... codeforces , ...codechef]); 

    console.log('Contests fetched successfully',[ ...leetcode , ... codeforces , ...codechef]);
    
  } catch (error) {
    console.error('Error fetching contests:', error.message);
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
});

module.exports = router;
