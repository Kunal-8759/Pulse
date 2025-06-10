import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, fromUnixTime } from "date-fns";
import "./HeatMap.css";
// import HeatMapSkeleton from "../Skelton/HeatMapSkelton";
// import { Skeleton } from "../Skelton/Skelton";
import CustomSkelton from "../Skelton/CustomSkelton";

const Heatmap = ({ data, isUnix, platform, streaks, error, isLoading }) => {
  const values = Object.keys(data).map((key) => ({
    date: isUnix ? format(fromUnixTime(Number(key)), "yyyy-MM-dd") : key,
    count: data[key],
  }));

  return (
    <div className="heatmap-card">
      <h2 className="heatmap-title">{platform == "leetcode" ? "LeetCode Activity" : "GitHub Contributions"}</h2>
      <p className="heatmap-description">{platform == "leetcode" ? "Your coding progress on LeetCode" : "Your GitHub activity"}</p>
      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px", fontSize: "1rem" }}>
          {error}
        </p>
      )}
      {isLoading ?
        <CustomSkelton className="!w-full !h-32 "/>
        :
        (<>
          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={values}
            classForValue={(value) => {
              if (!value) return `color-scale-0-${platform}`;
              else if (value.count > 3) {
                return `color-scale-more-${platform}`;
              }
              else {
                return `color-scale-${value.count}-${platform}`;
              }
            }}
            tooltipDataAttrs={(value) =>
              value.date ? { "data-tip": `${value.date}: ${value.count} contributions` } : null
            }
            titleForValue={(value) => value ? `${value.count} Contribution on ${value.date}` : `0 Contribution`}
          />

          <div className="heatmap-legend">
            <div className="streak-info">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame h-4 w-4 text-orange-500 mr-1" style={{ color: "rgb(249 115 22)" }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                Current: {streaks?.currentStreak ?? 0} days
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy h-4 w-4 text-yellow-500 mr-1" style={{ color: "rgb(234 179 8)" }}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                Max: {streaks?.maxStreak ?? 0} days
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
        </>)
      }

    </div>
  );
};

export default Heatmap;
