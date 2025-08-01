import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import BookingDataBox from '../bookings/BookingDataBox';
import useBookingId from '../bookings/useBookingId';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';

export default function CheckinBooking() {
  const { booking, isLoading } = useBookingId();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);
  const navigate = useNavigate();
  function handleCheckIn() {
    if (!confirmPaid) return;
    checkin(bookingId);
  }
  const {
    id: bookingId,
    status,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  if (isLoading) return <Spinner />;
  const rowClass =
    {
      'checked-in': 'bg-green-200 w-40 rounded-full',
      'checked-out': 'bg-red-200 w-40 rounded-full',
      unconfirmed: 'bg-blue-200 w-40 rounded-full',
    }[status] || '';
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
      <BookingDataBox booking={booking} />
      <div className="rounded-lg bg-gray-50 p-4">
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={confirmPaid}
            id="confirm"
            disabled={confirmPaid || isCheckingIn}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
          />
          <div className="flex gap-1 text-base">
            I confirm that{' '}
            <div className="font-semibold"> {guests.fullName} </div> has paid
            the total amount {formatCurrency(totalPrice)}
          </div>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex w-[190px] items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-left text-grey-700 hover:bg-blue-300 ${
            !confirmPaid ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleCheckIn}
          disabled={!confirmPaid || isCheckingIn}
        >
          <div className="text-xs font-semibold">
            Check in booking #{bookingId}
          </div>
        </button>
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
  );
}
