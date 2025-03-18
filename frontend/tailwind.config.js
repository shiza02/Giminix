/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,jsx}", // Adding this line to ensure all relevant files are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
