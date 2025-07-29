import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

export default function Bookings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="">Booking</div>
        <div className="">
          <BookingTableOperations />
        </div>
      </div>
      <BookingTable />
    </div>
  );
}
