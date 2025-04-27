const fetchGitHubActivity = require("../utils/githubClient");

const getGitHub = async (req, res) => {
 try{
  const username = req.params.username;
  const { calendarData } = await fetchGitHubActivity(username);
  res.json(calendarData);
 }
 catch (err) {
  res.status(500).json({ error: "Failed to fetch GitHub data" });
  console.error("Error fetching GitHub data:", err.message);
 }
};

module.exports=getGitHub;