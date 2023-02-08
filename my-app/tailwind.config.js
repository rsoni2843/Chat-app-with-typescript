// /** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js.jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  screens: {
    sm: "480px",
    md: "620px",
    lg: "780px",
    xl: "1280px",
  },
  theme: {
    extend: {
      colors: {
        primary: "rgb(127, 16, 183)",
        secondary: "rgb(23, 72, 111)",
        tertiary: "#58118e",
        formBg: "#420b6d",
      },
    },
  },
  plugins: [],
};
