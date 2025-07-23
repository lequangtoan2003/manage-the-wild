import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';

export default function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="bg-grey-100 rounded-md p-4">
      <div className="mb-4 grid grid-cols-[9.6rem_2fr_2fr_1fr_1fr_2fr] gap-4 bg-white p-4">
        {/* Tiêu đề */}
        <div className="text-grey-700 font-bold"></div>
        <div className="text-grey-700 text-left font-bold">Cabin</div>
        <div className="text-grey-700 text-left font-bold">Capacity</div>
        <div className="text-grey-700 text-left font-bold">Price</div>
        <div className="text-grey-700 text-left font-bold">Discount</div>
      </div>
      <div className="rounded-md bg-white">
        {/* Dữ liệu cabins */}
        {cabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}
