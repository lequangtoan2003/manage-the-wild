import MainNav from './MainNav';

export default function Sidebar() {
  return (
    <aside className="bg-gray-0 row-span-full flex flex-col gap-8 border-r border-gray-200 p-8">
      Sidebar
      <MainNav />
    </aside>
  );
}
