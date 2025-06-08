import { useQuery } from '@tanstack/react-query';
import { fetchHackathons } from '../../services/api';

export const useHackathons = () => {
  return useQuery({
    queryKey: ['hackathons'],
    queryFn: async () => {
      const response = await fetchHackathons();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};