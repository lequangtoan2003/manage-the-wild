import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

export default function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-md ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-grey-100 text-grey-700'
      }`}
    >
      <div
        className={`flex justify-between rounded-t-md p-4 text-base ${
          theme === 'dark'
            ? 'bg-blue-900 text-grey-100'
            : 'bg-blue-500 text-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <HiOutlineHomeModern
            className={theme === 'dark' ? 'text-grey-200' : 'text-gray-50'}
          />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </div>
      <div
        className={`space-y-4 p-4 text-base ${
          theme === 'dark' ? 'text-grey-100' : 'text-grey-700'
        }`}
      >
        <div className="flex items-center gap-2">
          {countryFlag && (
            <img
              className="max-w-[2rem]"
              src={countryFlag}
              alt={`Flag of ${country}`}
            />
          )}
          <p className="text-base font-medium">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p className={theme === 'dark' ? 'text-grey-300' : 'text-gray-500'}>
            {email}
          </p>
          <span>&bull;</span>
          <p className={theme === 'dark' ? 'text-grey-300' : 'text-gray-500'}>
            National ID {nationalID}
          </p>
        </div>
        {observations && (
          <div className="flex items-center gap-2">
            <HiOutlineChatBubbleBottomCenterText
              className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}
            />
            Observations {observations}
          </div>
        )}
        <div className="flex items-center gap-2">
          <HiOutlineCheckCircle
            className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}
          />
          <div className="font-bold">Breakfast included?</div>{' '}
          {hasBreakfast ? 'Yes' : 'No'}
        </div>
        <div
          className={`flex items-center justify-between rounded-md px-2 py-4 ${
            isPaid
              ? theme === 'dark'
                ? 'bg-green-900 text-green-200'
                : 'bg-green-100 text-green-700'
              : theme === 'dark'
                ? 'bg-yellow-900 text-yellow-200'
                : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <HiOutlineCurrencyDollar
              className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}
            />
            <div className="font-semibold">Total price</div>{' '}
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </div>
          <div className="px-6 font-semibold uppercase">
            {isPaid ? 'Paid' : 'Will pay at property'}
          </div>
        </div>
        <div
          className={`pt-2 text-right text-sm ${
            theme === 'dark' ? 'text-grey-300' : 'text-grey-500'
          }`}
        >
          <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
        </div>
      </div>
    </div>
  );
}
