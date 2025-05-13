"use client"

import "./LeetcodeCard.css"
import { useState, useEffect } from "react"
import { getLeetCodeData,getDailyProblem } from "../../services/api"


const LeetCodeCard = () => {
  const [leetCodeData, setLeetCodeData] = useState(null)
  const [dailyProblem, setDailyProblem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const leetcodeUsername = localStorage.getItem("leetcodeUsername");

    const fetchData = async () => {
      try {
        // Call your functions to get the data
        const statsData = await getLeetCodeData(leetcodeUsername);
        const problemData = await getDailyProblem();

        console.log("LeetCode Stats Data:", statsData.data);
        console.log("LeetCode Daily Problem Data:", problemData.data);

        setLeetCodeData(statsData)
        setDailyProblem(problemData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching LeetCode data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Show loading state while fetching data
  if (loading) {
    return <div className="leetcode-card loading">Loading LeetCode data...</div>
  }

  // Use fallback data if the API calls fail
  const data = leetCodeData.data ;

  const problem = dailyProblem.data ;

  return (
    <div className="leetcode-card">
      <h1 className="card-title">LeetCode Problem of the Day</h1>
      <p className="card-subtitle">Daily coding challenge</p>

      <div className="problem-header">
        <h2 className="problem-title">{problem.title}</h2>
        <div className="problem-info">
          <div className={`difficulty-tag   difficulty-tag-${problem.difficulty}`}>{problem.difficulty}</div>
          <div className="acceptance-tag">{problem.acRate}</div>
        </div>

      </div>

      <p className="problem-id">Problem #{problem.frontendId} - Today's LeetCode Challenge</p>

      <div className="topic-tags">
        {problem.topicTags.map((tag, index) => (
          <div key={index} className="topic-tag">
            {tag}
          </div>
        ))}
      </div>

      <a href={problem.link} target="_blank" className="solve-button">
        <span className="code-icon">&#60;/&#62;</span>
        Solve Problem
        <span className="external-icon">&#8599;</span>
      </a>

      <div className="divider"></div>

      <h3 className="progress-title">Your LeetCode Progress</h3>

      <div className="progress-item">
        <div className="progress-label">
          <span>Total</span>
          <span className="progress-count">
            {data.totalSolved} / {data.total}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill total" style={{ width: `${(data.totalSolved / data.total) * 100}%` }}></div>
        </div>
      </div>

      <div className="progress-item">
        <div className="progress-label">
          <span>Easy</span>
          <span className="progress-count">
            {data.easySolved} / {data.easyTotal}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill easy" style={{ width: `${(data.easySolved / data.easyTotal) * 100}%` }}></div>
        </div>
      </div>

      <div className="progress-item">
        <div className="progress-label">
          <span>Medium</span>
          <span className="progress-count">
            {data.mediumSolved} / {data.mediumTotal}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill medium"
            style={{ width: `${(data.mediumSolved / data.mediumTotal) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="progress-item">
        <div className="progress-label">
          <span>Hard</span>
          <span className="progress-count">
            {data.hardSolved} / {data.hardTotal}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill hard" style={{ width: `${(data.hardSolved / data.hardTotal) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default LeetCodeCard
