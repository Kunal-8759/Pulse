"use client"

import { useState ,useEffect} from "react"
import "./RecentActivityCard.css"
import { ActivityList } from "../../components/Home/ActivityComponent"
import ActivityTabNavigation from "../../components/Home/ActivityTabNavigation"
import { getGithubActivity, getLeetcodeActivity } from "../../services/api"



const RecentActivityCard = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [leetcodeData, setLeetCodeData]= useState(null);
  const [githubData,setGitHubData ]= useState(null);
  // Combine and sort data by date (most recent first)

  useEffect(() => {

    const leetcodeUsername = localStorage.getItem("leetcodeUsername");
    const githubUsername = localStorage.getItem("githubUsername");

    const fetchData = async () => {
        try {
            // Call your functions to get the data
            const leetcode = await getLeetcodeActivity(leetcodeUsername);
            const github = await getGithubActivity(githubUsername);

            console.log("LeetCode  Data111:", leetcode.data);
            console.log("github Data111:", github.data.events);

            setLeetCodeData(leetcode.data)
            setGitHubData(github.data.events)
        } catch (error) {
            console.error("Error fetching LeetCode data:", error);
        }
    }

    fetchData()
    }, [])

  const combineAndSortData = () => {
    const combinedData = []

    // Process LeetCode data
    leetcodeData?.forEach((item) => {
      combinedData.push({
        ...item,
        platform: "LeetCode",
        type: "problem",
      })
    })

    // Process GitHub data
    githubData?.forEach((item) => {
      combinedData.push({
        ...item,
        platform: "GitHub",
      })
    })

    // Sort by date (most recent first)
    return combinedData.sort((a, b) => {
      const dateA = new Date(a.date.split(", ")[0].split("/").reverse().join("/") + " " + a.date.split(", ")[1])
      const dateB = new Date(b.date.split(", ")[0].split("/").reverse().join("/") + " " + b.date.split(", ")[1])
      return dateB - dateA
    })
  }

  const allActivities = combineAndSortData()

  // Filter activities based on active tab
  const getFilteredActivities = () => {
    if (activeTab === "all") {
      return allActivities
    } else if (activeTab === "leetcode") {
      return allActivities.filter((item) => item.platform === "LeetCode")
    } else {
      return allActivities.filter((item) => item.platform === "GitHub")
    }
  }

  return (
    <div className="recent-activity-card">
      <div className="recent-card-header">
        <h2>Recent Activity</h2>
        <p>Your recent LeetCode and GitHub activity</p>
        <ActivityTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>


      <div className="activity-container">
        <ActivityList activities={getFilteredActivities()} />
      </div>
    </div>
  )
}

export default RecentActivityCard;
