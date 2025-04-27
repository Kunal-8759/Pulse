const axios = require('axios');

const graphqlURL = 'https://leetcode.com/graphql';

const fetchDailyProblem = async () => {
  const query = `query {
    activeDailyCodingChallengeQuestion {
      date
      link
      question {
        questionId
        questionFrontendId
        title
        difficulty
        likes
        dislikes
        topicTags { name }
        stats
      }
    }
  }`;

  const response = await axios.post(graphqlURL, { query });
  const daily = response.data.data.activeDailyCodingChallengeQuestion;
  const q = daily.question;
  const stats = JSON.parse(q.stats);

  return {
    title: q.title,
    difficulty: q.difficulty,
    link: `https://leetcode.com${daily.link}`,
    frontendId: q.questionFrontendId,
    topicTags: q.topicTags.map(tag => tag.name),
    acRate: stats.acRate,
  };
};

const fetchUserStats = async (username) => {
    const query = `query userProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          activeYears
          submissionCalendar
        }
      }
    }`;
  
    const variables = { username };
  
    const response = await axios.post(graphqlURL, {
      query,
      variables,
    });
  
    const data = response.data.data;
  
    const all = data.allQuestionsCount;
    const solved = data.matchedUser.submitStats.acSubmissionNum;
    const submissionCalendar = data.matchedUser.userCalendar.submissionCalendar;
  
    const getCount = (list, difficulty) =>
      list.find(item => item.difficulty === difficulty)?.count || 0;
  
    return {
      total: getCount(all, 'All'),
      totalSolved: getCount(solved, 'All'),
      easyTotal: getCount(all, 'Easy'),
      easySolved: getCount(solved, 'Easy'),
      mediumTotal: getCount(all, 'Medium'),
      mediumSolved: getCount(solved, 'Medium'),
      hardTotal: getCount(all, 'Hard'),
      hardSolved: getCount(solved, 'Hard'),
      submissionCalendar: JSON.parse(submissionCalendar),
    };
  };
  

module.exports = {
  fetchDailyProblem,
  fetchUserStats,
};
