const axios = require("axios");

const fetchLeetCodeRecentSubmissions = async ( req,res ) => {
  const url = "https://leetcode.com/graphql";

  const username = req.params.username // Replace with the desired username
  const limit=10;

  const query = `
    query getUserProfile($username: String!, $limit: Int!) {
      recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `;

  const variables = {
    username,
    limit,
  };

  try {
    const response = await axios.post(url, { query, variables });
    const submissions = response.data.data.recentSubmissionList;

    const formatDate = (ts) => {
      const date = new Date(parseInt(ts) * 1000);
      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const timeAgo = (ts) => {
      const now = Date.now();
      const diffMs = now - parseInt(ts) * 1000;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return diffDays === 0 ? "Today" : `${diffDays} days ago`;
    };

    const submission = submissions.map((s) => ({
      title: s.title,
      url: `https://leetcode.com/problems/${s.titleSlug}`,
      lang: s.lang,
      status: s.statusDisplay,
      date: formatDate(s.timestamp),
      ago: timeAgo(s.timestamp),
    }));

    return res.json(submission);
  } catch (err) {
    console.error("Error fetching LeetCode submissions:", err.message);
  }
};

module.exports = fetchLeetCodeRecentSubmissions;