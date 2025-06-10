import { useEffect, useMemo, useState } from 'react';
import ContestCard from '../../components/contests/ContestCard';
import FilterContest from '../../components/contests/FilterContest';
import { useInView } from 'react-intersection-observer';
import './contestList.css';
import { useContests } from '../../components/contests/useContestHook';
import { Loader } from '../../components/Skelton/Loader';
import toast, { Toaster } from 'react-hot-toast';


const Contests = () => {
  const [filters, setFilters] = useState({
    selectedPlatforms: ['LeetCode', 'Codeforces', 'CodeChef'],
    selectedStatus: "All",
  });

  const { ref, inView } = useInView();

  // Use React Query hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useContests(filters);

  // Flatten all pages into a single array
  const allContests = useMemo(() => {
    return data?.pages.flatMap(page => page.contests) || [];
  }, [data]);

  // Handle infinite scrolling-->by using this we are able to fetch the 18 contest at start which is okay
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Loading more contests...");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);


  const getFilteredContests = () => {
    let filtered = [...allContests];
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }} 
      />
      <h1 className="contest-list-title">{filters.selectedStatus} Contests</h1>
      <div className="contest-list-container">
        <div className="contest-sidebar">
          <FilterContest filters={filters} setFilters={setFilters} />
        </div>
        <div className='contest-wrapper'>

          {
            isLoading ? (
              <div className='flex flex-col items-center justify-center h-full'>
                <Loader text='Loading Contests' />
              </div>
              
            ) : isError ? (
              toast.error(error.message)
            ) : (
              <div className="contest-grid">
                {filteredContests.map((contest, index) => (
                  <ContestCard key={`${contest.id || index}`} contest={contest} />
                ))}
              </div>
            )
          }

        
          
          {filteredContests.length === 0 && !isLoading && (
            toast.error("No Contests found for the selected filter!")
          )}

          <div ref={ref} style={{ height: '30px', margin: '20px 0' }}>
            {isFetchingNextPage && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contests;
