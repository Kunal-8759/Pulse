const express = require('express');
const cors = require('cors');

const heatmapRoute = require('./routes/heatmap');
const { fetchDailyProblem, fetchUserStats } = require('./utils/leetcodeClient');
const hackathonsRoute = require('./routes/hackathons');
const contestsRoute = require('./routes/contests');




const { PORT } = require('./config/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/heatmap',heatmapRoute);
app.get('/problem',fetchDailyProblem);
app.get('/',fetchUserStats);
app.use('/api/hackathons',hackathonsRoute);
app.use('/api/contests', contestsRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});