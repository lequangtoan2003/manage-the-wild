import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import useBookingId from './useBookingId';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';

export default function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBookingId();
  const { checkout, isCheckingOut } = useCheckout();
  if (isLoading) return <Spinner />;
  const { id: bookingId, status } = booking;
  const handleCheckOutClick = () => {
    checkout(bookingId);
  };
  const rowClass =
    {
      'checked-in': 'bg-green-200 w-40 rounded-full',
      'checked-out': 'bg-red-200 w-40 rounded-full',
      unconfirmed: 'bg-blue-200 w-40 rounded-full',
    }[status] || '';
  const handleCheckInClick = () => {
    navigate(`/checkin/${bookingId}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="">Booking {bookingId}</div>
          <div
            className={`items-center text-center text-xl font-medium uppercase text-grey-600 ${rowClass}`}
          >
            {status}
          </div>
        </div>
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>
      <div className="">
        <BookingDataBox booking={booking} />
      </div>
      <div className="flex gap-2">
        {status === 'unconfirmed' && (
          <button
            type="button"
            className="flex w-[140px] items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-left text-grey-700 hover:bg-blue-300"
            onClick={handleCheckInClick}
          >
            <HiArrowDownOnSquare className="h-5 w-5" />
            <div className="text-xs font-semibold">Check in</div>
          </button>
        )}
        {status === 'checked-in' && (
          <button
            type="button"
            className="flex w-[140px] items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-left text-grey-700 hover:bg-blue-300"
            onClick={handleCheckOutClick}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare className="h-5 w-5" />
            <div className="text-xs">Check out</div>
          </button>
        )}
        <div className="max-w-[4rem]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-end justify-end gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
