import Spinner from '../../ui/Spinner';
import TodayList from './TodayList';
import { useTodayActivity } from './useTodayActivity';
import { useTheme } from '../../context/ThemeContext'; // Thêm import useTheme

export default function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const { theme } = useTheme(); // Lấy theme từ context
  console.log('Activities:', activities);

  return (
    <div
      className={`col-start-1 gap-4 rounded-md border pt-2 ${
        theme === 'dark'
          ? 'border-grey-700 bg-grey-800 text-grey-100'
          : 'border-grey-100 bg-grey-0 text-grey-700'
      } sm:col-span-4 md:col-span-full lg:col-span-2`}
    >
      {!isLoading ? (
        activities?.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto overflow-x-hidden">
            {activities.map((activity) => (
              <TodayList activity={activity} key={activity.id} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            No activity today...{' '}
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}
