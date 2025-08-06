import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from './useCabin';
import { useTheme } from '../../context/ThemeContext';

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabin();
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className={theme === 'dark' ? 'text-grey-300' : 'text-gray-700'}>
        Lỗi: {error.message}
      </div>
    );

  // Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Sort
  const sortBy = searchParams.get('sort-by') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <div
      className={`rounded-md p-4 ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-grey-100 text-grey-700'
      }`}
    >
      <div
        className={`mb-4 grid grid-cols-[9.6rem_2fr_2fr_1fr_1.4fr_2fr] gap-4 p-4 ${
          theme === 'dark'
            ? 'bg-grey-800 text-grey-100'
            : 'bg-white text-grey-700'
        }`}
      >
        <div className="font-bold"></div>
        <div className="text-left font-bold">Cabin</div>
        <div className="text-left font-bold">Capacity</div>
        <div className="text-left font-bold">Price</div>
        <div className="text-left font-bold">Discount</div>
      </div>
      <div
        className={`rounded-md ${
          theme === 'dark' ? 'bg-grey-800' : 'bg-white'
        }`}
      >
        {/* Dữ liệu cabins */}
        {sortedCabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}
