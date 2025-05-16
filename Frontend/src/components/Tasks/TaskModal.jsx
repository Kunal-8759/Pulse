"use client"

import { useState, useEffect } from "react"
import Tag from "./Tag"
import "./TaskModal.css"

const TaskModal = ({ onClose, onSave, task }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")
  const [status, setStatus] = useState("ToDo")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState([])
  const [titleError, setTitleError] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      setDescription(task.description || "")
      setLink(task.link || "")
      setDueDate(task.dueDate || "")
      setDueTime(task.dueTime || "")
      setStatus(task.status || "To Do")
      setTags(task.tags || [])
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setTitleError(true)
      return
    }

    onSave({
      title,
      description,
      link,
      dueDate,
      dueTime,
      status,
      tags,
    })
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(e)
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Create New Task"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="modal-subtitle">Add a new task with details. Press enter to add tags.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (e.target.value.trim()) setTitleError(false)
              }}
              className={titleError ? "error" : ""}
            />
            {titleError && <div className="error-message">Title is required</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="link">Link (Optional)</label>
            <input
              type="text"
              id="link"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date & Time</label>
            <div className="date-time-container">
              <div className="date-input">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                </span>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Select date"
                />
              </div>
              <div className="time-input">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
                <input
                  type="time"
                  id="dueTime"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  placeholder="Select time"
                />
              </div>
            </div>
            <p className="reminder-note">Tasks with time will have a reminder option</p>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                id="tags"
                placeholder="Add tags and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
              <button type="button" className="add-tag-btn" onClick={handleAddTag}>
                +
              </button>
            </div>

            {tags.length > 0 && (
              <div className="tags-container">
                {tags.map((tag, index) => (
                  <Tag key={index} text={tag} onRemove={() => handleRemoveTag(tag)} />
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal


