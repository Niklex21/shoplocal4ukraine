/** @type {import('tailwindcss').Config} */

module.exports = {
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
        accent: "#D7E6F5",
        'ukraine-yellow': "#FFD101",
        "ukraine-blue": "#005EB8"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ],
}
