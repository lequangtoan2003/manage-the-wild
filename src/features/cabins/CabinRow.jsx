import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeteleCabin';

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <>
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
        <div className="flex">
          <button
            className="m-2 w-20 rounded-lg border-2 text-gray-600 hover:text-rose-400"
            onClick={() => setShowForm((show) => !show)}
          >
            edit
          </button>
          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
            className="m-2 rounded-lg border-2 text-gray-600 hover:text-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
