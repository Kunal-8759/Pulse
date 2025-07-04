"use client"

import "./AccountIntegration.css"
import { useState } from "react"
import HelpCard from "./HelpCard"
import toast, { Toaster } from "react-hot-toast"

const AccountIntegration = () => {
  const [githubUsername, setGithubUsername] = useState(localStorage.getItem("githubUsername") || "")
  const [leetcodeUsername, setLeetcodeUsername] = useState(localStorage.getItem("leetcodeUsername") || "")

  function saveGitHubSettings() {
    if (!githubUsername.trim()) {
      localStorage.setItem('githubUsername', '');
      setGithubUsername('');
      toast.success("GitHub username cleared");
      return;
    }

    try {
      let username = githubUsername.trim();
      const isUrl = username.includes('http') || username.includes('github.com/');

      if (isUrl) {
        if (username.includes('github.com/')) {
          try {
            const url = new URL(username.includes('http') ? username : `https://${username}`);
            const pathParts = url.pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
              username = pathParts[0]; // First path segment after domain is username
            } else {
              toast.error("Invalid GitHub URL format");
              return;
            }
          } catch (error) {
            toast.error("Invalid GitHub URL format");
            return;
          }
        } else {
          toast.error("Please enter a valid GitHub URL");
          return;
        }
      } else {
        if (username.includes('/') || username.includes('.') || username.includes(' ')) {
          toast.error("Please enter either a GitHub username or a valid GitHub URL");
          return;
        }
      }

      // Save the extracted/validated username
      localStorage.setItem('githubUsername', username);
      setGithubUsername(username);
      toast.success("GitHub Username saved successfully!");

    } catch (error) {
      console.error("Error saving GitHub settings:", error);
      toast.error("Failed to save GitHub Username");
    }
  }

  function saveLeetCodeSettings() {
    if (!leetcodeUsername.trim()) {
      localStorage.setItem('leetcodeUsername', '');
      setLeetcodeUsername('');
      toast.success("LeetCode username cleared");
      return;
    }

    try {
      let username = leetcodeUsername.trim();
      const isUrl = username.includes('http') || username.includes('leetcode.com/');

      if (isUrl) {
        if (username.includes('leetcode.com/')) {
          try {
            const url = new URL(username.includes('http') ? username : `https://${username}`);
            const pathParts = url.pathname.split('/').filter(Boolean);

            if (pathParts.length > 0) {
              if (pathParts[0] === 'u' && pathParts.length > 1) {
                username = pathParts[1];
              } else if (pathParts[0] !== 'u') {
                username = pathParts[0];
              } else {
                toast.error("Invalid LeetCode URL format");
                return;
              }
            } else {
              toast.error("Invalid LeetCode URL format");
              return;
            }
          } catch (error) {
            toast.error("Invalid LeetCode URL format");
            return;
          }
        } else {
          toast.error("Please enter a valid LeetCode URL");
          return;
        }
      } else {
        if (username.includes('/') || username.includes('.') || username.includes(' ')) {
          toast.error("Please enter either a LeetCode username or a valid LeetCode URL");
          return;
        }
      }

      // Save the extracted/validated username
      localStorage.setItem('leetcodeUsername', username);
      setLeetcodeUsername(username);
      toast.success("LeetCode Username saved successfully!");

    } catch (error) {
      console.error("Error saving LeetCode settings:", error);
      toast.error("Failed to save LeetCode Username");
    }
  }

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }} 
      />
      <div className="integration-container">
        <div className="setting-page">Settings</div>
        <div className="data-storage">
          <div className="integration-card">
            <div className="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github h-5 w-5 setting-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <h2>GitHub Integration</h2>
            </div>
            <p className="description">Connect your GitHub account to track contributions and activity</p>

            <div className="form-group">
              <label className="input-label">GitHub Username</label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="Enter your GitHub username"
                className="input-field"
              />
              <p className="example-text">Example: "username" or "https://github.com/username"</p>
            </div>

            <button onClick={saveGitHubSettings} className="save-button github-button">
              Save GitHub Settings
            </button>
          </div>

          <div className="integration-card">
            <div className="card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-code h-5 w-5 setting-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
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
              <p className="example-text">Example: "username" or "https://leetcode.com/u/username"</p>
            </div>

            <button onClick={saveLeetCodeSettings} className="save-button leetcode-button">
              Save LeetCode Settings
            </button>
          </div>
        </div>
        <HelpCard />
        <div className='home-footer' >
          <div className='home-footer-content'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" color="var(--primary)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award h-5 w-5 text-primary"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
            <p>Keep grinding!</p>
          </div>
          <div>
            <p>Made with ❤️ by <a target='_blank' href="https://www.linkedin.com/in/kunal-kumar-78094a258/">Kunal Kumar</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountIntegration
