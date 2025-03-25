/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primaries and secondaries to be changed later
        primary: "#3665F3",
        primaryHover: "#184EF2",
        secondary: "#FFCB47",
        secondaryHover: "#F5AF00",

        // custom colors that dont really fit any category but we still need them for consistency, maybe border color or generic names allow us to use them for any purpose
        customcolorone: "",
        customcolortwo: "#F7F7F7",
        customcolorthree: "",
      },

      // Comic Sans MS and Papyrus for consistency testing
      fontFamily: {
        familyprimary: ["serif"],
        familysecondary: ["serif"],
        // familyprimary: ["Comic Sans MS", "serif"],
        // familysecondary: ["Papyrus", "serif"],
      },
      fontSize: {
        sizeprimary: "4rem",
        sizesecondary: "2rem",
        xs: "0.1px",
      },
      borderRadius: {
        custom: "99rem", // circle, for consistency testing
      },
      boxShadow: {
        // custom: "0 7px 10px -2px rgb(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "480px",
      },
    },
    plugins: [],
  },
};
