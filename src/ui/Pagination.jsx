import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';
import { useTheme } from '../context/ThemeContext';

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div
      className={`flex items-center justify-between p-2 ${
        theme === 'dark'
          ? 'bg-grey-800 text-grey-100'
          : 'bg-white text-grey-700'
      }`}
    >
      <div className="text-sm">
        Showing{' '}
        <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span>{' '}
        to{' '}
        <span className="font-medium">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span className="font-medium">{count}</span> results
      </div>
      <div className="flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className={`flex items-center gap-1 rounded px-3 py-1 ${
            currentPage === 1
              ? 'cursor-not-allowed text-grey-400 dark:text-grey-500'
              : 'hover:bg-grey-100 dark:hover:bg-grey-700'
          }`}
        >
          <HiChevronLeft className="h-5 w-5" />
          Previous
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className={`flex items-center gap-1 rounded px-3 py-1 ${
            currentPage === pageCount
              ? 'cursor-not-allowed text-grey-400 dark:text-grey-500'
              : 'hover:bg-grey-100 dark:hover:bg-grey-700'
          }`}
        >
          Next
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
