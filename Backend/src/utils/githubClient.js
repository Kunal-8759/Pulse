const axios = require('axios');
const { GITHUB_TOKEN } = require("../config/config");

const fetchGitHubActivity = async (username) => {
  
  const token = GITHUB_TOKEN;

  console.log("Fetching GitHub activity for:", username);

  
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const user = response.data.data.user;

    //checking for invalid user
    if (!user) {
      console.warn(`GitHub user "${username}" not found.`);
      return {
        calendarData: {},
        error: "GitHub profile not found. Please check your username.",
      };
    }

    const days = user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

    const heatmap = {};
    days.forEach((day) => (heatmap[day.date] = day.contributionCount));

    return{
        calendarData: heatmap,
    }
    }catch (err) {
      console.error("Error fetching GitHub activity:", err);
      return {
      calendarData: {},
      error: "Failed to fetch GitHub activity due to network/API error.",
      };
    } 
};

module.exports = fetchGitHubActivity;
