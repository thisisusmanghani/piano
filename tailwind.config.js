/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#10b981', // Emerald 500
                    dark: '#059669',    // Emerald 600
                    glow: 'rgba(16, 185, 129, 0.4)',
                },
                bg: {
                    body: '#09090b',    // Zinc 950
                    card: '#181818',    // Zinc 900
                    surface: '#272727', // Zinc 800
                },
                border: {
                    DEFAULT: '#27272a', // Zinc 800
                    highlight: '#3f3f46', // Zinc 700
                },
                text: {
                    main: '#f4f4f5',    // Zinc 100
                    muted: '#a1a1aa',   // Zinc 400
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
