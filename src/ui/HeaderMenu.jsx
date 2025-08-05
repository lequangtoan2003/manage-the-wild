import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';
import { useNavigate } from 'react-router-dom';

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <div className="flex list-none gap-2">
      <li>
        <button
          onClick={() => navigate('/account')}
          className="w-10 rounded-sm border-none bg-none p-2 transition-all hover:bg-gray-100"
        >
          <HiOutlineUser />
        </button>
      </li>
      <li>
        <Logout />
      </li>
    </div>
  );
}
