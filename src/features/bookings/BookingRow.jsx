import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeteleBooking';
import Model from '../../ui/Model';
import { useTheme } from '../../context/ThemeContext';

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
  const [showConfirm, setShowConfirm] = useState(false); // State cho modal xác nhận
  const { theme } = useTheme();
  const { isDeleting, deleteBooking } = useDeleteBooking();
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

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    deleteBooking(bookingId);
    setShowConfirm(false); // Đóng modal sau khi xóa
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        !showConfirm // Chỉ đóng dropdown nếu modal không hiển thị
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
  }, [isActive, setActiveBookingId, showConfirm]);
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
    <div
      className={`relative grid grid-cols-[0.6fr_2.3fr_2.8fr_1fr_1fr_0.6fr] items-center gap-4 border-b border-grey-200 py-2 dark:border-grey-700 ${
        theme === 'dark' ? 'bg-grey-800' : 'bg-white'
      }`}
    >
      <div className="text-center text-xl font-semibold text-grey-600 dark:text-grey-100">
        {cabinName}
      </div>
      <div className="flex flex-col">
        <div className="text-left text-xl font-semibold text-grey-700 dark:text-grey-100">
          {guestName}
        </div>
        <div className="text-left text-base text-grey-600 dark:text-grey-300">
          {email}
        </div>
      </div>
      <div className="flex flex-col text-left text-grey-600 dark:text-grey-300">
        <span className="text-lg font-semibold text-grey-700 dark:text-grey-100">
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span className="text-base text-grey-500 dark:text-grey-400">
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </div>
      <div
        className={`text-left text-xl font-medium uppercase text-grey-600 ${rowClass}`}
      >
        {status}
      </div>
      <div className="text-left text-xl font-semibold text-grey-600 dark:text-grey-100">
        ${totalPrice}.00
      </div>
      <div className="relative">
        <button
          type="button"
          ref={buttonRef}
          className="rounded-full p-2 hover:bg-grey-100 dark:hover:bg-grey-700"
          onClick={handleClick}
        >
          <HiEllipsisVertical className="h-6 w-6 text-grey-600 dark:text-grey-300" />
        </button>
        {isActive && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-10 mt-2 rounded-md border border-grey-200 bg-white shadow-lg dark:border-grey-700 dark:bg-grey-800"
          >
            <button
              type="button"
              className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100 dark:text-grey-100 dark:hover:bg-grey-700"
              onClick={handleSeeDetailsClick}
            >
              <HiEye className="h-5 w-5 text-grey-600 dark:text-grey-300" />
              <div className="text-xs">See details</div>
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting}
              className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100 dark:text-grey-100 dark:hover:bg-grey-700"
            >
              <HiTrash className="h-5 w-5 text-grey-600 dark:text-grey-300" />
              <div className="text-xs">Delete</div>
            </button>
            <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
              <div
                className={`rounded-lg p-6 shadow-lg ${
                  theme === 'dark'
                    ? 'bg-grey-900 text-grey-100'
                    : 'bg-white text-grey-700'
                }`}
              >
                <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
                <p>Are you sure you want to delete booking?</p>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className={`rounded-lg px-4 py-2 ${
                      theme === 'dark'
                        ? 'bg-grey-700 hover:bg-grey-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className={`rounded-lg px-4 py-2 ${
                      theme === 'dark'
                        ? 'bg-red-700 hover:bg-red-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Model>
            {status === 'unconfirmed' && (
              <button
                type="button"
                className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100 dark:text-grey-100 dark:hover:bg-grey-700"
                onClick={handleCheckInClick}
              >
                <HiArrowDownOnSquare className="h-5 w-5 text-grey-600 dark:text-grey-300" />
                <div className="text-xs">Check in</div>
              </button>
            )}
            {status === 'checked-in' && (
              <button
                type="button"
                className="flex w-[140px] items-center gap-2 px-4 py-2 text-left text-grey-700 hover:bg-grey-100 dark:text-grey-100 dark:hover:bg-grey-700"
                onClick={handleCheckOutClick}
                disabled={isCheckingOut}
              >
                <HiArrowUpOnSquare className="h-5 w-5 text-grey-600 dark:text-grey-300" />
                <div className="text-xs">Check out</div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
