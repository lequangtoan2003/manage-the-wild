import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const chekins = confirmedStays.length;
  const ocupantion =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        bgColor="bg-red-200"
        textColor="text-red-500"
      />
      <Stat
        title="sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <Stat
        title="check ins"
        icon={<HiOutlineCalendarDays />}
        value={chekins}
        bgColor="bg-indigo-100"
        textColor="text-indigo-600"
      />
      <Stat
        title="ocupancy"
        icon={<HiOutlineChartBar />}
        value={Math.round(ocupantion * 100) + '%'}
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />
    </>
  );
}
