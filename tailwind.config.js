 module.exports = {
  mode: 'jit',
  content: [
    './templates/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './templates/base.html',
  ],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ]
};