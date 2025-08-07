import Spinner from '../../ui/Spinner';
import useCabin from '../cabins/useCabin';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    stays,
    isLoading: isLoading2,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabin();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  console.log('booking data', bookings);
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem-auto]">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div className="">Today activity</div>
      <div className="">Chart stay duration</div>
      <div className="">Chart sales</div>
    </div>
  );
}
