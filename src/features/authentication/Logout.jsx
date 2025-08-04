import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';

export default function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <button
      disabled={isLoading}
      onClick={logout}
      className="w-10 rounded-sm border-none bg-none p-2 transition-all hover:bg-gray-100"
    >
      <HiArrowRightOnRectangle />
    </button>
  );
}
