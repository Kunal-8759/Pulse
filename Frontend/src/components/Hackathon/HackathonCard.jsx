import React from "react";
import "./HackathonCard.css"; // <- Import your CSS file

const HackathonCard = ({ thumbnail,title, organizer, submissionPeriod ,location, prize, participants, portfolio, url }) => {

    const cleanPrize = prize.replace(/<[^>]*>/g, "");


  return (
    <div className="card">
      <div className="card-image">
        <img src={thumbnail} alt="Hackathon Banner" />
        <span className="status">✓ Open</span>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p className="organizer">{organizer}</p>
        <div className="info">
          <p>📅 {submissionPeriod}</p>
          <p>🌐 {location}</p>
          <p>🏆 {cleanPrize} in prizes</p>
          <p>👥 {participants.toLocaleString()} participants</p>
        </div>
        <div className="tags-container">
          {portfolio.map((tag) => (
            <span className="tag-item" key={tag}>{tag}</span>
          ))}
        </div>
        <a href={url} className="view-button" target="_blank" rel="noopener noreferrer">
          View Hackathon
        </a>
      </div>
    </div>
  );
};

export default HackathonCard;
