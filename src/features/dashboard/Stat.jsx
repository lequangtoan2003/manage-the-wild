import { useTheme } from '../../context/ThemeContext'; // Thêm để sử dụng theme

export default function Stat({ icon, title, value, bgColor, textColor }) {
  const { theme } = useTheme(); // Lấy theme từ context

  return (
    <div
      className={`m-4 grid grid-rows-[auto_auto] rounded-md border py-4 sm:grid-cols-[1rem_1fr] sm:pr-20 md:grid-cols-[3.5rem_1fr] lg:grid-cols-[6.4rem_1fr] lg:pr-1 ${
        theme === 'dark'
          ? 'border-grey-700 bg-grey-800 text-grey-100'
          : 'border-gray-100 bg-grey-0 text-grey-700'
      }`}
    >
      <div
        className={`col-span-1 row-span-2 ${bgColor} ${textColor} m-auto flex items-center justify-center rounded-full md:h-6 md:w-6 lg:h-12 lg:w-12`}
      >
        <svg
          className={`rounded-full sm:h-12 sm:w-12 md:h-6 md:w-6 lg:h-12 lg:w-12 ${bgColor}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <g transform="translate(6 6) scale(0.5)">{icon}</g>
        </svg>
      </div>
      <div
        className={`col-start-2 row-start-1 pr-1 text-xs font-medium uppercase sm:hidden sm:pr-2 md:block lg:col-start-2 lg:row-start-1 lg:pr-2 lg:text-xs ${
          theme === 'dark' ? 'text-grey-200' : 'text-grey-700'
        }`}
      >
        {title}
      </div>
      <div
        className={`col-start-2 row-start-2 pr-4 text-xs font-semibold lg:text-lg ${
          theme === 'dark' ? 'text-grey-100' : 'text-grey-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
