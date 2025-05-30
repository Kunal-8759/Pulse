import React, { useEffect, useState } from 'react';
import { fetchContests } from '../../services/api';
import ContestCard from '../../components/contests/ContestCard';
import './ContestList.css'; // <- Import your CSS file
import FilterContest from '../../components/contests/FilterContest';

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [filters, setFilters] = useState({
    selectedPlatforms: ['LeetCode', 'Codeforces', 'CodeChef'],
    selectedStatus: "All",
  })

  useEffect(() => {
    fetchContests()
      .then(res => setContests(res.data))
      .catch(err => console.error(err));
  }, []);


  const getFilteredContests = () => {
  let filtered = [...contests]

  // Filter by platform
  if (filters.selectedPlatforms.length > 0) {
    filtered = filtered.filter((contest) => filters.selectedPlatforms.includes(contest.platform))
  }

  // Filter by status
  const currentTime = Math.floor(Date.now() / 1000)
  if (filters.selectedStatus !== "All") {
    if (filters.selectedStatus === "Upcoming") {
      filtered = filtered.filter((contest) => contest.startTime > currentTime)
    } else if (filters.selectedStatus === "Ongoing") {
      filtered = filtered.filter(
        (contest) => contest.startTime <= currentTime && contest.startTime + contest.duration > currentTime,
      )
    } else if (filters.selectedStatus === "Past") {
      filtered = filtered.filter((contest) => contest.startTime + contest.duration <= currentTime)
    }
  }

  return filtered
  }

 const filteredContests = getFilteredContests();

  return (
    <div className="contest-list-container">
       <div className="contest-sidebar">
         <FilterContest contests={contests} filters={filters} setFilters={setFilters} />
        </div>
        <div className='contest-wrapper'>
          <div className="contest-grid">
            {filteredContests.map((contest, index) => (
              <ContestCard key={index} contest={contest} />
            ))}
          </div>
        </div>
        
      </div>
  );
};

export default Contests;
