/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      "xl": "1440px",
      "md": "1024px"
    },
    extend: {
      content: {
        link: 'url(./images/search.svg)'
      }
    },
  },
  plugins: [],
}

