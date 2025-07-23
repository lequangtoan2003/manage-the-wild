import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[8rem_1fr] grid-rows-[auto_1fr] md:grid-cols-[26rem_1fr]">
      <Header className="col-span-full" />
      <Sidebar className="row-start-2" />

      <main className="col-start-2 row-start-2 overflow-y-auto bg-gray-300 p-16 pb-20">
        <div className="max-w-screen mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
