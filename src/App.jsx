import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';
import Checkin from './ui/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60, // 1m
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="min-h-screen font-sans text-2xl text-gray-700">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          erorr: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '400px',
            backgroundColor: 'grey-0',
            color: 'grey-800',
          },
        }}
      />
    </QueryClientProvider>
  );
}
