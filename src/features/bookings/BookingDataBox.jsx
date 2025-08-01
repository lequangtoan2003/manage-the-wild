import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';

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

  return (
    <div className="rounded-md bg-grey-100">
      <div className="flex justify-between rounded-t-md bg-blue-500 p-4 text-base text-gray-50">
        <div className="flex items-center gap-2">
          <HiOutlineHomeModern />
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
      <div className="space-y-4 p-4 text-base">
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
          <p className="text-base text-gray-500">{email}</p>
          <span>&bull;</span>
          <p className="text-base text-gray-500">National ID {nationalID}</p>
        </div>
        {observations && (
          <div className="flex items-center">
            <HiOutlineChatBubbleBottomCenterText /> Observations {observations}
          </div>
        )}
        <div className="flex items-center gap-2">
          <HiOutlineCheckCircle />
          <div className="font-bold">Breakfast included?</div>{' '}
          {hasBreakfast ? 'Yes' : 'No'}
        </div>
        <div
          className={`flex items-center justify-between rounded-md px-2 py-4 ${
            isPaid
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <HiOutlineCurrencyDollar />{' '}
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
        <div className="pt-2 text-right text-sm">
          <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
        </div>
      </div>
    </div>
  );
}
