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

export default function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBookingId();
  const { checkout, isCheckingOut } = useCheckout();
  const [showConfirm, setShowConfirm] = useState(false); // State cho modal xác nhận
  const { isDeleting, deleteBooking } = useDeleteBooking();
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
        <button
          onClick={() => setShowConfirm(true)} // Mở modal xác nhận khi nhấp Delete
          disabled={isDeleting}
          className="flex w-[140px] items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-left text-grey-700 hover:bg-blue-300"
        >
          <HiTrash className="h-5 w-5" />
          <div className="text-xs">Delete</div>
        </button>
        <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete booking?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </Model>
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
