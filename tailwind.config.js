/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Just-in-Time mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      myWhite: '#ffffff', // Replace with your desired white color value
      myBlack: '#00171f',
      myMidnight: '#003459', // Assuming #003459 for midnight
      myNavy: '#007ea7',
      mySky: '#00a8e8',
      myPrimary: '#ebf2fa',
      mySecondary: '#427aa1',
      myTertiary: '#064789',
    },
  },
  plugins: [],
}

