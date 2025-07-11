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

const allowedOrigins = [
  'https://pulse-code.vercel.app',
  'http://localhost:5173',
  'https://pulse-dev1.vercel.app/',
  'http://127.0.0.1:5173' 
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // allow cookies and headers
}));

app.use(cors());
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

