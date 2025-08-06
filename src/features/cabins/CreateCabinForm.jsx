import { useForm } from 'react-hook-form';
import Error from '../../ui/Error';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';
import { useTheme } from '../../context/ThemeContext';

export default function CreateCabinForm({ cabinToEdit = {}, onSuccess }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { theme } = useTheme();

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onSuccess?.(); // Gọi onSuccess để đóng modal
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onSuccess?.(); // Gọi onSuccess để đóng modal
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log('Form errors:', errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={`mt-2 flex flex-col gap-4 rounded-lg p-8 shadow-md ${
        theme === 'dark'
          ? 'bg-grey-800 text-grey-100'
          : 'bg-grey-0 text-grey-700'
      }`}
    >
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Cabin name
        </label>
        <input
          className={`rounded-lg border-2 outline-none ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
              : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
          }`}
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Maximum Capacity
        </label>
        <input
          className={`rounded-lg border-2 outline-none ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
              : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
          }`}
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Regular price
        </label>
        <input
          className={`rounded-lg border-2 outline-none ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
              : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
          }`}
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1',
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Discount
        </label>
        <input
          className={`rounded-lg border-2 outline-none ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
              : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
          }`}
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Description for website
        </label>
        <input
          className={`rounded-lg border-2 outline-none ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
              : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
          }`}
          type="text"
          disabled={isWorking}
          id="description"
          {...register('description', { required: 'This field is required' })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label className={theme === 'dark' ? 'text-grey-200' : 'text-grey-700'}>
          Cabin photo
        </label>
        <div className="">
          <input
            className={`max-w-[296px] rounded-lg border-2 outline-none ${
              theme === 'dark'
                ? 'border-grey-600 bg-grey-700 text-grey-100 focus:border-blue-400'
                : 'border-gray-300 bg-white text-grey-700 focus:border-blue-500'
            }`}
            type="file"
            disabled={isWorking}
            accept="image/*"
            id="image"
            {...register('image', {
              required: isEditSession ? false : 'This field is required',
            })}
          />
        </div>
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </div>
      <div className="grid grid-cols-[24rem_1fr_1.2fr] gap-4">
        <div className=""></div>
        <div className=""></div>
        <div className="flex gap-3">
          <button
            type="reset"
            className={`text-gray-0 rounded-lg border px-4 py-2 transition-colors duration-200 ${
              theme === 'dark'
                ? 'border-grey-600 bg-grey-700 text-grey-100 hover:bg-grey-600'
                : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => onSuccess?.()} // Đóng modal khi nhấn Cancel
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 text-white transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-blue-700 hover:bg-blue-600'
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
            disabled={isWorking}
          >
            {isEditSession ? 'Update Cabin' : 'Create Cabin'}
          </button>
        </div>
      </div>
    </form>
  );
}
