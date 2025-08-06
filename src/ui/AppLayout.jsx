import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../context/ThemeContext'; // Thêm để sử dụng theme

function AppLayout() {
  const { theme } = useTheme(); // Lấy theme từ context

  return (
    <div
      className={`grid h-screen grid-cols-[8rem_1fr] grid-rows-[auto_1fr] md:grid-cols-[26rem_1fr] ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-grey-50 text-grey-700'
      }`}
    >
      <Header className="col-span-full" />
      <Sidebar className="row-start-2" />

      <main
        className={`col-start-2 row-start-2 overflow-y-auto p-16 pb-20 ${
          theme === 'dark' ? 'bg-grey-800' : 'bg-gray-300'
        }`}
      >
        <div className="max-w-screen mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
