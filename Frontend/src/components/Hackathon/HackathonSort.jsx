import React from "react";
import "./HackathonSort.css";

const HackathonSort = ({ 
  locationFilter, 
  setLocationFilter, 
  sortOption, 
  setSortOption 
}) => {
  const handleLocationChange = (location) => {
    setLocationFilter(location);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="hackathon-filter-container">
      <div className="location-filter">
        <button 
          className={`filter-btn ${locationFilter === "all" ? "active" : ""}`}
          onClick={() => handleLocationChange("all")}
        >
          All Hackathons
        </button>
        <button 
          className={`filter-btn ${locationFilter === "online" ? "active" : ""}`}
          onClick={() => handleLocationChange("online")}
        >
          <span className="icon">🌐</span> Online
        </button>
        <button 
          className={`filter-btn ${locationFilter === "in-person" ? "active" : ""}`}
          onClick={() => handleLocationChange("in-person")}
        >
          <span className="icon">📍</span> In Person
        </button>
      </div>
      <div className="sort-filter">
        <label htmlFor="sort-select">Sort by:</label>
        <select 
          id="sort-select" 
          value={sortOption} 
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="relevance">Relevance</option>
          <option value="prize">Prize Amount</option>
          <option value="recent">Recently Added</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
    </div>
  );
};

export default HackathonSort;