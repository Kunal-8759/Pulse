const express = require('express');
const fetchLeetCodeContests = require('../contestPlatform/leetcode');
const getCodechefContests = require('../contestPlatform/codechef');
const getCodeforcesContests = require('../contestPlatform/codeforces');

const router = express.Router();

router.get('/', async (req, res) => {
  try {

    const page =  parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 9;


    const leetcode = await fetchLeetCodeContests();
    const codeforces = await getCodeforcesContests();
    const codechef = await getCodechefContests();

    const allContests = [...leetcode, ...codeforces, ...codechef];


    //sort contests by start time in descending order
    allContests.sort((a, b) => b.startTime - a.startTime);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedContests = allContests.slice(start, end);
    const hasMore = end < allContests.length;

    res.json({
      contests: paginatedContests,
      currentPage: page,
      hasMore:hasMore,
    });

  } catch (error) {
    console.error('Error fetching contests:', error.message);
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
});

module.exports = router;
