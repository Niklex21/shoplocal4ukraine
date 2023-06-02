/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("@mui/system");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { "e-ukraine": ["e-Ukraine", "sans-serif"] },
      height: {
        card: "30rem",
      },
      colors: {
        text: { DEFAULT: "#1a1a1a", inverted: "#FFFDF5" },
        background: { DEFAULT: "#FFEBAF", inverted: "#232335" },
        accent: "#D7E6F5",
        "ukraine-yellow": "#FFD700",
        "ukraine-blue": "#008bff",
        "oxford-blue": "#00162E",
        "blond-yellow": "#FFF5C0",
        "iceberg-blue": "#80ABDC",
        "alice-blue": "#F0F5FB",
        "logo-yellow": "#ffae00"
      },
      dropShadow: ({ theme }) => ({
        button: `4px 4px 0px ${theme("colors")["ukraine-blue"]}`,
        // top drop shadow configs
        "t-sm": `0 -1px -1px rgb(0 0 0 / 0.05)`,
        "t": [
          `0 -1px 2px rgb(0 0 0 / 0.1)`,
          `0 -1px 1px rgb(0 0 0 / 0.06)`
        ],
        "t-md": [
          `0 -4px 3px rgb(0 0 0 / 0.07)`,
          `0 -2px 2px rgb(0 0 0 / 0.06)`
        ],
        "t-lg": [
          `0 -10px 8px rgb(0 0 0 / 0.04)`,
          `0 -4px 3px rgb(0 0 0 / 0.1)`
        ],
        "t-xl": [
          `0 -20px 13px rgb(0 0 0 / 0.03)`,
          `0 -8px 5px rgb(0 0 0 / 0.08)`
        ],
        "t-2xl": `0 -25px 25px rgb(0 0 0 / 0.15)`,
        "t-white-md": [
          `0 -4px 3px rgb(255 255 255 / 0.07)`,
          `0 -2px 2px rgb(255 255 255 / 0.06)`
        ],
        "white-md": [
          `0 4px 3px rgb(255 255 255 / 0.07)`,
          `0 2px 2px rgb(255 255 255 / 0.06)`
        ],
        "white-lg": [
          `0 10px 8px rgb(255 255 255 / 0.04)`,
          `0 4px 3px rgb(255 255 255 / 0.1)`
        ],
        "white-xl": [
          `0 20px 13px rgb(255 255 255 / 0.03)`,
          `0 8px 5px rgb(255 255 255 / 0.08)`
        ]
      }),
      transitionProperty: { filter: "filter" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundPosition: { "bottom-edge": "0% 0% 0% 150%" },
      backgroundSize: { "size-2x": "100% 300%" },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
