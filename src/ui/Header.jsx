import Logout from '../features/authentication/Logout';

export default function Header() {
  return (
    <header className="border-b border-grey-100 bg-grey-50 p-5 px-12">
      <Logout />
    </header>
  );
}
