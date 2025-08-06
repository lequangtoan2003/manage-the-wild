import { useTheme } from '../context/ThemeContext';

export default function Select({ options, value, onChange }) {
  const { theme } = useTheme();

  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-md border px-3 py-[9.3px] text-sm font-medium shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === 'dark'
          ? 'border-grey-700 bg-grey-800 text-grey-100 focus:ring-blue-400'
          : 'border-gray-200 bg-white text-grey-700'
      }`}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          className={
            theme === 'dark'
              ? 'bg-grey-800 text-grey-100'
              : 'bg-white text-grey-700'
          }
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
