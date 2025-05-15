// components/Tasks/TaskSection.jsx
import React from "react"
import TaskCard from "./TaskCard"
import SortDropdown from "./SortDropdown"
import { ChevronDown } from "lucide-react"
import { sortTasks } from "./taskUtils"
import "../../pages/task/Task.css"

const TaskSection = ({
  status,
  label,
  tasks,
  collapsed,
  onToggleCollapse,
  onEdit,
  onDelete,
  onCycleStatus,
  sortOption,
  onToggleSort,
  onSortChange,
  isSortOpen,
}) => {
  const sortedTasks = sortTasks(tasks, sortOption)

  return (
    <div className="task-section">
      <div className="section-header">
        <div className="section-title-container">
          <button
            className="section-collapse-btn"
            aria-label={`Toggle ${label} section`}
            onClick={() => onToggleCollapse(status)}
          >
            <ChevronDown className={`collapse-icon ${collapsed ? "transform rotate-90" : ""}`} />
          </button>
          <h2 className="task-section-title">
            {label} <span className="task-count">({tasks.length})</span>
          </h2>
        </div>
        <SortDropdown
          status={status}
          currentOption={sortOption}
          isOpen={isSortOpen}
          onToggle={onToggleSort}
          onChange={onSortChange}
        />
      </div>

      {!collapsed && (
        <div className="task-grid">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task.id)}
                onCycleStatus={() => onCycleStatus(task.id)}
              />
            ))
          ) : (
            <div className="no-tasks">
              <p>No tasks in this section.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskSection
