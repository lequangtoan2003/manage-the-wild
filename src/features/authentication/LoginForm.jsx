import { useState } from 'react';
import { useLogin } from './useLogin';
import imgbg from '../../Images/imgregister.jpeg';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Thêm icon từ heroicons

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState('lequangtoan1904@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false); // State để toggle hiển thị mật khẩu

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-[0_0_15px_5px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center gap-10">
          <div className="">
            <div className="rotate-[6deg] rounded-lg p-4">
              <img
                className="w-[400px] rounded-xl object-cover"
                src={imgbg}
                alt=""
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-black">Login</div>
              <div className="text-sm text-gray-500">Welcome to The wild!</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="username"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-2 top-[65%] -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
