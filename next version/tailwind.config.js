/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        hijauGelap: '#285430',
        hijauTerang: '#5F8D4E',
        merah: '#FF706F',
        kuning: '#FED597',
        title: '#181C32',
        abu: '#C9C9C9',
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
