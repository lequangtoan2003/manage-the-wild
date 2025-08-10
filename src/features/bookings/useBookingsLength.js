import { useQuery } from '@tanstack/react-query';
import { getAllBookingsLength } from '../../services/apiBookings';

export function useBookingsLength() {
  const {
    data: bookinglength,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookingsLength'],
    queryFn: getAllBookingsLength,
  });

  return { bookinglength, isLoading, error };
}
