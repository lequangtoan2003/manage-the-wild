import Spinner from '../../ui/Spinner';
import { useBookingsLength } from '../bookings/useBookingsLength';
import useCabin from '../cabins/useCabin';
import TodayAcitvity from '../check-in-out/TodayAcitvity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { bookinglength, isLoading4 } = useBookingsLength();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabin();
  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;
  console.log('bookinglength:', bookinglength);
  console.log('booking data', bookings);
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] lg:grid-rows-[auto_34rem-auto]">
      <Stats
        bookinglength={bookinglength}
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayAcitvity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}
