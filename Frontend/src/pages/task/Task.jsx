"use client"

import { useState, useEffect } from "react"
import TaskModal from "../../components/Tasks/TaskModal"
import TaskCard from "../../components/Tasks/TaskCard"
import "./Task.css"

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...taskData, id: task.id } : task)))
    } else {
      setTasks([...tasks, { ...taskData, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleCycleStatus = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const statusMap = {
            "To Do": "In Progress",
            "In Progress": "Completed",
            Completed: "To Do",
          }
          return { ...task, status: statusMap[task.status] }
        }
        return task
      }),
    )
  }

  const renderTaskSection = (status, label) => {
    const filteredTasks = tasks.filter((task) => task.status === status)

    return (
      <div className="task-section">
        <h2 className="task-section-title">{label}</h2>
        <div className="task-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
                onCycleStatus={() => handleCycleStatus(task.id)}
              />
            ))
          ) : (
            <div className="no-tasks">
              <p>No {label} tasks.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button className="add-task-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </header>

      {renderTaskSection("To Do", "To-Do")}
      {renderTaskSection("In Progress", "In Progress")}
      {renderTaskSection("Completed", "Completed")}

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} task={editingTask} />}
    </div>
  )
}

export default Task
