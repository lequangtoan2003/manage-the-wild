export default function Spinner() {
  return (
    <div className="my-28 flex items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-b-transparent border-l-blue-500 border-r-blue-500 border-t-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-b-transparent border-l-purple-500 border-r-purple-500 border-t-transparent"
            style={{ animationDelay: '-0.5s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
