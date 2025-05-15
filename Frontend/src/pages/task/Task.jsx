"use client"

import { useState, useEffect } from "react"
import TaskModal from "../../components/Tasks/TaskModal"
import TaskSection from "../../components/Tasks/TaskSection"
import { Search, ChevronDown } from "lucide-react"
import { filterTasks } from "../../components/Tasks/taskUtils"
import "./Task.css"

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openSortDropdown, setOpenSortDropdown] = useState(null)
  const [collapsedSections, setCollapsedSections] = useState({
    ToDo: false,
    InProgress: false,
    Completed: false,
  })
  const [sortOptions, setSortOptions] = useState({
    ToDo: "Due Date (Earliest)",
    InProgress: "Due Date (Earliest)",
    Completed: "Due Date (Earliest)",
  })

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) setTasks(JSON.parse(storedTasks))
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
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: { ToDo: "InProgress", InProgress: "Completed", Completed: "ToDo" }[task.status],
            }
          : task
      )
    )
  }

  const toggleSortDropdown = (status) => {
    setOpenSortDropdown(openSortDropdown === status ? null : status)
  }

  const toggleSectionCollapse = (status) => {
    setCollapsedSections({ ...collapsedSections, [status]: !collapsedSections[status] })
  }

  const handleSortChange = (status, sortOption) => {
    setSortOptions({ ...sortOptions, [status]: sortOption })
    setOpenSortDropdown(null)
  }

  const filteredTasks = filterTasks(tasks, searchQuery, statusFilter)

  const getTasksByStatus = (status) => filteredTasks.filter((task) => task.status === status)

  return (
    <div className="task-page">
      <header className="task-header">
        <h1>Tasks</h1>
        <button className="add-task-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </header>

      <div className="search-filter-box">
        <div className="search-filter-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="        Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-dropdown">
            <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              {statusFilter} Status <ChevronDown className="dropdown-icon" />
            </button>

            {isFilterOpen && (
              <div className="filter-options">
                {["All", "ToDo", "InProgress", "Completed"].map((status) => (
                  <div
                    key={status}
                    className={`filter-option ${statusFilter === status ? "selected" : ""}`}
                    onClick={() => {
                      setStatusFilter(status)
                      setIsFilterOpen(false)
                      setOpenSortDropdown(null)
                    }}
                  >
                    {status === "All" ? "All Status" : status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {(statusFilter === "All" || statusFilter === "ToDo") && (
        <TaskSection
          status="ToDo"
          label="TO-DO"
          tasks={getTasksByStatus("ToDo")}
          collapsed={collapsedSections["ToDo"]}
          onToggleCollapse={toggleSectionCollapse}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onCycleStatus={handleCycleStatus}
          sortOption={sortOptions["ToDo"]}
          isSortOpen={openSortDropdown === "ToDo"}
          onToggleSort={toggleSortDropdown}
          onSortChange={handleSortChange}
        />
      )}

      {(statusFilter === "All" || statusFilter === "InProgress") && (
        <TaskSection
          status="InProgress"
          label="In Progress"
          tasks={getTasksByStatus("InProgress")}
          collapsed={collapsedSections["InProgress"]}
          onToggleCollapse={toggleSectionCollapse}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onCycleStatus={handleCycleStatus}
          sortOption={sortOptions["InProgress"]}
          isSortOpen={openSortDropdown === "InProgress"}
          onToggleSort={toggleSortDropdown}
          onSortChange={handleSortChange}
        />
      )}

      {(statusFilter === "All" || statusFilter === "Completed") && (
        <TaskSection
          status="Completed"
          label="Completed"
          tasks={getTasksByStatus("Completed")}
          collapsed={collapsedSections["Completed"]}
          onToggleCollapse={toggleSectionCollapse}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onCycleStatus={handleCycleStatus}
          sortOption={sortOptions["Completed"]}
          isSortOpen={openSortDropdown === "Completed"}
          onToggleSort={toggleSortDropdown}
          onSortChange={handleSortChange}
        />
      )}

      {isModalOpen && (
        <TaskModal onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} task={editingTask} />
      )}
    </div>
  )
}

export default Task
