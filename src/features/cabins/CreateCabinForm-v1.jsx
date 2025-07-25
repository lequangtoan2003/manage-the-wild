import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import Error from '../../ui/Error';

export default function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message || 'Error creating cabin');
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    console.log('Form errors:', errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mt-2 flex flex-col gap-4 rounded-lg bg-grey-0 p-8 shadow-md"
    >
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Cabin name</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Maximum Capacity</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          disabled={isCreating}
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
        <label>Regular price</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Discount</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          disabled={isCreating}
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
        <label>Description for website</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="text"
          disabled={isCreating}
          id="description"
          {...register('description', { required: 'This field is required' })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Cabin photo</label>
        <div className="">
          <input
            className="max-w-[296px] rounded-lg border-2 outline-none"
            type="file" // Đổi thành type="file" để upload ảnh
            disabled={isCreating}
            accept="image/*"
            id="image"
            {...register('image')} // Đăng ký input này với react-hook-form
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
            className="text-gray-0 rounded-lg border bg-white px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            disabled={isCreating}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
