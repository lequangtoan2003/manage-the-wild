export default function Stat({ icon, title, value, bgColor, textColor }) {
  return (
    <div className="m-4 grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] rounded-md border border-gray-100 bg-grey-0 py-4">
      <div
        className={`col-span-1 row-span-2 ${bgColor} ${textColor} m-auto flex h-12 w-12 items-center justify-center rounded-full`}
      >
        <svg
          className={`h-12 w-12 rounded-full ${bgColor}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <g transform="translate(6 6) scale(0.5)">{icon}</g>
        </svg>
      </div>
      <div className="col-start-2 row-start-1 text-base font-medium uppercase">
        {title}
      </div>
      <div className="col-start-2 row-start-2 pr-4 font-semibold">{value}</div>
    </div>
  );
}
