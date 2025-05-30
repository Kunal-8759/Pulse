const axios = require('axios');

async function getCodeforcesContests() {
    const CODEFORCES_CONTEST_API = 'https://codeforces.com/api/contest.list';

    const { data } = await axios.get(CODEFORCES_CONTEST_API);
    
    const contests = data.result.map((contest) => ({
        platform: 'Codeforces',
        title: contest.name,
        code: contest.id,
        startTime: contest.startTimeSeconds,
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contests/${contest.id}`,
    }));
    
    return contests;
}

module.exports = getCodeforcesContests;