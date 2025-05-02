const axios = require("axios");
const { GITHUB_TOKEN } = require("../config/config"); // or hardcode if testing

const fetchGitHubEventActivity = async (req,res) => {
  const token = GITHUB_TOKEN;
    const username = req.params.username; // Get the username from the request parameters
  console.log("Fetching GitHub event activity for:", username);

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "request",
      },
    });

    const events = response.data;
    const formattedEvents = [];

    events.forEach((event) => {
      const { type, repo, created_at, payload } = event;

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      };

      const getTimeAgo = (dateStr) => {
        const now = new Date();
        const past = new Date(dateStr);
        const diffMs = now - past;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        return `${diffDays} days ago`;
      };

      const baseEvent = {
        repo: repo.name.split("/")[1], // Trim username from "username/repo"
        date: formatDate(created_at),
        ago: getTimeAgo(created_at),
        platform:"GitHub",
        link:`https://github.com/${repo.name}`,
      };

      if (type === "PushEvent") {
        payload.commits.forEach((commit) => {
          formattedEvents.push({
            ...baseEvent,
            type: "Pushed to repository",
            message: commit.message,
          });
        });
      } else if (type === "CreateEvent") {
        if (payload.ref_type === "repository") {
          formattedEvents.push({
            ...baseEvent,
            type: "Created repository",
          });
        } else if (payload.ref_type === "branch") {
          formattedEvents.push({
            ...baseEvent,
            type: "Created branch",
            branch: payload.ref,
          });
        }
      }
    });

    return res.json(
        { events: formattedEvents,
          


        }
    );
  } catch (err) {
    console.error("Error fetching GitHub events:", err.message);
    throw new Error("Failed to fetch GitHub events");
  }
};

module.exports = fetchGitHubEventActivity;
