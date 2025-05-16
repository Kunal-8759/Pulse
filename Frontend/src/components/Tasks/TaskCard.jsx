"use client"
import "./TaskCard.css"
import Tag from "./Tag"
import { useState } from "react"

const TaskCard = ({ task, onEdit, onDelete, onCycleStatus }) => {
  const { title, description, link, dueDate, dueTime, status, tags } = task

  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const getStatusClass = () => {
    switch (status) {
      case "Completed":
        return "status-completed"
      case "InProgress":
        return "status-progress"
      default:
        return "status-todo"
    }
  }

  const getStatusDisplay = () => {
    switch (status) {
      case "Completed":
        return "COMPLETED"
      case "InProgress":
        return "IN_PROGRESS"
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
    <>
      <div className="task-card">
      <div className="task-card-header">
        <button
          className={`status-toggle ${status}`}
          onClick={onCycleStatus}
          aria-label="Toggle task status"
        >
          {status === "Completed" && "✓"}
        </button>

        <h3 className="task-title">
          {title}
        </h3>

        <div className="task-actions">
          <button className="edit-btn" onClick={onEdit} aria-label="Edit task">
            <span className="edit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4" ><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
            </span>
          </button>
          <button className="delete-btn" onClick={()=>setShowConfirmModal(true)} aria-label="Delete task">
            <span className="delete-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4" ><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
            </span>
          </button>
        </div>
      </div>

      {link && (
        <div className="task-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link h-3 w-3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <a href={link} target="_blank" rel="noopener noreferrer" className="task-link-url">
            {link}
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link h-3 w-3 flex-shrink-0"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
        </div>
      )}

      {description && <p className="task-description">{description}</p>}

      {dueDate && (
        <div className="task-date">
          <span className="date-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-4 w-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </span>
          {formatDateTime()}
        </div>
      )}

      {dueDate && dueTime && (
        <button className="reminder-btn" onClick={handleSetReminder}>
          <span className="reminder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-3 w-3 mr-1"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
          </span>
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

    {showConfirmModal && (
      <div className="modal-overlay">
        <div className="modal">
          <p>Are you sure?</p>
          <p className="para-2">This will permanently delete the task.This action cannot be undone</p>
          <div className="modal-actions">
            <button className="confirm-btn" onClick={() => { setShowConfirmModal(false); onDelete(); }}>
              Delete
            </button>
            <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
 
  </> 
  )
}

export default TaskCard
