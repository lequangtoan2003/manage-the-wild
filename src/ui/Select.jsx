export default function Select({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-md border border-gray-200 bg-white px-3 py-[9.3px] text-sm font-medium shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
