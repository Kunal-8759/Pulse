import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, fromUnixTime } from "date-fns";
import "./HeatMap.css";

const Heatmap = ({ data, isUnix , platform , streaks}) => {
  const values = Object.keys(data).map((key) => ({
    date: isUnix ? format(fromUnixTime(Number(key)), "yyyy-MM-dd") : key,
    count: data[key],
  }));

  console.log("streaks", streaks);
  return (
    <div className="heatmap-card">
      <h2 className="heatmap-title">{ platform=="leetcode" ? "LeetCode Activity" : "GitHub Contributions"}</h2>
      <p className="heatmap-description">{ platform=="leetcode" ? "Your coding progress on LeetCode" : "Your GitHub activity" }</p>
      <CalendarHeatmap
      startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
      endDate={new Date()}
      values={values}
      classForValue={(value) => {
        if (!value) return `color-scale-0-${platform}`;
        else if(value.count > 3){
          return `color-scale-more-${platform}`;
        }
        else{
          return `color-scale-${value.count}-${platform}`;
        }
      }}
      tooltipDataAttrs={(value) =>
        value.date ? { "data-tip": `${value.date}: ${value.count} contributions` } : null
      }
    />

    <div className="heatmap-legend">
      <div className="streak-info">
        <div>
          🔥Current: {streaks?.currentStreak ?? 0} days
        </div>
        <div>
          🏆Max: {streaks?.maxStreak ?? 0} days
        </div>
      </div>

      <div className="more-less-container">
        <span className="text">Less</span>
        <div className={`circle color0-${platform}`}></div>
        <div className={`circle color1-${platform}`}></div>
        <div className={`circle color2-${platform}`}></div>
        <div className={`circle color3-${platform}`}></div>
        <div className={`circle color4-${platform}`}></div>
        <span className="text">More</span>
      </div>
    </div>

    </div>
  );
};

export default Heatmap;
