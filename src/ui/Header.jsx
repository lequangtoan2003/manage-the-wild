import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme } = useTheme();

  return (
    <header
      className={`flex items-center justify-end border-b ${
        theme === 'dark'
          ? 'border-grey-700 bg-grey-900 text-grey-100'
          : 'border-grey-100 bg-grey-50 text-grey-700'
      } p-5 px-12`}
    >
      <UserAvatar />
      <HeaderMenu />
      <ThemeToggle />
    </header>
  );
}
