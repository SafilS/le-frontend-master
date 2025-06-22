/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            luxury: {
                amber: '#D4AF37',
                gold: '#C19A6B',
                cream: '#F9F5EB',
                charcoal: '#333333',
            }
        },
        fontFamily: {
            serif: ['Playfair Display', 'serif'],
            sans: ['Montserrat', 'sans-serif'],
        },
        boxShadow: {
            luxury: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        animation: {
            'pulse-down': 'pulseDown 1.5s infinite ease-in-out',
        },
        keyframes: {
            pulseDown: {
                '0%, 100%': { transform: 'translateY(0)', opacity: '0.8' },
                '50%': { transform: 'translateY(10px)', opacity: '1' },
            }
        },
        screens: {
        '3xl': '1920px',
        },
    }
  },
  plugins: [],
};