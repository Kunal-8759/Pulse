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

  const timeLeft = contest.startTime - Math.floor(Date.now() / 1000);
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

  return (
    <div className="contest-card">
      <div className="contest-tags">
        <span className="tagu platform-tagu">{contest.platform}</span>
        <span className="tagu upcoming-tagu">{timeLeft < 0 ? <p>Past</p> : <p>Upcoming</p> }</span>
        <span className="tagu title-tagu">{contest.platform == "LeetCode" ? contest.title.split(" ")[0] : ""}</span>
      </div>

      <h2 className="contest-title">{contest.title}</h2>

      <div className="contest-info">
        <span className="emoji">📅</span>
        <span><strong>Start:</strong> {formattedDate}</span>
      </div>

      <div className="countdown-box">
        Starts in<br />
        <span className="countdown-time">{timeLeft > 0 ? formatTime(timeLeft) : ""}</span>
      </div>

      <div className="contest-info">
        <span className="emoji">⏱️</span>
        <span><strong>Duration:</strong> {contest.duration / 60} mins</span>
      </div>

      <div className="contest-buttons">
        <a
          href={contest.url}
          target="_blank"
          rel="noreferrer"
          className="join-btn"
        >
          🏆 Join Contest
        </a>
        <button
          disabled
          className="remind-btn"
        >
          🔔 Remind Me
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
