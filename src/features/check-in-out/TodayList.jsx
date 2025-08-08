import { Link } from 'react-router-dom';
import { useCheckout } from './useCheckout';

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <li className="grid items-center gap-4 border-b border-gray-200 p-4 py-3 text-base first:border-t first:border-t-gray-200 md:grid-cols-[4rem_1rem_5rem_4rem_6rem] lg:grid-cols-[5rem_1rem_1fr_5rem_6rem] dark:border-gray-700 dark:first:border-t-gray-700">
      {status === 'unconfirmed' && (
        <div className="inline-flex items-center justify-center rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
          Arriving
        </div>
      )}
      {status === 'checked-in' && (
        <div className="inline-flex items-center justify-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
          Departing
        </div>
      )}

      <img
        src={guests.countryFlag}
        alt={`Flag of ${guests.country}`}
        className="h-5 w-5 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
      />
      <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
        {guests.fullName}
      </div>
      <div className="text-gray-700 dark:text-gray-300">{numNights} nights</div>

      {status === 'unconfirmed' && (
        <button
          className="rounded-md bg-blue-600 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 md:py-0.5 md:text-xs md:font-thin"
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
