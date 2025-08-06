import { useForm } from 'react-hook-form';
import useUpdateUser from './useUpdateUser';

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
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
            errors.password ? 'border-red-500' : 'border-gray-300'
          } disabled:opacity-50`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="passwordConfirm"
          className="mb-1 block text-sm font-medium text-gray-700"
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
            errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'
          } disabled:opacity-50`}
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={reset}
          disabled={isUpdating}
          className="flex-1 rounded-md bg-gray-200 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="flex-1 rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Update password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
