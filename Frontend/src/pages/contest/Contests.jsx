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

  const loadContests = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchContests(page, LIMIT);
      console.log("2:", data);
      setContests((prev) => [...prev, ...data.contests]);
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContests();
  }, []);

  useEffect(() => {
    if (inView) {
      loadContests();
    }
  }, [inView]);

  const getFilteredContests = () => {
    let filtered = [...contests];
    const currentTime = Math.floor(Date.now() / 1000);

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
          <FilterContest contests={contests} filters={filters} setFilters={setFilters} />
        </div>
        <div className='contest-wrapper'>
          <div className="contest-grid">
            {filteredContests.map((contest, index) => (
              <ContestCard key={index} contest={contest} />
            ))}
          </div>
          <div ref={ref} style={{ height: '30px', margin: '20px 0' }}>
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contests;
