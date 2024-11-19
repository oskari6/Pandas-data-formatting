/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Include the pages directory if you're using it
    "./components/**/*.{js,ts,jsx,tsx}", // Include components as well
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
    animation: {
      slideRight: "slideRight 1s ease-in-out",
      slideLeft: "slideLeft 1s ease-in-out",
    },
  },
  plugins: [],
};
