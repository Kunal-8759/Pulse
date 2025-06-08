const axios = require("axios");

const fetchLeetCodeRecentSubmissions = async (req, res) => {
  const url = "https://leetcode.com/graphql";

  const username = req.params.username; // Replace with the desired username
  const limit = 10;

  // Query to check if user exists
  const checkUserQuery = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
      }
    }
  `;

  const submissionsQuery = `
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

  try {
    // Step 1: Check if user exists
    const userCheckResponse = await axios.post(url, {
      query: checkUserQuery,
      variables: { username },
    });

    const userExists = userCheckResponse.data.data.matchedUser;

    if (!userExists) {
      return res.json({ error: "User not found on LeetCode.", data: [] });
    }

    // Step 2: Fetch recent submissions
    const submissionsResponse = await axios.post(url, {
      query: submissionsQuery,
      variables: { username, limit },
    });

    const submissions = submissionsResponse.data.data.recentSubmissionList;

    const formatDate = (ts) => {
      const date = new Date(parseInt(ts) * 1000);
      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
    };

    const timeAgo = (ts) => {
      const now = Date.now();
      const submissionTime = parseInt(ts) * 1000;
      const diffMs = Math.abs(now - submissionTime); // Use Math.abs to handle any timestamp issues

      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMinutes < 1) {
        return "Just now";
      } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      }
    };

    const submission = submissions.map((s) => ({
      title: s.title,
      url: `https://leetcode.com/problems/${s.titleSlug}`,
      lang: s.lang,
      status: s.statusDisplay,
      date: formatDate(s.timestamp),
      ago: timeAgo(s.timestamp),
    }));

    return res.json({ data: submission, error: "" });
  } catch (err) {
    console.error("Error fetching LeetCode submissions:", err);
  }
};

module.exports = fetchLeetCodeRecentSubmissions;
