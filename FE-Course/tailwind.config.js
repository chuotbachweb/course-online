/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        success: "#28a745",
        cancel: "#dd3c4b",
        warn: "#e18413"
      },
    },
  },
  plugins: [],
};
