"use client"
import "./Tag.css"

const Tag = ({ text, onRemove }) => {
  return (
    <div className="tag">
      <span className="tag-text">{text}</span>
      {onRemove && (
        <button className="tag-remove" onClick={onRemove} aria-label="Remove tag">
          ×
        </button>
      )}
    </div>
  )
}

export default Tag
