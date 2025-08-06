import Spinner from '../../ui/Spinner';
import { useSettings } from './apiSettings';
import useUpdateSetting from './useUpdateSetting';
import { useTheme } from '../../context/ThemeContext';

export default function UpdateSettingsForm() {
  const { settings, isLoading, error } = useSettings();
  const { theme } = useTheme();

  // Sử dụng optional chaining và giá trị mặc định
  const minBookingLength = settings?.minBookingLength ?? 0;
  const maxBookingLength = settings?.maxBookingLength ?? 0;
  const maxGuestsPerBooking = settings?.maxGuestsPerBooking ?? 0;
  const breakfastPrice = settings?.breakfastPrice ?? 0;

  // Xử lý loading và error
  const { updateSetting, isUpdating } = useUpdateSetting();
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className={theme === 'dark' ? 'text-grey-300' : 'text-gray-700'}>
        Lỗi: {error.message}
      </div>
    );

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    // Chuyển đổi giá trị thành số để so sánh (vì input type="number")
    const newValue = Number(value);
    const currentValue = settings?.[field] ?? 0;

    // Chỉ cập nhật nếu giá trị mới khác giá trị hiện tại
    if (newValue !== currentValue) {
      updateSetting({
        [field]: newValue,
      });
    }
  }

  return (
    <form
      className={`mt-2 flex flex-col gap-4 rounded-lg p-8 shadow-md ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-grey-0 text-grey-700'
      }`}
    >
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Số đêm tối thiểu/đặt phòng
        </label>
        <input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          className={`rounded-md border p-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Số đêm tối đa/đặt phòng
        </label>
        <input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          className={`rounded-md border p-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Số khách tối đa/đặt phòng
        </label>
        <input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          className={`rounded-md border p-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </div>
      <div className="grid grid-cols-[20rem_1fr_1fr] gap-4">
        <label
          className={`text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Giá bữa sáng
        </label>
        <input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          className={`rounded-md border p-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </div>
    </form>
  );
}
