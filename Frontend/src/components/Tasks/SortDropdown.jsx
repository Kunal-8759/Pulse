import { ArrowUpDown, ChevronDown } from "lucide-react"
import React from "react"
import "../../pages/task/Task.css"

const options = [
  "Newest First",
  "Oldest First",
  "Title A-Z",
  "Title Z-A",
  "Due Date (Earliest)",
  "Due Date (Latest)",
]

const SortDropdown = ({ status, currentOption, isOpen, onToggle, onChange }) => {
  return (
    <div className="sort-dropdown">
      <button className="sort-button" onClick={() => onToggle(status)}>
        <ArrowUpDown className="sort-icon" />
        {currentOption} <ChevronDown className="dropdown-icon" />
      </button>

      {isOpen && (
        <div className="sort-options">
          {options.map((option) => (
            <div
              key={option}
              className={`sort-option ${currentOption === option ? "selected" : ""}`}
              onClick={() => onChange(status, option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown
