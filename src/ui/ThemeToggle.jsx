import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full bg-grey-100 p-2 text-sm font-semibold text-grey-700 transition-colors hover:bg-grey-200 dark:bg-grey-800 dark:text-grey-100 dark:hover:bg-grey-700"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
