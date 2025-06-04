import { useEffect, useState } from 'react';
import { fetchContests } from '../../services/api';
import ContestCard from '../../components/contests/ContestCard';
import FilterContest from '../../components/contests/FilterContest';
import { useInView } from 'react-intersection-observer';
import './ContestList.css'; 

const LIMIT = 9;

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    selectedPlatforms: ['LeetCode', 'Codeforces', 'CodeChef'],
    selectedStatus: "All",
  });

  const { ref, inView } = useInView();

  const loadContests = async (pageNum = page , resetContests = false , status= "All" , platforms = ['LeetCode', 'Codeforces', 'CodeChef']) => {
    if (loading || (!hasMore && !resetContests)) return;

    setLoading(true);
    try {
      const data = await fetchContests(pageNum, LIMIT, status, platforms);
      if(resetContests){
        setContests(data.contests);
      }else{
        setContests((prev) => [...prev, ...data.contests]);
      }
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initail load");
    loadContests(1,true,filters.selectedStatus,filters.selectedPlatforms);
  }, []);

  useEffect(() => {
    if(inView && !loading && hasMore) {
      console.log("Loading more contests, page:", page + 1);
      const nextPage = page + 1;
      setPage(nextPage);
      loadContests(nextPage, false , filters.selectedStatus , filters.selectedPlatforms);
    }
  }, [inView]);

  // Handle filter changes
  useEffect(() => {
    console.log("Filters changed, resetting data");
    setPage(1);
    setHasMore(true);
    loadContests(1, true,filters.selectedStatus,filters.selectedPlatforms);
  }, [filters.selectedStatus]);
  

  const getFilteredContests = () => {
    let filtered = [...contests];
    const currentTime = Math.floor(Date.now() / 1000);//gives in seconds

    if (filters.selectedPlatforms.length > 0) {
      filtered = filtered.filter((c) => filters.selectedPlatforms.includes(c.platform));
    }

    if (filters.selectedStatus !== "All") {
      if (filters.selectedStatus === "Upcoming") {
        filtered = filtered.filter((c) => c.startTime > currentTime);
      } else if (filters.selectedStatus === "Ongoing") {
        filtered = filtered.filter((c) => c.startTime <= currentTime && c.startTime + c.duration > currentTime);
      } else if (filters.selectedStatus === "Past") {
        filtered = filtered.filter((c) => c.startTime + c.duration <= currentTime);
      }
    }

    return filtered;
  };

  const filteredContests = getFilteredContests();

  return (
    <>
      <h1 className="contest-list-title">{filters.selectedStatus} Contests</h1>
      <div className="contest-list-container">
        <div className="contest-sidebar">
          <FilterContest filters={filters} setFilters={setFilters} page={page} setPage={setPage} />
        </div>
        <div className='contest-wrapper'>

          <div className="contest-grid">
            {filteredContests.map((contest, index) => (
              <ContestCard key={`${contest.id || index}-${page}`} contest={contest} />
            ))}
          </div>

          {filteredContests.length === 0 && !loading && (
            <div className="no-contests">
              <p>No contests found for the selected filters.</p>
            </div>
          )}

          <div ref={ref} style={{ height: '30px', margin: '20px 0' }}>
            {loading && <p>Please wait Contests is Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contests;
