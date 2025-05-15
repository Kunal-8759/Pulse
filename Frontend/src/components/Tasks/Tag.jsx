"use client"
import "./Tag.css"

const Tag = ({ text, onRemove }) => {
  return (
    <div className="tag">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag h-3 w-3"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
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
