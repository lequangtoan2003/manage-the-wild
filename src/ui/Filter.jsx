import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  return (
    <div
      className={`flex gap-2 rounded-lg border p-1 shadow-sm ${
        theme === 'dark'
          ? 'border-grey-700 bg-grey-800'
          : 'border-gray-200 bg-white'
      }`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
            option.value === currentFilter
              ? theme === 'dark'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-600 text-white'
              : theme === 'dark'
                ? 'bg-grey-700 text-grey-100 hover:bg-blue-700 hover:text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
          }`}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
