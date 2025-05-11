import React, { useEffect, useState } from "react";
import HackathonCard from "../../components/Hackathon/HackathonCard";
import "./Hackathon.css"; // <- Import your CSS file
import { fetchHackathons } from "../../services/api";

const Hackathon = () => {
    const [hackathons, setHackathons] = useState([]);

    useEffect(()=>{
        fetchHackathons()
            .then(res=>setHackathons(res.data))
            .catch(err=>console.log(err));
    },[]);

  return (
    <div className="hackathon-grid">
      {hackathons.map((hackathon, index) => (
            <HackathonCard key={index} thumbnail={hackathon.thumbnail} title={hackathon.title} organizer={hackathon.organizer} submissionPeriod={hackathon.submissionPeriod} location={hackathon.location} prize={hackathon.prize} participants={hackathon.participants} portfolio={hackathon.portfolio} url={hackathon.url} platform={hackathon.platform} />
    ))}
    </div>
  );
};

export default Hackathon;
