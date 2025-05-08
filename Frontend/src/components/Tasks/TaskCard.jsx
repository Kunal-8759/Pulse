"use client"
import "./TaskCard.css"
import Tag from "./Tag"

const TaskCard = ({ task, onEdit, onDelete, onCycleStatus }) => {
  const { title, description, link, dueDate, dueTime, status, tags } = task

  const getStatusClass = () => {
    switch (status) {
      case "Completed":
        return "status-completed"
      case "In Progress":
        return "status-progress"
      default:
        return "status-todo"
    }
  }

  const getStatusDisplay = () => {
    switch (status) {
      case "Completed":
        return "COMPLETED"
      case "In Progress":
        return "IN PROGRESS"
      default:
        return "TODO"
    }
  }

  const formatDateTime = () => {
    if (!dueDate) return ""

    const date = new Date(dueDate)
    const options = { year: "numeric", month: "short", day: "numeric" }
    const formattedDate = date.toLocaleDateString("en-US", options)

    if (dueTime) {
      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true }
      const formattedTime = new Date(`${dueDate}T${dueTime}`).toLocaleTimeString("en-US", timeOptions)
      return `${formattedDate} ${formattedTime}`
    }

    return formattedDate
  }

  const handleSetReminder = () => {
    if (!dueDate || !dueTime) return

    // Format for Google Calendar
    const startDate = dueDate.replace(/-/g, "")
    const startTime = dueTime.replace(":", "")
    const endTime = dueTime
      .split(":")
      .map((part, index) => (index === 0 ? String(Number(part) + 1).padStart(2, "0") : part))
      .join("")

    const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}${link ? " " + encodeURIComponent(link) : ""}&dates=${startDate}T${startTime}00/${startDate}T${endTime}00`

    window.open(calendarUrl, "_blank")
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <button
          className={`status-toggle ${status === "Completed" ? "completed" : ""}`}
          onClick={onCycleStatus}
          aria-label="Toggle task status"
        >
          {status === "Completed" && "✓"}
        </button>

        <h3 className="task-title">
          {title}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="task-link">
              <span className="link-icon">🔗</span>
            </a>
          )}
        </h3>

        <div className="task-actions">
          <button className="edit-btn" onClick={onEdit} aria-label="Edit task">
            <span className="edit-icon">✏️</span>
          </button>
          <button className="delete-btn" onClick={onDelete} aria-label="Delete task">
            <span className="delete-icon">🗑️</span>
          </button>
        </div>
      </div>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="task-link-url">
          {link}
        </a>
      )}

      {description && <p className="task-description">{description}</p>}

      {dueDate && (
        <div className="task-date">
          <span className="date-icon">🕒</span>
          {formatDateTime()}
        </div>
      )}

      {dueDate && dueTime && (
        <button className="reminder-btn" onClick={handleSetReminder}>
          <span className="reminder-icon">📅</span>
          Set Reminder
        </button>
      )}

      <div className="task-footer">
        <div className={`status-badge ${getStatusClass()}`}>{getStatusDisplay()}</div>

        {tags && tags.length > 0 && (
          <div className="task-tags">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
