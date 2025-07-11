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
            'xs': '475px',
            '3xl': '1920px',
            '4xl': '2560px',
        },
        fontSize: {
            'xs': ['0.75rem', { lineHeight: '1rem' }],
            'sm': ['0.875rem', { lineHeight: '1.25rem' }],
            'base': ['1rem', { lineHeight: '1.5rem' }],
            'lg': ['1.125rem', { lineHeight: '1.75rem' }],
            'xl': ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
            // Fluid typography - More aggressive scaling
            'fluid-xs': 'clamp(0.75rem, 0.5vw + 0.65rem, 0.875rem)',
            'fluid-sm': 'clamp(0.875rem, 0.5vw + 0.75rem, 1rem)',
            'fluid-base': 'clamp(1rem, 0.8vw + 0.8rem, 1.25rem)',
            'fluid-lg': 'clamp(1.125rem, 1vw + 0.85rem, 1.5rem)',
            'fluid-xl': 'clamp(1.25rem, 1.2vw + 0.9rem, 1.875rem)',
            'fluid-2xl': 'clamp(1.5rem, 1.5vw + 1rem, 2.25rem)',
            'fluid-3xl': 'clamp(1.875rem, 2vw + 1.1rem, 3rem)',
            'fluid-4xl': 'clamp(2.25rem, 2.5vw + 1.2rem, 3.75rem)',
            'fluid-5xl': 'clamp(2.5rem, 3vw + 1.3rem, 4.5rem)',
            'fluid-6xl': 'clamp(3rem, 3.5vw + 1.4rem, 5.5rem)',
            'fluid-7xl': 'clamp(3.5rem, 4vw + 1.5rem, 6.5rem)',
            'fluid-8xl': 'clamp(4rem, 4.5vw + 1.6rem, 7.5rem)',
            'fluid-9xl': 'clamp(4.5rem, 5vw + 1.7rem, 8.5rem)',
        },
        spacing: {
            'fluid-xs': 'clamp(0.5rem, 1vw, 1rem)',
            'fluid-sm': 'clamp(0.75rem, 1.5vw, 1.5rem)',
            'fluid-md': 'clamp(1rem, 2vw, 2rem)',
            'fluid-lg': 'clamp(1.5rem, 3vw, 3rem)',
            'fluid-xl': 'clamp(2rem, 4vw, 4rem)',
            'fluid-2xl': 'clamp(2.5rem, 5vw, 5rem)',
            'fluid-3xl': 'clamp(3rem, 6vw, 6rem)',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
                xl: '2.5rem',
                '2xl': '3rem',
            },
        },
    }
  },
  plugins: [],
};