module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        green: {
          200:'#02eff7',
          100:'#92f394'
        },
        yellow: {
          200: '#ffec0c'
        },
        pink: {
          200: '#fd0a76'
        },
        orange: {
          200: "#ff775a"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
