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
      // UNIX timestamp (already in seconds)
      timestamp = parseInt(key, 10);
    } else {
      // "YYYY-MM-DD" string — manually parse as UTC midnight
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

  // --- MAX STREAK ---
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

  // --- CURRENT STREAK ---
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




function Home() {
  const [githubData, setGitHubData] = useState(null);
  const [leetcodeData, setLeetCodeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [leetCodeStreaks, setLeetCodeStreaks] = useState({ currentStreak: 0, maxStreak: 0 });
  const [githubStreaks, setGitHubStreaks] = useState({ currentStreak: 0, maxStreak: 0 });


  useEffect(() => {
    const githubUsername = localStorage.getItem("githubUsername");
    const leetcodeUsername = localStorage.getItem("leetcodeUsername");

    console.log("GitHub Username:", githubUsername);
    console.log("LeetCode Username:", leetcodeUsername);

    if (!githubUsername && !leetcodeUsername) {
      setErrorMessage("Please enter your GitHub and LeetCode profile in settings.");
      return;
    }

    const fetchHeatmaps = async () => {
      try {
        if (githubUsername) {
          const githubRes = await getGitHubHeatmap(githubUsername);          
          console.log("GitHub Heatmap Data:", githubRes.data);
          setGitHubData(githubRes.data);
          const streaks = calculateStreaks(JSON.stringify(githubRes.data));
          setGitHubStreaks(streaks);
        }

        if (leetcodeUsername) {
          const leetcodeRes =  await getLeetCodeData(leetcodeUsername);
          
          setLeetCodeData(leetcodeRes.data.submissionCalendar);
          const streaks = calculateStreaks(JSON.stringify(leetcodeRes.data.submissionCalendar));
          setLeetCodeStreaks(streaks);
        }

        if (!githubUsername || !leetcodeUsername) {
          setErrorMessage("Some profiles are missing. Please update them in settings.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong while fetching heatmap data.");
      }
    };

    fetchHeatmaps();
  }, []);

  return (
    <>
      <div className="home">
      <h1>Welcome to the kkCode Home Page!</h1>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      <div className="heatmap-container">
        {leetcodeData && <Heatmap data={leetcodeData} isUnix={true} platform="leetcode" streaks={leetCodeStreaks} />}
        {githubData && <Heatmap data={githubData} isUnix={false} platform="github" streaks={githubStreaks}/>}
      </div>

      </div>
    
    </>
  );
}

export default Home;
