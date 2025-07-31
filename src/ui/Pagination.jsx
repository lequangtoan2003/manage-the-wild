import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className="flex justify-between">
      <div className="">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        <span>of </span>
        <span>{count}</span> results
      </div>
      <div className="flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className={`flex ${currentPage === 1 ? 'cursor-not-allowed' : ''} items-center justify-center`}
        >
          <HiChevronLeft />
          Previous
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className={`flex ${currentPage === pageCount ? 'cursor-not-allowed' : ''} items-center justify-center`}
        >
          Next
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
