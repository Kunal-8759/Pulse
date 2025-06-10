"use client";
import "./LeetcodeCard.css";
import { getLeetCodeData, getDailyProblem } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import DailyProblem from "../../components/Home/DailyProblem";
import LeetcodeProgress from "../../components/Home/LeetcodeProgress";
import Skelton from "../../components/Skelton/CustomSkelton";
// import CustomSkelton from "../../components/CustomSkelton/CustomSkelton";


const LeetCodeCard = () => {
  const leetcodeUsername = localStorage.getItem("leetcodeUsername");

  // Query for LeetCode user stats
  const {
    data: leetCodeResponse,
    error: leetcodeError,
    isLoading: leetcodeLoading,
  } = useQuery({
    queryKey: ["leetcode-stats", leetcodeUsername],
    queryFn: async () => {
      if (!leetcodeUsername) {
        return {
          data: {},
          error: "Kindly update your LeetCode Profile",
        };
      }
      const statsData = await getLeetCodeData(leetcodeUsername);
      console.log("statasvadzfvcdzfc", statsData.data);
      return {
        data: statsData.data,
        error: "",
      };
    },
    staleTime: leetcodeUsername ? 5 * 60 * 1000 : 0, // 5 minutes
    cacheTime: leetcodeUsername ? 30 * 60 * 1000 : 0, // 30 minutes - keeps data in cache when navigating
    refetchOnWindowFocus: false,
  });

  // Query for daily problem
  const {
    data: dailyProblemResponse,
    error: dailyProblemError,
    isLoading: dailyProblemLoading,
  } = useQuery({
    queryKey: ["leetcode-daily-problem"],
    queryFn: async () => {
      const problemData = await getDailyProblem();
      return problemData;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (daily problem doesn't change often)
    cacheTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="leetcode-card">
          <DailyProblem
            problem={dailyProblemResponse?.data}
            dailyProblemError={dailyProblemError}
            isLoading = {dailyProblemLoading}
          />

        <div className="divider"></div>

        <LeetcodeProgress
          data={leetCodeResponse?.data}
          error={leetCodeResponse?.error}
          isLoading={leetcodeLoading}
        />

      </div>

    </>
  );
};

export default LeetCodeCard;
