import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from './useCabin';

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabin();

  if (isLoading) return <Spinner />;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="rounded-md bg-grey-100 p-4">
      <div className="mb-4 grid grid-cols-[9.6rem_2fr_2fr_1fr_1fr_2fr] gap-4 bg-white p-4">
        {/* Tiêu đề */}
        <div className="font-bold text-grey-700"></div>
        <div className="text-left font-bold text-grey-700">Cabin</div>
        <div className="text-left font-bold text-grey-700">Capacity</div>
        <div className="text-left font-bold text-grey-700">Price</div>
        <div className="text-left font-bold text-grey-700">Discount</div>
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
