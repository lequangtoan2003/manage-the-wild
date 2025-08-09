import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

function SalesChart({ bookings, numDays }) {
  const { theme } = useTheme();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors =
    theme === 'dark'
      ? {
          totalSales: { stroke: '#4f46e5', fill: 'rgba(79, 70, 229, 0.6)' },
          extrasSales: { stroke: '#22c55e', fill: 'rgba(34, 197, 94, 0.6)' },
          text: '#e5e7eb',
          background: '#18212f',
        }
      : {
          totalSales: { stroke: '#4f46e5', fill: 'rgba(199, 210, 254, 0.6)' },
          extrasSales: { stroke: '#16a34a', fill: 'rgba(220, 252, 231, 0.6)' },
          text: '#374151',
          background: '#fff',
        };

  const formatCurrency = (value) => `$${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-300 bg-gray-100 p-2 text-sm shadow-lg md:p-3 md:text-base dark:border-gray-700 dark:bg-gray-800">
          <p className="font-bold">{`Day: ${label}`}</p>
          <p className="text-indigo-600 dark:text-indigo-400">
            {`Total Sales: ${formatCurrency(payload[0].value)}`}
          </p>
          <p className="text-green-600 dark:text-green-400">
            {`Extras Sales: ${formatCurrency(payload[1].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md sm:col-span-4 sm:p-6 md:col-span-2 md:p-8 lg:col-span-full dark:bg-gray-900">
      <div className="mb-4 text-base font-semibold text-gray-900 sm:text-lg md:text-xl dark:text-gray-100">
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </div>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: '12px', dy: 5 }}
            tickLine={{ stroke: colors.text }}
            interval="preserveStartEnd"
            className="text-xs sm:text-sm md:text-base"
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fill: colors.text, fontSize: '12px' }}
            tickLine={{ stroke: colors.text }}
            domain={[0, 'auto']}
            padding={{ top: 10 }}
            className="text-xs sm:text-sm md:text-base"
          />
          <CartesianGrid strokeDasharray="4" className="stroke-gray-300" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
            content={<CustomTooltip />}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
