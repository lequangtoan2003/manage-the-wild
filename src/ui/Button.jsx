import { useTheme } from '../context/ThemeContext';

const getButtonClasses = ({ size, variation, theme }) => {
  const sizeClasses = {
    small: 'text-[1.2rem] px-2 py-1 uppercase font-semibold text-center',
    medium: 'text-[1.4rem] px-4 py-3 font-medium',
    large: 'text-[1.6rem] px-6 py-3 font-medium',
  };

  const variationClasses = {
    primary:
      theme === 'dark'
        ? 'text-indigo-50 bg-indigo-700 hover:bg-indigo-600'
        : 'text-indigo-50 bg-indigo-600 hover:bg-indigo-700',
    secondary:
      theme === 'dark'
        ? 'text-grey-200 bg-grey-700 border border-grey-600 hover:bg-grey-600'
        : 'text-grey-600 bg-grey-0 border border-grey-200 hover:bg-grey-300',
    danger:
      theme === 'dark'
        ? 'text-red-100 bg-red-800 hover:bg-red-700'
        : 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  return `${sizeClasses[size] || sizeClasses.medium} ${
    variationClasses[variation] || variationClasses.primary
  } rounded-sm shadow-sm`;
};

const Button = ({ size, variation, children, ...props }) => {
  const { theme } = useTheme(); // Lấy theme từ context
  return (
    <button className={getButtonClasses({ size, variation, theme })} {...props}>
      {children}
    </button>
  );
};

export default Button;
