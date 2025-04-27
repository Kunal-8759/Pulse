const axios = require('axios');
const { GITHUB_TOKEN } = require("../config/config") // or hardcode if testing

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

    const days = response.data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

    const heatmap = {};
    days.forEach((day) => (heatmap[day.date] = day.contributionCount));

    return{
        calendarData: heatmap,
    }
    }catch (err) {
      console.error("Error fetching GitHub activity:", err);
      throw new Error("Failed to fetch GitHub activity");
    }

  
};

module.exports = fetchGitHubActivity;
