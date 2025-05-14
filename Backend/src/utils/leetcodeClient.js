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

  // Query to check if user exists
  const checkUserQuery = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
      }
    }
  `;

    const profileQuery = `query userProfile($username: String!) {
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


     // Step 1: Check if user exists
    const userCheckResponse = await axios.post(graphqlURL, {
      query: checkUserQuery,
      variables: { username },
    });


    const userExists = userCheckResponse.data.data.matchedUser;
    if (!userExists) {
      return {
        error:"Leetcode Profile not found.Please check your username."
      }
    }

    //step 2 : fetch profile data
  
    const profileResponse  = await axios.post(graphqlURL, {
      query : profileQuery,
      variables : {username},
    });
  
    const data = profileResponse.data.data;
  
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
      error:"",
    };
  };
  

module.exports = {
  fetchDailyProblem,
  fetchUserStats,
};
