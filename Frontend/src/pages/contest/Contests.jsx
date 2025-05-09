import React, { useEffect, useState } from 'react';
import { fetchContests } from '../../services/api';
import ContestCard from '../../components/contests/ContestCard';
import './ContestList.css'; // <- Import your CSS file

const Contests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchContests()
      .then(res => setContests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="contest-list-container">
      <div className="contest-wrapper">
        {/* <h1 className="contest-heading">Upcoming Contests</h1> */}
        <div className="contest-grid">
          {contests.map((contest, index) => (
            <ContestCard key={index} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contests;
