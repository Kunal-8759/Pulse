"use client"

import "./LeetcodeCard.css"
import { useState, useEffect } from "react"
import { getLeetCodeData,getDailyProblem } from "../../services/api"


const LeetCodeCard = () => {
  const [leetCodeData, setLeetCodeData] = useState({})
  const [dailyProblem, setDailyProblem] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const leetcodeUsername = localStorage.getItem("leetcodeUsername");

    const fetchData = async () => {
      try {
        if(leetcodeUsername){
          const statsData = await getLeetCodeData(leetcodeUsername);
          console.log("LeetCode Stats Data:", statsData.data);
          setLeetCodeData(statsData)
        }
        const problemData = await getDailyProblem();
        console.log("LeetCode Daily Problem Data:", problemData.data);
        setDailyProblem(problemData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching LeetCode data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="leetcode-card loading">Loading LeetCode data...</div>
  }

  const data = leetCodeData.data ;

  const problem = dailyProblem.data ;

  return (
    <div className="leetcode-card">
      <h1 className="leetcode-card-title">LeetCode Problem of the Day</h1>
      <p className="leetcode-card-subtitle">Daily coding challenge</p>

      <div className="leetcode-problem-header">
        <h2 className="leetcode-problem-title">{problem.title}</h2>
        <div className="leetcode-problem-info">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code h-4 w-4 text-orange-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        Solve Problem
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link h-3 w-3 ml-1"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
      </a>

      <div className="divider"></div>

      <h3 className="progress-title">Your LeetCode Progress</h3>

      {
        !data || data.error ?
        <div className="caution">Kindly update your LeetCode Profile</div>
        :
        <>
          <div className="progress-item">
          <div className="progress-label">
            <span className="Total">Total</span>
            <span className="progress-count">
              {data.totalSolved} / {data.total}
            </span>
          </div>
          <div className="progress-bar-leetcode">
            <div className="progress-fill total" style={{ width: `${(data.totalSolved / data.total) * 100}%` }}></div>
          </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span className="Easy">Easy</span>
              <span className="progress-count">
                {data.easySolved} / {data.easyTotal}
              </span>
            </div>
            <div className="progress-bar-leetcode">
              <div className="progress-fill easy" style={{ width: `${(data.easySolved / data.easyTotal) * 100}%` }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span className="Medium">Medium</span>
              <span className="progress-count">
                {data.mediumSolved} / {data.mediumTotal}
              </span>
            </div>
            <div className="progress-bar-leetcode">
              <div
                className="progress-fill medium"
                style={{ width: `${(data.mediumSolved / data.mediumTotal) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <span className="Hard">Hard</span>
              <span className="progress-count">
                {data.hardSolved} / {data.hardTotal}
              </span>
            </div>
            <div className="progress-bar-leetcode">
              <div className="progress-fill hard" style={{ width: `${(data.hardSolved / data.hardTotal) * 100}%` }}></div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default LeetCodeCard;
