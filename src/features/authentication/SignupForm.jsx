import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Error from '../../ui/Error';
import { useSignup } from './useSignup';
import { useTheme } from '../../context/ThemeContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { theme } = useTheme();
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
      className={`mx-auto w-full max-w-md rounded-lg p-6 shadow-md ${
        theme === 'dark'
          ? 'bg-grey-900 text-grey-100'
          : 'bg-white text-grey-700'
      }`}
    >
      <div className="mb-4">
        <label
          htmlFor="fullName"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          disabled={isLoading}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
          {...register('fullName', { required: 'This field is required' })}
        />
        {formErrors?.fullName?.message && (
          <Error>{formErrors.fullName.message}</Error>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
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
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
              : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
          }`}
        />
        {formErrors?.email?.message && (
          <Error>{formErrors.email.message}</Error>
        )}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="password"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            disabled={isLoading}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
            className={`w-full rounded-md border px-3 py-2 pr-12 focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
                : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
            }`}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              theme === 'dark'
                ? 'text-grey-400 hover:text-grey-200'
                : 'text-gray-500 hover:text-gray-700'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {formErrors?.password?.message && (
          <Error>{formErrors.password.message}</Error>
        )}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="passwordConfirm"
          className={`mb-1 block text-sm font-medium ${
            theme === 'dark' ? 'text-grey-200' : 'text-gray-700'
          }`}
        >
          Repeat password
        </label>
        <div className="relative">
          <input
            type={showPasswordConfirm ? 'text' : 'password'}
            id="passwordConfirm"
            disabled={isLoading}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
            })}
            className={`w-full rounded-md border px-3 py-2 pr-12 focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'border-grey-600 bg-grey-700 text-grey-100 focus:ring-blue-400'
                : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500'
            }`}
          />
          <button
            type="button"
            aria-label={
              showPasswordConfirm
                ? 'Hide confirm password'
                : 'Show confirm password'
            }
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              theme === 'dark'
                ? 'text-grey-400 hover:text-grey-200'
                : 'text-gray-500 hover:text-gray-700'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            disabled={isLoading}
          >
            {showPasswordConfirm ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {formErrors?.passwordConfirm?.message && (
          <Error>{formErrors.passwordConfirm.message}</Error>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          disabled={isLoading}
          type="button"
          onClick={handleCancel}
          className={`flex-1 rounded-md py-2 text-sm focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-grey-700 text-grey-100 hover:bg-grey-600 focus:ring-grey-400'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
          }`}
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className={`flex-1 rounded-md py-2 text-sm text-white focus:outline-none focus:ring-2 ${
            theme === 'dark'
              ? 'bg-blue-700 hover:bg-blue-600 focus:ring-blue-400'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          Create new user
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
