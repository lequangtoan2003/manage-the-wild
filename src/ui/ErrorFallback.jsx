import { useTheme } from '../context/ThemeContext';

function ErrorFallback({ error, resetErrorBoundary }) {
  const { theme } = useTheme();

  return (
    <>
      <style>
        {`
          /* Reset CSS cơ bản */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
        `}
      </style>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-12 dark:bg-gray-900">
        <div className="max-w-6xl rounded-lg border border-gray-100 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
            Error 🧐
          </h1>
          <div className="mb-8 font-mono text-gray-500 dark:text-gray-400">
            {error.message}
          </div>
          <button
            className={`rounded-md px-6 py-3 text-lg font-medium transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
            onClick={resetErrorBoundary}
          >
            retry
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorFallback;
