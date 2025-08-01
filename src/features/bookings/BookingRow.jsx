import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
} from 'react-icons/hi2';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';

export default function CabinRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
  isActive,
  setActiveBookingId,
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const rowClass =
    {
      'checked-in': 'bg-green-200 w-40 rounded-full',
      'checked-out': 'bg-red-200 w-40 rounded-full',
      unconfirmed: 'bg-blue-200 w-40 rounded-full',
    }[status] || '';

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  function handleClick(e) {
    e.stopPropagation();
    setActiveBookingId(isActive ? null : bookingId);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setActiveBookingId(null);
      }
    }

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, setActiveBookingId]);

  const handleSeeDetailsClick = () => {
    setActiveBookingId(null); // Đóng dropdown
    navigate(`/bookings/${bookingId}`);
  };
  const handleCheckInClick = () => {
    setActiveBookingId(null); // Đóng dropdown
    navigate(`/checkin/${bookingId}`);
  };
  const handleCheckOutClick = () => {
    setActiveBookingId(null); // Đóng dropdown
    checkout(bookingId);
  };
  return (
    <div className="relative grid grid-cols-[0.6fr_2.3fr_2.8fr_1fr_1fr_0.6fr] items-center gap-4 border-b border-grey-200 py-2">
      <div className="text-center text-xl font-semibold text-grey-600">
        {cabinName}
      </div>
      <div className="flex flex-col">
        <div className="text-left text-xl font-semibold text-grey-700">
          {guestName}
        </div>
        <div className="text-left text-base text-grey-600">{email}</div>
      </div>
      <div className="flex flex-col text-left text-grey-600">
        <span className="text-lg font-semibold text-grey-700">
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span className="text-base text-grey-500">
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </div>
      <div
        className={`text-center text-xl font-medium uppercase text-grey-600 ${rowClass}`}
      >
        {status}
      </div>
      <div className="text-left text-xl font-semibold text-grey-600">
        ${totalPrice}.00
      </div>
      <div className="relative">
        <button
          type="button"
          ref={buttonRef}
          className="rounded-full p-2 hover:bg-grey-100"
          onClick={handleClick}
        >
          <HiEllipsisVertical className="h-6 w-6" />
        </button>
        {isActive && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-10 mt-2 rounded-md border border-grey-200 bg-white shadow-lg"
          >
            <button
              type="button"
              className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100"
              onClick={handleSeeDetailsClick}
            >
              <HiEye className="h-5 w-5" />
              <div className="text-xs">See details</div>
            </button>

            {status === 'unconfirmed' && (
              <button
                type="button"
                className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100"
                onClick={handleCheckInClick}
              >
                <HiArrowDownOnSquare className="h-5 w-5" />
                <div className="text-xs">Check in</div>
              </button>
            )}
            {status === 'checked-in' && (
              <button
                type="button"
                className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100"
                onClick={handleCheckOutClick}
                disabled={isCheckingOut}
              >
                <HiArrowUpOnSquare className="h-5 w-5" />
                <div className="text-xs">Check out</div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
