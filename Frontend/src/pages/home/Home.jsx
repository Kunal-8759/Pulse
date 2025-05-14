import './Home.css';

import HeatMaps from "./HeatMaps";
import LeetCodeCard from "./LeetcodeCard";
import RecentActivityCard from './RecentActivityCard';

function Home() {
  return (
    <>
      <div className="home-heatmap">
        <HeatMaps />
      </div>
      <div className="home-cards">
        <LeetCodeCard  />
        <RecentActivityCard/>
      </div>
      <div className='home-footer'>
        <div className='home-footer-content'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" color="var(--primary)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award h-5 w-5 text-primary"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
          <p>Keep grinding!</p>
        </div>
        <div>
          <p>Made with ❤️ by <a target='_blank' href="https://www.linkedin.com/in/kunal-kumar-78094a258/">Kunal Kumar</a></p>
        </div>
     </div>
    </>
  );
}
export default Home;