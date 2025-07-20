import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

export default function MainNav() {
  return (
    <nav className="w-12 md:w-64">
      <ul className="flex flex-col gap-1 md:gap-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md p-2 text-base font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 md:gap-3 md:p-3 ${
                isActive ? 'bg-gray-100 text-gray-800' : ''
              }`
            }
          >
            <HiOutlineHome className="h-6 w-6 text-gray-400 transition-all group-hover:text-blue-600" />
            <span className="hidden md:inline">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md p-2 text-base font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 md:gap-3 md:p-3 ${
                isActive ? 'bg-gray-100 text-gray-800' : ''
              }`
            }
          >
            <HiOutlineCalendarDays className="h-6 w-6 text-gray-400 transition-all group-hover:text-blue-600" />
            <span className="hidden md:inline">Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md p-2 text-base font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 md:gap-3 md:p-3 ${
                isActive ? 'bg-gray-100 text-gray-800' : ''
              }`
            }
          >
            <HiOutlineHomeModern className="h-6 w-6 text-gray-400 transition-all group-hover:text-blue-600" />
            <span className="hidden md:inline">Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md p-2 text-base font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 md:gap-3 md:p-3 ${
                isActive ? 'bg-gray-100 text-gray-800' : ''
              }`
            }
          >
            <HiOutlineUsers className="h-6 w-6 text-gray-400 transition-all group-hover:text-blue-600" />
            <span className="hidden md:inline">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md p-2 text-base font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 md:gap-3 md:p-3 ${
                isActive ? 'bg-gray-100 text-gray-800' : ''
              }`
            }
          >
            <HiOutlineCog6Tooth className="h-6 w-6 text-gray-400 transition-all group-hover:text-blue-600" />
            <span className="hidden md:inline">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
