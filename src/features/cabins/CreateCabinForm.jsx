import { useForm } from 'react-hook-form';

export default function CreateCabinForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log('Cabin data submitted:', data);
    // Ở đây bạn có thể gửi dữ liệu đến API để tạo cabin mới
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 flex flex-col gap-4 rounded-lg bg-grey-0 p-8 shadow-md"
    >
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Cabin name</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="text"
          id="name"
          {...register('name')}
        />
        <div className=""></div>
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Maximum Capacity</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          id="maxCapacity"
          {...register('maxCapacity')}
        />
        <div className=""></div>
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Regular price</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          id="regularPrice"
          {...register('regularPrice')}
        />
        <div className=""></div>
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Discount</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount')}
        />
        <div className=""></div>
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Description for website</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="text"
          id="description"
          {...register('description')}
        />
        <div className=""></div>
      </div>
      <div className="grid grid-cols-[20rem_1fr_1.2fr] gap-4">
        <label>Cabin photo</label>
        <input
          className="rounded-lg border-2 outline-none"
          type="file" // Đổi thành type="file" để upload ảnh
          accept="image/*"
          id="image"
          {...register('image')} // Đăng ký input này với react-hook-form
        />
        <div className=""></div>
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
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
