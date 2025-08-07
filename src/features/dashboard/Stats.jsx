import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext'; // Thêm để sử dụng theme

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const { theme } = useTheme(); // Lấy theme từ context
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const chekins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  const statColors = {
    bookings: {
      light: { bgColor: 'bg-red-200', textColor: 'text-red-500' },
      dark: { bgColor: 'bg-red-900', textColor: 'text-red-400' },
    },
    sales: {
      light: { bgColor: 'bg-green-100', textColor: 'text-green-600' },
      dark: { bgColor: 'bg-green-900', textColor: 'text-green-400' },
    },
    checkins: {
      light: { bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' },
      dark: { bgColor: 'bg-indigo-900', textColor: 'text-indigo-400' },
    },
    occupancy: {
      light: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
      dark: { bgColor: 'bg-yellow-900', textColor: 'text-yellow-400' },
    },
  };

  return (
    <>
      <Stat
        title="bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        bgColor={statColors.bookings[theme].bgColor}
        textColor={statColors.bookings[theme].textColor}
      />
      <Stat
        title="sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        bgColor={statColors.sales[theme].bgColor}
        textColor={statColors.sales[theme].textColor}
      />
      <Stat
        title="check ins"
        icon={<HiOutlineCalendarDays />}
        value={chekins}
        bgColor={statColors.checkins[theme].bgColor}
        textColor={statColors.checkins[theme].textColor}
      />
      <Stat
        title="occupancy"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
        bgColor={statColors.occupancy[theme].bgColor}
        textColor={statColors.occupancy[theme].textColor}
      />
    </>
  );
}
