/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'e-ukraine': ['e-Ukraine', 'sans-serif']
      },
      height: {
        card: "30rem",
      },
      colors: {
        text: { DEFAULT: "#232327", inverted: "#FFFDF5" },
        background: { DEFAULT: "#FFEBAF", inverted: "#232335" },
        accent: "#D7E6F5",
        "ukraine-yellow": "#FFD700",
        "ukraine-blue": "#0057B8",
      },
      dropShadow: ({ theme }) => ({
        'button': `4px 4px 0px ${ theme('colors')['ukraine-blue'] }`
      }),
      transitionProperty: {
        'filter': 'filter'
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
