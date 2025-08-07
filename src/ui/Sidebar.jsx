import Uploader from '../data/Uploader';
import MainNav from './MainNav';

export default function Sidebar() {
  return (
    <aside className="bg-gray-0 row-span-full flex flex-col gap-8 border-r border-gray-200 p-8 md:min-w-72 xl:max-w-none">
      Sidebar
      <MainNav />
      <Uploader />
    </aside>
  );
}
