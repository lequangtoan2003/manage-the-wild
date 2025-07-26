import Spinner from '../../ui/Spinner';
import { useSettings } from './apiSettings';
import useUpdateSetting from './useUpdateSetting';

export default function UpdateSettingsForm() {
  const { settings, isLoading, error } = useSettings();

  // Sử dụng optional chaining và giá trị mặc định
  const minBookingLength = settings?.minBookingLength ?? 0;
  const maxBookingLength = settings?.maxBookingLength ?? 0;
  const maxGuestsPerBooking = settings?.maxGuestsPerBooking ?? 0;
  const breakfastPrice = settings?.breakfastPrice ?? 0;
  // Xử lý loading và error
  const { updateSetting, isUpdating } = useUpdateSetting();
  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({
      [field]: value,
    });
  }
  return (
    <form className="mt-2 flex flex-col gap-4 rounded-lg bg-grey-0 p-8 shadow-md">
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label className="text-sm font-medium text-gray-700">
          Minimum nights/booking
        </label>
        <input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label className="text-sm font-medium text-gray-700">
          Maximum nights/booking
        </label>
        <input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label className="text-sm font-medium text-gray-700">
          Maximum guests/booking
        </label>
        <input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label className="text-sm font-medium text-gray-700">
          Breakfast price
        </label>
        <input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </div>
    </form>
  );
}
