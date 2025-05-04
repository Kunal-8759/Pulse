import './Home.css';

import HeatMap from "./HeatMap";
import LeetCodeCard from "./LeetcodeCard";
import RecentActivityCard from './RecentActivityCard';

function Home() {
  return (
    <>
      <div className="home-heatmap">
        <HeatMap />
      </div>
      <div className="home-cards">
        <LeetCodeCard  />
        <RecentActivityCard/>
      
      </div>
    </>
  );
}
export default Home;