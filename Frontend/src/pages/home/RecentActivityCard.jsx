"use client"

import { useState ,useEffect} from "react"
import "./RecentActivityCard.css"
import { ActivityList } from "../../components/Home/ActivityComponent"
import ActivityTabNavigation from "../../components/Home/ActivityTabNavigation"
import { getGithubActivity, getLeetcodeActivity } from "../../services/api"



const RecentActivityCard = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [leetcodeData, setLeetCodeData]= useState([]);
  const [githubData,setGitHubData ]= useState([]);

  useEffect(() => {

    const leetcodeUsername = localStorage.getItem("leetcodeUsername");
    const githubUsername = localStorage.getItem("githubUsername");

    const fetchData = async () => {
        try {
          if(leetcodeUsername){
            const leetcode = await getLeetcodeActivity(leetcodeUsername);
            setLeetCodeData(leetcode.data.data)
          }
          if(githubUsername){
            const github = await getGithubActivity(githubUsername);
            setGitHubData(github.data.events)
          }
        } catch (error) {
          console.error("Error fetching LeetCode data:", error);
        }
    }

    fetchData()
    }, [])

  const combineAndSortData = () => {
    const combinedData = []

    leetcodeData?.forEach((item) => {
      combinedData.push({
        ...item,
        platform: "LeetCode",
        type: "problem",
      })
    })

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
