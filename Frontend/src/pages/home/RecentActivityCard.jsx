"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./RecentActivityCard.css";
import { ActivityList } from "../../components/Home/ActivityComponent";
import ActivityTabNavigation from "../../components/Home/ActivityTabNavigation";
import { getGithubActivity, getLeetcodeActivity } from "../../services/api";

const RecentActivityCard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const leetcodeUsername = localStorage?.getItem("leetcodeUsername");
  const githubUsername = localStorage?.getItem("githubUsername");

  //leetcode Query
  const {
    data: leetcodeData,
    isLoading: leetcodeLoading,
    error: leetcodeError,
  } = useQuery({
    queryKey: ["leetcode-activity", leetcodeUsername],
    queryFn: async () => {
      if (!leetcodeUsername) return null;
      const response = await getLeetcodeActivity(leetcodeUsername);
      return response.data.data;
    },
    enabled: !!leetcodeUsername,
    staleTime: leetcodeUsername ? 5 * 60 * 1000 : 0,
    cacheTime: leetcodeUsername ? 10 * 60 * 1000 : 0,
  });

  //github query
  const {
    data: githubData,
    isLoading: githubLoading,
    error: githubError,
  } = useQuery({
    queryKey: ["github-activity", githubUsername],
    queryFn: async () => {
      if (!githubUsername) return null;
      const response = await getGithubActivity(githubUsername);
      return response.data.events;
    },
    enabled: !!githubUsername,
    staleTime: githubUsername ? 5 * 60 * 1000 : 0,
    cacheTime: githubUsername ? 10 * 60 * 1000 : 0,
  });

  const isLoading = leetcodeLoading || githubLoading;
  const hasError = leetcodeError || githubError;

  if (hasError) {
    console.error("Error fetching data:", leetcodeError || githubError);
  }

  const combineAndSortData = () => {
    const combinedData = [];

    leetcodeData?.forEach((item) => {
      combinedData.push({
        ...item,
        platform: "LeetCode",
        type: "problem",
      });
    });

    githubData?.forEach((item) => {
      combinedData.push({
        ...item,
        platform: "GitHub",
      });
    });

    // Sort by date (most recent first)
    return combinedData.sort((a, b) => {
      const dateA = new Date(
        a.date.split(", ")[0].split("/").reverse().join("/") +
          " " +
          a.date.split(", ")[1]
      );
      const dateB = new Date(
        b.date.split(", ")[0].split("/").reverse().join("/") +
          " " +
          b.date.split(", ")[1]
      );
      return dateB - dateA;
    });
  };

  const allActivities = combineAndSortData();

  // Filter activities based on active tab
  const getFilteredActivities = () => {
    if (activeTab === "all") {
      return allActivities;
    } else if (activeTab === "leetcode") {
      return allActivities.filter((item) => item.platform === "LeetCode");
    } else {
      return allActivities.filter((item) => item.platform === "GitHub");
    }
  };

  return (
    <div className="recent-activity-card">
      <div className="recent-card-header">
        <h2>Recent Activity</h2>
        <p>Your recent LeetCode and GitHub activity</p>
        <ActivityTabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="activity-container">
        {isLoading ? (
          <div className="recent-activities loading">Loading activities...</div>
        ) : hasError ? (
          <div className="error-state">
            Failed to load activities. Please try again.
          </div>
        ) : (
          <ActivityList activities={getFilteredActivities()} />
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;
