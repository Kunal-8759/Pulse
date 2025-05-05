"use client"

import "./AccountIntegration.css"
import { useState, useEffect } from "react"

const AccountIntegration = () => {
  const [githubUsername, setGithubUsername] = useState("")
  const [leetcodeUsername, setLeetcodeUsername] = useState("")

  useEffect(() => {
    // Load saved values from localStorage on mount
    const savedGithub = localStorage.getItem("githubUsername") || ""
    const savedLeetcode = localStorage.getItem("leetcodeUsername") || ""

    setGithubUsername(savedGithub)
    setLeetcodeUsername(savedLeetcode)
  }, [])

  const saveGithub = () => {
    localStorage.setItem("githubUsername", githubUsername)
    alert("GitHub username saved!")
  }

  const saveLeetcode = () => {
    localStorage.setItem("leetcodeUsername", leetcodeUsername)
    alert("LeetCode username saved!")
  }

  return (
    <div className="integration-container">
      <div className="integration-card">
        <div className="card-header">
          <span className="icon">⚙️</span>
          <h2>GitHub Integration</h2>
        </div>
        <p className="description">Connect your GitHub account to track contributions and activity</p>

        <div className="form-group">
          <label>GitHub Username</label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="Enter your GitHub username"
            className="input-field"
          />
          <p className="example-text">Example: "username" or "https://github.com/username"</p>
        </div>

        <button onClick={saveGithub} className="save-button github-button">
          Save GitHub Settings
        </button>
      </div>

      <div className="integration-card">
        <div className="card-header">
          <span className="icon">💻</span>
          <h2>LeetCode Integration</h2>
        </div>
        <p className="description">Connect your LeetCode account to track problem-solving activity</p>

        <div className="form-group">
          <label>LeetCode Username</label>
          <input
            type="text"
            value={leetcodeUsername}
            onChange={(e) => setLeetcodeUsername(e.target.value)}
            placeholder="Enter your LeetCode username"
            className="input-field"
          />
          <p className="example-text">Example: "username" or "https://leetcode.com/username"</p>
        </div>

        <button onClick={saveLeetcode} className="save-button leetcode-button">
          Save LeetCode Settings
        </button>
      </div>
    </div>
  )
}

export default AccountIntegration
