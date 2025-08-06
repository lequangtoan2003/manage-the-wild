import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeteleCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import Modal from '../../ui/Model';
import { useTheme } from '../../context/ThemeContext';

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const { theme } = useTheme();
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
      <div
        className={`grid grid-cols-[9.6rem_2fr_2fr_1fr_1.4fr_2fr] items-center gap-4 border-b py-2 ${
          theme === 'dark'
            ? 'border-grey-700 bg-grey-800 text-grey-100'
            : 'border-grey-200 bg-white text-grey-600'
        }`}
      >
        <img
          className="h-16 w-24 object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
        <div className="text-left text-xl">{name}</div>
        <div className="text-left text-xl">
          Fits up to {maxCapacity} guest{maxCapacity > 1 ? 's' : ''}
        </div>
        <div className="text-left text-xl">${regularPrice}</div>
        <div className="text-left text-xl">
          {discount ? '$' : ''}
          {discount ? discount : 'no discount'}
        </div>
        <div className="flex">
          <button
            onClick={handleDuplicate}
            disabled={isCreating}
            className={`m-2 rounded-lg border-2 transition-colors duration-200 ${
              theme === 'dark'
                ? 'border-grey-600 text-grey-200 hover:text-blue-400'
                : 'border-gray-300 text-gray-600 hover:text-rose-400'
            }`}
          >
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className={`m-2 rounded-lg border-2 transition-colors duration-200 ${
              theme === 'dark'
                ? 'border-grey-600 text-grey-200 hover:text-blue-400'
                : 'border-gray-300 text-gray-600 hover:text-rose-400'
            }`}
          >
            <HiPencil />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className={`m-2 rounded-lg border-2 transition-colors duration-200 ${
              theme === 'dark'
                ? 'border-grey-600 text-grey-200 hover:text-red-400'
                : 'border-gray-300 text-gray-600 hover:text-rose-400'
            }`}
          >
            <HiTrash />
          </button>
        </div>
      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <CreateCabinForm
          cabinToEdit={cabin}
          onSuccess={() => setShowForm(false)}
        />
      </Modal>
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div
          className={`rounded-lg p-6 shadow-lg ${
            theme === 'dark'
              ? 'bg-grey-800 text-grey-100'
              : 'bg-white text-grey-700'
          }`}
        >
          <h2 className="mb-4 text-lg font-bold">Confirm Deletion</h2>
          <p>Are you sure you want to delete cabin {name}?</p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-grey-700 text-grey-100 hover:bg-grey-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className={`rounded-lg px-4 py-2 text-white transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-red-700 hover:bg-red-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
