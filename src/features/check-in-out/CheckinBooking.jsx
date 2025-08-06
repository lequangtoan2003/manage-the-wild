import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import BookingDataBox from '../bookings/BookingDataBox';
import useBookingId from '../bookings/useBookingId';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/apiSettings';
import { useTheme } from '../../context/ThemeContext'; // Thêm để sử dụng theme

export default function CheckinBooking() {
  const { booking, isLoading } = useBookingId();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { theme } = useTheme(); // Lấy theme từ context

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  const navigate = useNavigate();

  function handleCheckIn() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
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

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  if (isLoading || isLoadingSettings) return <Spinner />;

  const rowClass =
    {
      'checked-in': 'bg-green-200 w-40 rounded-full',
      'checked-out': 'bg-red-200 w-40 rounded-full',
      unconfirmed: 'bg-blue-200 w-40 rounded-full',
    }[status] || '';

  return (
    <div
      className={`flex flex-col gap-4 p-4 ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-grey-50 text-grey-700'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="text-xl font-medium">Booking {bookingId}</div>
          <div
            className={`flex items-center text-center text-xl font-medium uppercase ${
              rowClass
            } ${theme === 'dark' ? 'text-grey-700' : 'text-grey-600'}`}
          >
            {status}
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-grey-700 text-grey-100 hover:bg-grey-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
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
            <span>Back</span>
          </button>
        </div>
      </div>
      <div>
        <BookingDataBox booking={booking} />
      </div>
      {!hasBreakfast && (
        <div
          className={`rounded-lg p-4 ${
            theme === 'dark'
              ? 'bg-grey-800 text-grey-100'
              : 'bg-gray-50 text-grey-700'
          }`}
        >
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={addBreakfast}
              id="breakfast"
              disabled={addBreakfast}
              onChange={() => {
                setAddBreakfast((add) => !add);
                setConfirmPaid(false);
              }}
              className={
                theme === 'dark' ? 'accent-grey-200' : 'accent-blue-500'
              }
            />
            <div className="flex gap-1 text-base">
              Want to add breakfast for{' '}
              <div className="font-semibold">
                {formatCurrency(optionalBreakfastPrice)}?
              </div>
            </div>
          </label>
        </div>
      )}
      <div
        className={`rounded-lg p-4 ${
          theme === 'dark'
            ? 'bg-grey-800 text-grey-100'
            : 'bg-gray-50 text-grey-700'
        }`}
      >
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={confirmPaid}
            id="confirm"
            disabled={confirmPaid || isCheckingIn}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            className={theme === 'dark' ? 'accent-grey-200' : 'accent-blue-500'}
          />
          <div className="flex gap-1 text-base">
            I confirm that{' '}
            <div className="font-semibold">{guests.fullName}</div> has paid the
            total amount of{' '}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </div>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={`flex w-[190px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-left text-xs font-semibold transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-blue-700 text-grey-100 hover:bg-blue-600'
              : 'bg-blue-500 text-grey-700 hover:bg-blue-300'
          } ${!confirmPaid ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleCheckIn}
          disabled={!confirmPaid || isCheckingIn}
        >
          <div>Check in booking #{bookingId}</div>
        </button>
        <button
          onClick={() => navigate(-1)}
          className={`flex items-end justify-end gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-grey-700 text-grey-100 hover:bg-grey-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
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
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
