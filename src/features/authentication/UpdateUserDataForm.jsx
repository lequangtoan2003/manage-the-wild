import { useState } from 'react';
import { useUser } from './useUser';
import useUpdateUser from './useUpdateUser';
import { useTheme } from '../../context/ThemeContext';

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { theme } = useTheme();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto w-full max-w-md rounded-lg p-6 shadow-md ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-white text-grey-700'
      }`}
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className={`block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Email address
        </label>
        <input
          type="text"
          id="email"
          value={email}
          disabled
          className={`mt-1 w-full rounded-md border px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700'
              : 'border-gray-300 bg-white'
          }`}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fullName"
          className={`block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100'
              : 'border-gray-300 bg-white text-gray-700'
          }`}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="avatar"
          className={`block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
          className={`mt-1 w-full rounded-md border px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 file:bg-blue-700 file:hover:bg-blue-600'
              : 'border-gray-300 bg-white text-gray-700 file:bg-blue-500 file:hover:bg-blue-600'
          }`}
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="reset"
          onClick={handleCancel}
          disabled={isUpdating}
          className={`flex-1 rounded-md py-2 text-sm focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-grey-700 text-grey-100 hover:bg-grey-600 focus:ring-grey-400'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className={`flex-1 rounded-md py-2 text-sm text-white focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-blue-700 hover:bg-blue-600 focus:ring-blue-400'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          Update account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
