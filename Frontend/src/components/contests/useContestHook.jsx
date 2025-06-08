import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchContests } from '../../services/api';

const LIMIT = 9;

export const useContests = (filters) => {
  return useInfiniteQuery({
    queryKey: ['contests', filters.selectedStatus],
    queryFn: ({ pageParam = 1 }) => 
      fetchContests(pageParam, LIMIT, filters.selectedStatus, filters.selectedPlatforms),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};