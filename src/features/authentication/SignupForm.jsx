import { useForm } from 'react-hook-form';
import Error from '../../ui/Error';
import { useSignup } from './useSignup';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    formState,
    getValues,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const { errors: formErrors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(defaultValues),
      }
    );
  }

  function onError(formErrors) {
    console.log('Form errors:', formErrors);
  }

  const handleCancel = () => {
    console.log('Cancel clicked, resetting form');
    reset(defaultValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="fullName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('fullName', { required: 'This field is required' })}
        />
        {formErrors?.fullName?.message && (
          <Error>{formErrors.fullName.message}</Error>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formErrors?.email?.message && (
          <Error>{formErrors.email.message}</Error>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formErrors?.password?.message && (
          <Error>{formErrors.password.message}</Error>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="passwordConfirm"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Repeat password
        </label>
        <input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formErrors?.passwordConfirm?.message && (
          <Error>{formErrors.passwordConfirm.message}</Error>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          disabled={isLoading}
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-md bg-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="flex-1 rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create new user
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
