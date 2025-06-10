import "./ActivityComponent.css"

// LeetCode Activity Component
export const LeetCodeActivity = ({ activity }) => {
  return (
    <div className="activity-content">
      <div className="activity-icon leetcode-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code h-4 w-4"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      </div>
      <div className="activity-details">
        <div className="activity-header">
          <span className="platform-badge leetcode">LeetCode</span>
          <a href={activity.url} target="_blank" rel="noopener noreferrer" className="activity-title">
            {activity.title}<span className="external-link-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link h-3 w-3 ml-1"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            </span>
          </a>
        </div>
        <div className="activity-meta">
          <div className={`status-badge ${activity.status.toLowerCase()}`}>
            {activity.status === "Accepted" && <span className="check-icon">✓</span>}
            {activity.status}
          </div>
          <div className="lang-badge">{activity.lang}</div>
        </div>
      </div>
      <div className="activity-time">
        <div className="timestamp">{activity.date.split(", ")[1]}</div>
        <div className="timeago">{activity.ago}</div>
      </div>
    </div>
  )
}

// GitHub Activity Component
export const GitHubActivity = ({ activity }) => {
  return (
    <div className="activity-content">
      <div className="activity-icon github-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-branch h-4 w-4 text-blue-500"><line x1="6" x2="6" y1="3" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
      </div>
      <div className="activity-details">
        <div className="activity-header">
          <span className="platform-badge github">GitHub</span>
          <a href={activity.link} target="_blank" rel="noopener noreferrer" className="repo-link">
            {activity.type}
            <span className="external-link-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link h-3 w-3 ml-1"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            </span>
          </a>
        </div>
        <div className="activity-meta">
          <span className="repo-name">{activity.repo}</span>
          {activity.message && <div className="commit-message">{activity.message}</div>}
        </div>
      </div>
      <div className="activity-time">
        <div className="timestamp">{activity.date.split(", ")[1]}</div>
        <div className="timeago">{activity.ago}</div>
      </div>
    </div>
  )
}

// Activity List Component
export const ActivityList = ({ activities }) => {
  return (
    <div className="activity-list">
      {
        activities.length == 0 ?
          <div className="caution">No data is available </div>
          :
          (activities.map((activity, index) => (
            <div key={index} className="activity-item">
              {activity.platform === "LeetCode" ? (
                <LeetCodeActivity activity={activity} />
              ) : (
                <GitHubActivity activity={activity} />
              )}
            </div>
          )))
      }
    </div>
  )
}
