import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';

export default function Header() {
  return (
    <header className="flex items-center justify-end border-b border-grey-100 bg-grey-50 p-5 px-12">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
