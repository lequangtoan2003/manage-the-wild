import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message || 'Error deleting cabin'),
  });
  return (
    <div className="grid grid-cols-[9.6rem_2fr_2fr_1fr_1fr_2fr] items-center gap-4 border-b border-grey-200 py-2">
      <img
        className="h-16 w-24 object-cover"
        src={image}
        alt={`Cabin ${name}`}
      />
      <div className="text-left text-xl text-grey-600">{name}</div>
      <div className="text-left text-xl text-grey-600">
        Fits up to {maxCapacity} guest{maxCapacity > 1 ? 's' : ''}
      </div>
      <div className="text-left text-xl text-grey-600">${regularPrice}</div>
      <div className="text-left text-xl text-grey-600">
        ${discount ? discount : ''}
      </div>
      <button
        onClick={() => mutate(cabinId)}
        disabled={isDeleting}
        className="m-2 rounded-lg border-2 text-gray-600 hover:text-rose-400"
      >
        Delete
      </button>
    </div>
  );
}
