module.exports = {
  mode: "jit",
  content: [
    "./templates/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./templates/base.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        worksans: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
