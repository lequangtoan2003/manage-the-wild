import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeteleCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import Model from '../../ui/Model';

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State cho modal xác nhận
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    deleteCabin(cabinId);
    setShowConfirm(false); // Đóng modal sau khi xóa
  };

  return (
    <>
      <div className="grid grid-cols-[9.6rem_2fr_2fr_1fr_1.4fr_2fr] items-center gap-4 border-b border-grey-200 py-2">
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
          {discount ? '$' : ''}
          {discount ? discount : 'no discount'}
        </div>
        <div className="flex">
          <button
            onClick={handleDuplicate}
            disabled={isCreating}
            className="m-2 rounded-lg border-2 text-gray-600 hover:text-rose-400"
          >
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="m-2 rounded-lg border-2 text-gray-600 hover:text-rose-400"
          >
            <HiPencil />
          </button>
          <button
            onClick={() => setShowConfirm(true)} // Mở modal xác nhận khi nhấp Delete
            disabled={isDeleting}
            className="m-2 rounded-lg border-2 text-gray-600 hover:text-rose-400"
          >
            <HiTrash />
          </button>
        </div>
      </div>
      <Model isOpen={showForm} onClose={() => setShowForm(false)}>
        <CreateCabinForm
          cabinToEdit={cabin}
          onSuccess={() => setShowForm(false)}
        />
      </Model>
      <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
          <p>Are you sure you want to delete cabin {name}?</p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Model>
    </>
  );
}
