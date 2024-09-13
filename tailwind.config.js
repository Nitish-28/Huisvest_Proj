/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js}',
    './components/**/*.{html,js}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}