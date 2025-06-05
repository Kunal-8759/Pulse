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
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar h-4 w-4 mr-2 mt-1 hackathon-1"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> 
            {submissionPeriod}</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4 mr-2 mt-0.5 text-muted-foreground hackathon-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy h-4 w-4 mr-2 mt-0.5 text-muted-foreground hackathon-1"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            {cleanPrize} in prizes</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-4 w-4 mr-2 mt-0.5 text-muted-foreground hackathon-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {participants.toLocaleString()} participants</p>
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
