const express = require('express');
const cors = require('cors');

const heatmapRoute = require('./routes/heatmap');
const { fetchDailyProblem, fetchUserStats } = require('./utils/leetcodeClient');
const hackathonsRoute = require('./routes/hackathons');
const contestsRoute = require('./routes/contests');
const fetchGitHubCreateEvents = require('./utils/fetchingGithub');
const fetchLeetCodeRecentSubmissions = require('./utils/fetchLeetcode');




const { PORT } = require('./config/config');

const app = express();
app.use(cors({
  origin: 'https://pulse-code.vercel.app', 
  methods: ['GET', 'POST'],
  credentials: true 
}));
app.use(express.json());
app.use('/api/heatmap',heatmapRoute);
app.get('/problem',fetchDailyProblem);
app.get('/',fetchUserStats);
app.use('/api/hackathons',hackathonsRoute);
app.use('/api/contests', contestsRoute);

app.get('/github/:username', fetchGitHubCreateEvents);
app.get('/leetcode/:username',fetchLeetCodeRecentSubmissions) ;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

