import { Link } from 'react-router-dom';
import { useCheckout } from './useCheckout';
import { useTheme } from '../../context/ThemeContext'; // Thêm import useTheme

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { checkout, isCheckingOut } = useCheckout();
  const { theme } = useTheme(); // Lấy theme từ context

  return (
    <li
      className={`grid items-center gap-4 border-b p-4 py-3 text-base first:border-t md:grid-cols-[4rem_1rem_5rem_4rem_6rem] lg:grid-cols-[5rem_1rem_1fr_5rem_6rem] ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800 text-gray-100 first:border-t-gray-700'
          : 'border-gray-200 bg-white text-gray-900 first:border-t-gray-200'
      }`}
    >
      {status === 'unconfirmed' && (
        <div
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ${
            theme === 'dark' ? 'bg-green-600' : 'bg-green-500'
          }`}
        >
          Arriving
        </div>
      )}
      {status === 'checked-in' && (
        <div
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
          }`}
        >
          Departing
        </div>
      )}

      <img
        src={guests.countryFlag}
        alt={`Flag of ${guests.country}`}
        className="h-5 w-5 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
      />
      <div
        className={`text-xs font-medium ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {guests.fullName}
      </div>
      <div
        className={`text-gray-700 ${
          theme === 'dark' ? 'text-grey-0' : 'text-gray-700'
        }`}
      >
        {numNights} nights
      </div>

      {status === 'unconfirmed' && (
        <button
          className={`rounded-md bg-blue-600 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 md:py-0.5 md:text-xs md:font-thin ${
            theme === 'dark' ? 'bg-blue-700 hover:bg-blue-800' : ''
          }`}
          to={`/checkin/${id}`}
        >
          <Link to={`/checkin/${id}`}>Check in</Link>
        </button>
      )}
      {status === 'checked-in' && (
        <button
          className={`rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:py-0.5 md:text-xs md:font-thin ${
            isCheckingOut
              ? 'cursor-not-allowed bg-gray-400'
              : theme === 'dark'
                ? 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
          onClick={() => checkout(id)}
          disabled={isCheckingOut}
        >
          Check out
        </button>
      )}
    </li>
  );
}

export default TodayItem;
