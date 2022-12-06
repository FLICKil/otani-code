/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0d6efd",
      warning: "#ffc107",
      success: "#198754",
      error: "#dc3545",
      white: "#fff"
    }
  },
  plugins: [],
}
