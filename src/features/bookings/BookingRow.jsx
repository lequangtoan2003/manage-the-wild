import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
export default function CabinRow({
  booking: {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  // Xác định className dựa trên trạng thái
  const rowClass =
    status === 'checked-in'
      ? 'bg-green-200 w-40 rounded-full'
      : status === 'unconfirmed'
        ? 'bg-blue-200 w-40 rounded-full'
        : '';
  return (
    <>
      <div className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_0.6fr] items-center gap-4 border-b border-grey-200 py-2">
        <div className="text-center text-xl font-semibold text-grey-600">
          {cabinName}
        </div>
        <div className="items-left flex flex-col">
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
          className={`text-center text-xl font-medium text-grey-600 ${rowClass}`}
        >
          {status}
        </div>
        <div className="text-center text-xl font-semibold text-grey-600">
          ${totalPrice}.00
        </div>
      </div>
    </>
  );
}
