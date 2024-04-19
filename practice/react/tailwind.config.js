/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '1280px',
        md: '1440px',
        lg: '1600px',
        xl: '1920px'
      },
      fontSize: {
        sm: ['12px', '20px'],
        base: ['14px', '22px'],
        middle: ['16px', '24px'],
        lg: ['18px', '26px'],
        xl: ['20px', '28px'],
        xxl: ['24px', '32px'],
        '4xl': '2rem',
        '7xl': ['4.75rem', '4.75rem']
      },
    },
  },
  plugins: [],
}