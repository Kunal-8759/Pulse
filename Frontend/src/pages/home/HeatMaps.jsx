import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGitHubHeatmap, getLeetCodeData } from "../../services/api";
import Heatmap from "../../components/Home/HeatMap";
import "../../components/Home/HeatMap.css";

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
      const dayStart =
        Math.floor(timestamp / ONE_DAY_SECONDS) * ONE_DAY_SECONDS;
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
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
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
  const [leetCodeStreaks, setLeetCodeStreaks] = useState({
    currentStreak: 0,
    maxStreak: 0,
  });
  const [githubStreaks, setGitHubStreaks] = useState({
    currentStreak: 0,
    maxStreak: 0,
  });

  const githubUsername = localStorage.getItem("githubUsername");
  const leetcodeUsername = localStorage.getItem("leetcodeUsername");

  console.log("GitHub Username:", githubUsername);
  console.log("leetcode username : ", leetcodeUsername);

  // GitHub data query
  const {
    data: githubResponse,
    error: githubError,
    isLoading: githubLoading,
  } = useQuery({
    queryKey: ["github-heatmap", githubUsername],
    queryFn: async () => {
      if (!githubUsername) {
        return {
          data: {},
          error: "Please update your GitHub profile in Settings.",
        };
      }
      const githubRes = await getGitHubHeatmap(githubUsername);
      return {
        data: githubRes.data.data,
        error: githubRes.data.error,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });

  // LeetCode data query
  const {
    data: leetcodeResponse,
    error: leetcodeError,
    isLoading: leetcodeLoading,
  } = useQuery({
    queryKey: ["leetcode-heatmap", leetcodeUsername],
    queryFn: async () => {
      if (!leetcodeUsername) {
        return {
          data: {},
          error: "Please update your LeetCode profile in Settings.",
        };
      }
      const leetcodeRes = await getLeetCodeData(leetcodeUsername);
      return {
        data: leetcodeRes.data.submissionCalendar,
        error: leetcodeRes.data.error,
      };
    },
    staleTime: leetcodeUsername ? 5 * 60 * 1000 : 0, // 5 minutes
    cacheTime: leetcodeUsername ? 30 * 60 * 1000 : 0, // 30 minutes
    refetchOnWindowFocus: false,
  });

  // Calculate GitHub streaks when data changes
  useEffect(() => {
    if (githubResponse?.data) {
      const streaks = calculateStreaks(JSON.stringify(githubResponse.data));
      setGitHubStreaks(streaks);
    } else {
      setGitHubStreaks({ currentStreak: 0, maxStreak: 0 });
    }
  }, [githubResponse]);

  // Calculate LeetCode streaks when data changes
  useEffect(() => {
    if (leetcodeResponse?.data) {
      const streaks = calculateStreaks(JSON.stringify(leetcodeResponse.data));
      setLeetCodeStreaks(streaks);
    } else {
      setLeetCodeStreaks({ currentStreak: 0, maxStreak: 0 });
    }
  }, [leetcodeResponse]);

  // Prepare data and errors for the Heatmap components
  const gitData = githubResponse?.data || {};
  const leetData = leetcodeResponse?.data || {};

  const gitError = githubResponse?.error || githubError;
  const leetError = leetcodeResponse?.error || leetcodeError;

  return (
    <>
      <div className="home">
        <div className="heatmap-container">
          <Heatmap
            data={leetData}
            isUnix={true}
            platform="leetcode"
            streaks={leetCodeStreaks}
            error={leetError}
            isLoading={githubLoading}
          />
          <Heatmap
            data={gitData}
            isUnix={false}
            platform="github"
            streaks={githubStreaks}
            error={gitError}
            isLoading={leetcodeLoading}
          />
        </div>
      </div>
    </>
  );
}
export default HeatMaps;
