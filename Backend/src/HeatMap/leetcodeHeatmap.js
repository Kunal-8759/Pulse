
const { fetchUserStats ,fetchDailyProblem } = require("../utils/leetcodeClient");

const getUserDetails = async (req, res) => {
    try {
      const username = req.params.username;
      const leetcodeData = await fetchUserStats(username);  
      res.json(leetcodeData);

    } catch (err) {
      res.status(500).json({ error: "Failed to fetch LeetCode data" });
    }
};

const getDailyProblem = async (req,res)=>{
  try{
    const dailyProblem = await fetchDailyProblem();
    res.json(dailyProblem);
  }
  catch(err){
    res.status(500).json({ error: "Failed to fetch Daily Problem" });
  }
}

module.exports={getUserDetails,getDailyProblem};

