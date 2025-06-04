import React from 'react';
import './ContestCard.css'; // <- Import your CSS file

const ContestCard = ({ contest }) => {
  const formatTime = (sec) => {
    const d = Math.floor(sec / (24 * 3600));
    const h = Math.floor((sec % (24 * 3600)) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    const dd = d > 0 ? `${String(d).padStart(2, '0')}d ` : '';
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');

    return `${dd}${hh}h ${mm}m ${ss}s`;
  };

  // const timeLeft = contest.startTime - Math.floor(Date.now() / 1000);
  const formattedDate = new Date(contest.startTime * 1000).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  });

const handleSetReminder = () => {
  const contestStartDate = new Date(contest.startTime * 1000)
  const year = contestStartDate.getFullYear()
  const month = String(contestStartDate.getMonth() + 1).padStart(2, '0')
  const day = String(contestStartDate.getDate()).padStart(2, '0')
  const hours = String(contestStartDate.getHours()).padStart(2, '0')
  const minutes = String(contestStartDate.getMinutes()).padStart(2, '0')
  
  const startDate = `${year}${month}${day}`
  const startTime = `${hours}${minutes}00`
    
  const contestEndDate = new Date(contest.startTime * 1000 + contest.duration * 1000)
  const endHours = String(contestEndDate.getHours()).padStart(2, '0')
  const endMinutes = String(contestEndDate.getMinutes()).padStart(2, '0')
  const endTime = `${endHours}${endMinutes}00`
  
  
  const eventTitle = `${contest.platform}: ${contest.title}`
  const eventDescription = `Contest: ${contest.title}
Platform: ${contest.platform}
Duration: ${Math.floor(contest.duration / 3600)}h ${Math.floor((contest.duration % 3600) / 60)}m
Contest Link: ${contest.url}`
  
  const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&dates=${startDate}T${startTime}/${startDate}T${endTime}&location=${encodeURIComponent(contest.url)}`
  
  window.open(calendarUrl, "_blank")
}

  return (
    <div className="contest-card">
      <div className="contest-tags">
        <span className={`tagu ${contest.platform.toLowerCase()}-tag`}>{contest.platform}</span>
        <span className="tagu upcoming-tagu">
          {(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const endTime = contest.startTime + contest.duration;
            
            if (currentTime < contest.startTime) return "Upcoming";
            if (currentTime >= contest.startTime && currentTime < endTime) return "Ongoing";
            return "Past";
          })()}
        </span>
        <span className="tagu title-tagu">{contest.platform == "LeetCode" ? contest.title.split(" ")[0] : undefined}</span>
      </div>

      <h2 className="contest-title">{contest.title}</h2>

      <div className="contest-info">
        <span className="emoji">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-4 w-4 text-primary mt-0.5 flex-shrink-0"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
        </span>
        <span><strong>Start : </strong> {formattedDate}</span>
      </div>

      <div className="countdown-box">
        {(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const endTime = contest.startTime + contest.duration;
            
            if (currentTime < contest.startTime) {
              return (
                <>
                  Starts in<br />
                  <span className="countdown-time">{formatTime(contest.startTime - currentTime)}</span>
                </>
              );
            } else if (currentTime >= contest.startTime && currentTime < endTime) {
              return (
                <>
                  Ends in<br />
                  <span className="countdown-time">{formatTime(endTime - currentTime)}</span>
                </>
              );
            } else {
              return (
                <>
                  Contest ended<br />
                  <span className="countdown-time"></span>
                </>
              );
            }
          })()}
      </div>

      <div className="contest-info">
        <span className="emoji">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-4 w-4 text-primary mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </span>
        <span><strong>Duration:</strong> {contest.duration / 60} mins</span>
      </div>

      <div className="contest-buttons">
        <a
          href={contest.url}
          target="_blank"
          rel="noreferrer"
          className="join-btn"
        >
          <span className='join-contest-svg'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy h-3.5 w-3.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg></span>
          Join Contest
        </a>
        <button
          className="remind-btn-contest"
          onClick={handleSetReminder}
        > 
          <span className='remind-me-svg'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell h-3.5 w-3.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg></span>
          Remind Me
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
