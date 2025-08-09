import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import bg from '../Images/CV4.jpg';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme } = useTheme();

  return (
    <div className="relative mx-auto max-w-[800px]">
      <div
        className={`absolute left-16 h-full w-[30%] scale-[1.09] overflow-hidden rounded-md ${
          theme === 'dark' ? 'bg-grey-900' : 'bg-grey-50'
        }`}
      >
        <div
          className={`relative h-full w-full ${
            theme === 'dark' ? 'bg-grey-800' : 'bg-grey-400'
          }`}
        >
          <img
            className="h-full w-full object-cover opacity-30"
            src={bg}
            alt="Background"
          />
          <div className="absolute top-[20%] z-10 flex h-[50%] w-full translate-x-[0%] items-center justify-center">
            <div className="flex flex-col">
              <div
                className={`w-[70%] p-4 text-2xl font-extrabold ${
                  theme === 'dark' ? 'text-grey-100' : 'text-grey-0'
                }`}
              >
                Price Adjustment
              </div>
              <div
                className={`font-base w-[95%] pl-4 text-sm ${
                  theme === 'dark' ? 'text-grey-200' : 'text-grey-0'
                }`}
              >
                Please choose the most suitable price
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateSettingsForm />
    </div>
  );
}
