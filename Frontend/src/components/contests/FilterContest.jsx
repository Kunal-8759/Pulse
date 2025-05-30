"use client"
import "./FilterContest.css"

const FilterContest = ({ contests, filters, setFilters }) => {
  // Get unique platforms from contests
  const platforms = [...new Set(contests.map((contest) => contest.platform))]

  // Toggle platform selection
  const togglePlatform = (platform) => {
    const newPlatforms = filters.selectedPlatforms.includes(platform)
      ? filters.selectedPlatforms.filter((p) => p !== platform)
      : [...filters.selectedPlatforms, platform]

    setFilters({ ...filters, selectedPlatforms: newPlatforms })
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      selectedPlatforms: ['LeetCode', 'Codeforces', 'CodeChef'],
      selectedStatus: "All",
    })
  }

  return (
    <div className="filter-contests-container">
      <h2 className="filter-heading">Filter Contests</h2>

      <div className="filters-section">
        <div className="filters-header">
          <span className="filter-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.5 2H1.5L6.5 8.5V13L9.5 14V8.5L14.5 2Z"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="filters-title">Filters</span>
        </div>

        <div className="filter-group">
          <h3 className="filter-group-title">Platforms</h3>
          <div className="platform-buttons">
            {platforms.map((platform) => (
              <button
                key={platform}
                className={`platform-button ${filters.selectedPlatforms.includes(platform) ? "active" : ""} ${platform.toLowerCase()}`}
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-group-title">Status</h3>
          <div className="status-buttons">
            <button
              className={`status-button ${filters.selectedStatus === "All" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, selectedStatus: "All" })}
            >
              All
            </button>
            <button
              className={`status-button ${filters.selectedStatus === "Upcoming" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, selectedStatus: "Upcoming" })}
            >
              Upcoming
            </button>
            <button
              className={`status-button ${filters.selectedStatus === "Ongoing" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, selectedStatus: "Ongoing" })}
            >
              Ongoing
            </button>
            <button
              className={`status-button ${filters.selectedStatus === "Past" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, selectedStatus: "Past" })}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      <div className="filter-actions">
        <button className="refresh-button">
          <span className="refresh-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C5.5 1 3.31 2.4 2 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1V4.5H4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Refresh
        </button>
        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default FilterContest
