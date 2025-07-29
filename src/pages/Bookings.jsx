import BookingTable from '../features/bookings/BookingTable';

export default function Bookings() {
  return (
    <div className="flex flex-col gap-4">
      Booking
      <BookingTable />
    </div>
  );
}
