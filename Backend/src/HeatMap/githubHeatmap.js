const fetchGitHubActivity = require("../utils/githubClient");

const getGitHub = async (req, res) => {
 try{
    const username = req.params.username;
    const result = await fetchGitHubActivity(username);

    if (result.error) {
        return res.status(200).json({ error: result.error, data: result.calendarData });
    }
    return res.status(200).json({ data: result.calendarData , error: null});
 }
 catch (err) {
  res.status(500).json({ error: "Failed to fetch GitHub data" });
  console.error("Error fetching GitHub data:", err);
 }
};

module.exports=getGitHub;