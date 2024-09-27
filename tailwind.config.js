/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "prim-green": "#4db27d",
        "sec-green": "#50b24d",
        "tert-blue": "#4db2b0",
        "tert-blue-hover": "-[#62e3e1]",
        "gray-back": "#dddddd46",
      },
    },
  },
  plugins: [],
};
