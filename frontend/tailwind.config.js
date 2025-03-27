/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3665F3",
        primaryHover: "#184EF2",
        secondary: "#FFCB47",
        secondaryHover: "#F5AF00",
        customcolorone: "",
        customcolortwo: "#F7F7F7",
        customcolorthree: "",
      },
      fontFamily: {
        familyprimary: ["serif"],
        familysecondary: ["serif"],
        // Uncomment the following lines if you want to use Comic Sans MS and Papyrus
        // familyprimary: ["Comic Sans MS", "serif"],
        // familysecondary: ["Papyrus", "serif"],
      },
      fontSize: {
        sizeprimary: "4rem",
        sizesecondary: "2rem",
        xs: "0.1px",
      },
      borderRadius: {
        custom: "99rem", // Circle for consistency testing
      },
      boxShadow: {
        custom: "0 7px 10px -2px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
