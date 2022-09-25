/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'card': '30rem',
      },
      colors: {
        text: {
          DEFAULT: "#232327",
          inverted: "#FFFDF5"
        },
        background: {
          DEFAULT: "#FFEBAF",
          inverted: "#232335"
        },
        accent: "#D7E6F5"
      },
    },
  },
  plugins: [],
})
