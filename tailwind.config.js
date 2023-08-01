/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-gray': {
          DEFAULT: '#2B2C37',
          'soft': '#252631'
        },
        'dark-blue': {
          DEFAULT: '#20212C'
        },
        'light-gray': {
          DEFAULT: '#F4F7FD',
          'darker': '#EAF0FB'
        },
        'strong-gray': {
          DEFAULT: '#828FA3'
        }
      },
    },
  },
  plugins: [],
}