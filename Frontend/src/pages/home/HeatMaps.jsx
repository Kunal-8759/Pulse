import { useState, useEffect } from "react";
import { getGitHubHeatmap, getLeetCodeData } from "../../services/api";
import Heatmap from "../../components/Home/HeatMap";
import '../../components/Home/HeatMap.css';

function calculateStreaks(submissionCalendarString) {
  const submissionCalendar = JSON.parse(submissionCalendarString);
  const ONE_DAY_SECONDS = 86400;

  const daysSet = new Set();

  for (const key in submissionCalendar) {
    let timestamp;

    if (!isNaN(key)) {
      timestamp = parseInt(key, 10);
    } else {
      const [year, month, day] = key.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      timestamp = Math.floor(date.getTime() / 1000);
    }

    if (submissionCalendar[key] > 0) {
      const dayStart = Math.floor(timestamp / ONE_DAY_SECONDS) * ONE_DAY_SECONDS;
      daysSet.add(dayStart);
    }
  }

  const days = Array.from(daysSet).sort((a, b) => a - b);
  if (days.length === 0) {
    return { currentStreak: 0, maxStreak: 0 };
  }

  // MAX STREAK
  let maxStreak = 1;
  let tempStreak = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === ONE_DAY_SECONDS) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // CURRENT STREAK
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  let checkDay = Math.floor(todayUTC / 1000);
  let currentStreak = 0;

  // If no activity today but activity yesterday, start from yesterday
  if (!daysSet.has(checkDay) && daysSet.has(checkDay - ONE_DAY_SECONDS)) {
    checkDay -= ONE_DAY_SECONDS;
  }

  while (daysSet.has(checkDay)) {
    currentStreak++;
    checkDay -= ONE_DAY_SECONDS;
  }

  return {
    currentStreak,
    maxStreak,
  };
}




function HeatMaps() {
  const [githubData, setGitHubData] = useState(null);
  const [leetcodeData, setLeetCodeData] = useState(null);
  const [leetCodeStreaks, setLeetCodeStreaks] = useState({ currentStreak: 0, maxStreak: 0 });
  const [githubStreaks, setGitHubStreaks] = useState({ currentStreak: 0, maxStreak: 0 });
  const [gitError, setGitError] = useState(null);
  const [leetError, setLeetError] = useState(null);

  useEffect(() => {
    const githubUsername = localStorage.getItem("githubUsername");
    const leetcodeUsername = localStorage.getItem("leetcodeUsername");

    console.log("GitHub Username:", githubUsername);
    console.log("LeetCode Username:", leetcodeUsername);

    const fetchHeatmaps = async () => {
      try {
        if (githubUsername) {
          const githubRes = await getGitHubHeatmap(githubUsername);          
          setGitHubData(githubRes.data.data);
          const streaks = calculateStreaks(JSON.stringify(githubRes.data.data));
          setGitHubStreaks(streaks);
        }else{
          setGitHubData({});
          setGitHubStreaks({ currentStreak: 0, maxStreak: 0 });
          setGitError("Please update your GitHub profile in Settings.");
        }

        if (leetcodeUsername) {
          const leetcodeRes =  await getLeetCodeData(leetcodeUsername);
          setLeetCodeData(leetcodeRes.data.submissionCalendar);
          setLeetError(leetcodeRes.data.error);
          const streaks = calculateStreaks(JSON.stringify(leetcodeRes.data.submissionCalendar));
          setLeetCodeStreaks(streaks);
        }else{
          setLeetCodeData({});
          setLeetCodeStreaks({ currentStreak: 0, maxStreak: 0 });
          setLeetError("Please update your LeetCode profile in Settings.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchHeatmaps();
  }, []);

  return (
    <>
      <div className="home">

      <div className="heatmap-container">
        <Heatmap
          data={leetcodeData || {}}
          isUnix={true}
          platform="leetcode"
          streaks={leetCodeStreaks}
          error={leetError}
        />
        <Heatmap
          data={githubData || {}}
          isUnix={false}
          platform="github"
          streaks={githubStreaks}
          error={gitError}
        />
      </div>

      </div>
    
    </>
  );
}

export default HeatMaps;
