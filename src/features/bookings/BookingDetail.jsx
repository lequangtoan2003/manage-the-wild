import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import useBookingId from './useBookingId';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import Model from '../../ui/Model';
import { useState } from 'react';
import useDeleteBooking from './useDeteleBooking';
import { useTheme } from '../../context/ThemeContext';

export default function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBookingId();
  const { checkout, isCheckingOut } = useCheckout();
  const [showConfirm, setShowConfirm] = useState(false);
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { theme } = useTheme();

  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const handleConfirmDelete = () => {
    deleteBooking(bookingId, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

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
      <div className="flex gap-2">
        {status === 'unconfirmed' && (
          <button
            type="button"
            className={`flex w-[140px] items-center gap-2 rounded-lg px-4 py-2 text-left text-xs font-semibold transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-blue-700 text-grey-100 hover:bg-blue-600'
                : 'bg-blue-500 text-grey-700 hover:bg-blue-300'
            }`}
            onClick={handleCheckInClick}
          >
            <HiArrowDownOnSquare
              className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}
            />
            <div>Check in</div>
          </button>
        )}
        {status === 'checked-in' && (
          <button
            type="button"
            className={`flex w-[140px] items-center gap-2 rounded-lg px-4 py-2 text-left text-xs transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-blue-700 text-grey-100 hover:bg-blue-600'
                : 'bg-blue-500 text-grey-700 hover:bg-blue-300'
            }`}
            onClick={handleCheckOutClick}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare
              className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}
            />
            <div>Check out</div>
          </button>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting}
          className={`flex w-[140px] items-center gap-2 rounded-lg px-4 py-2 text-left text-xs transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-red-700 text-grey-100 hover:bg-red-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <HiTrash
            className={theme === 'dark' ? 'text-grey-200' : 'text-white'}
          />
          <div>Delete</div>
        </button>
        <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
          <div
            className={`rounded-lg p-6 shadow-lg ${
              theme === 'dark'
                ? 'bg-grey-800 text-grey-100'
                : 'bg-white text-grey-700'
            }`}
          >
            <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete booking?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-grey-700 text-grey-100 hover:bg-grey-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-red-700 text-grey-100 hover:bg-red-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </Model>
        <div className="max-w-[4rem]">
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
    </div>
  );
}
