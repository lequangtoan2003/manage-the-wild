/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Kích hoạt chế độ tối bằng cách thêm class 'dark' vào thẻ <html>
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E1E8EF',
          100: '#D4DEE7',
          200: '#B7C7D7',
          300: '#99B0C7',
          400: '#7C99B6',
          500: '#5E82A6',
          600: '#4C6B8A',
          700: '#3C546C',
          800: '#2C3D4F',
          900: '#1B2631',
          950: '#141C24',
        },
        accent: {
          50: '#FAF5F0',
          100: '#F4ECE1',
          200: '#E8D6BF',
          300: '#DDC2A2',
          400: '#D2AF84',
          500: '#C69963',
          600: '#B78343',
          700: '#926835',
          800: '#6C4D28',
          900: '#4B351B',
          950: '#382814',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        grey: {
          0: '#fff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        blue: {
          100: '#e0f2fe',
          700: '#0369a1',
        },
        green: {
          100: '#dcfce7',
          700: '#15803d',
        },
        silver: {
          100: '#e5e7eb',
          700: '#374151',
        },
        red: {
          100: '#fee2e2',
          300: '#fca5a5', // Thêm sắc độ 300
          500: '#ef4444', // Thêm sắc độ 500
          700: '#b91c1c',
          800: '#991b1b',
        },
        yellow: {
          100: '#fef9c3',
          300: '#fde047', // Thêm sắc độ 300
          500: '#eab308', // Thêm sắc độ 500
          700: '#a16207',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
