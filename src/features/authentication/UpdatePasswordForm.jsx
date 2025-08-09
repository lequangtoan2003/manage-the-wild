import { useForm } from 'react-hook-form';
import useUpdateUser from './useUpdateUser';
import { useTheme } from '../../context/ThemeContext';

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();
  const { theme } = useTheme();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mx-auto w-full max-w-md rounded-lg p-6 shadow-md ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-white text-grey-700'
      }`}
    >
      <div className="mb-4">
        <label
          htmlFor="password"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          New password (min 8 chars)
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100'
              : 'border-gray-300 bg-white text-gray-700'
          } ${errors.password ? 'border-red-500' : ''} disabled:opacity-50`}
        />
        {errors.password && (
          <p
            className={`mt-1 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="passwordConfirm"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Confirm password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100'
              : 'border-gray-300 bg-white text-gray-700'
          } ${errors.passwordConfirm ? 'border-red-500' : ''} disabled:opacity-50`}
        />
        {errors.passwordConfirm && (
          <p
            className={`mt-1 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}
          >
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={reset}
          disabled={isUpdating}
          className={`flex-1 rounded-md py-2 text-sm focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-grey-700 text-grey-100 hover:bg-grey-600 focus:ring-grey-400'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
          } disabled:opacity-50`}
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
          } disabled:opacity-50`}
        >
          Update password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
