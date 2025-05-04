"use client"

// Add import for component-specific CSS
import "./ActivityTabNavigation.css"

const ActivityTabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <span className="tab-navigation">
      <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
        All
      </button>
      <button
        className={`tab-button ${activeTab === "leetcode" ? "active" : ""}`}
        onClick={() => setActiveTab("leetcode")}
      >
        LeetCode
      </button>
      <button className={`tab-button ${activeTab === "github" ? "active" : ""}`} onClick={() => setActiveTab("github")}>
        GitHub
      </button>
    </span>
  )
}

export default ActivityTabNavigation;
