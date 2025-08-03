import Spinner from '../../ui/Spinner';
import useBooking from './useBooking';
import BookingRow from './BookingRow';
import Pagination from '../../ui/Pagination';
import { useState } from 'react';

export default function BookingTable() {
  const { isLoading, bookings, count } = useBooking();
  const [activeBookingId, setActiveBookingId] = useState(null);

  if (isLoading) return <Spinner />;
  return (
    <div className="rounded-md bg-grey-100 p-4">
      <div className="mb-4 grid grid-cols-[0.6fr_2fr_2.4fr_1fr_1fr_3.3rem] gap-4 bg-white p-4">
        <div className="text-left font-bold text-grey-700">Cabin</div>
        <div className="text-left font-bold text-grey-700">Guest</div>
        <div className="text-left font-bold text-grey-700">Date</div>
        <div className="text-left font-bold text-grey-700">Status</div>
        <div className="text-left font-bold text-grey-700">Amount</div>
      </div>
      <div className="rounded-md bg-white">
        {bookings.map((booking) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            isActive={booking.id === activeBookingId}
            setActiveBookingId={setActiveBookingId}
          />
        ))}
      </div>
      <div className="pt-2">
        <Pagination count={count} />
      </div>
    </div>
  );
}
