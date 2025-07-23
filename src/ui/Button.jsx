// Hàm ánh xạ size và variation sang các lớp Tailwind
const getButtonClasses = ({ size, variation }) => {
  const sizeClasses = {
    small: 'text-[1.2rem] px-2 py-1 uppercase font-semibold text-center',
    medium: 'text-[1.4rem] px-4 py-3 font-medium',
    large: 'text-[1.6rem] px-6 py-3 font-medium',
  };

  const variationClasses = {
    primary: 'text-indigo-50 bg-indigo-600 hover:bg-indigo-700',
    secondary:
      'text-grey-600 bg-grey-0 border border-grey-200 hover:bg-grey-300',
    danger: 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  return `${sizeClasses[size] || sizeClasses.medium} ${variationClasses[variation] || variationClasses.primary} rounded-sm shadow-sm`;
};

const Button = ({ size, variation, children, ...props }) => {
  return (
    <button className={getButtonClasses({ size, variation })} {...props}>
      {children}
    </button>
  );
};
export default Button;
