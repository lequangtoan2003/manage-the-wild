import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        Dashboard
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}
