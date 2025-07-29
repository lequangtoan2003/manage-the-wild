import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from './useCabin';

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <div>Lỗi: {error.message}</div>;
  //filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //sort
  const sortBy = searchParams.get('sort-by') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <div className="rounded-md bg-grey-100 p-4">
      <div className="mb-4 grid grid-cols-[9.6rem_2fr_2fr_1fr_1.4fr_2fr] gap-4 bg-white p-4">
        {/* Tiêu đề */}
        <div className="font-bold text-grey-700"></div>
        <div className="text-left font-bold text-grey-700">Cabin</div>
        <div className="text-left font-bold text-grey-700">Capacity</div>
        <div className="text-left font-bold text-grey-700">Price</div>
        <div className="text-left font-bold text-grey-700">Discount</div>
      </div>
      <div className="rounded-md bg-white">
        {/* Dữ liệu cabins */}
        {sortedCabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}
