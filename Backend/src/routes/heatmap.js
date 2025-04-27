const express=require('express');
const { getUserDetails, getDailyProblem } = require('../HeatMap/leetcodeHeatmap');
const getGitHubDetails = require('../HeatMap/githubHeatmap');

const router = express.Router();

router.get("/leetcode/:username", getUserDetails);
router.get("/dailyProblem" ,getDailyProblem);
router.get("/github/:username", getGitHubDetails);

module.exports = router;
