/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Include the pages directory if you're using it
    "./components/**/*.{js,ts,jsx,tsx}", // Include components as well
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
