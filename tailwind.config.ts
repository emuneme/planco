import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#FF7C00', // Construction Orange
          hover: '#e06b00',
        },
        secondary: {
          DEFAULT: '#36A75E', // Safety Green
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        warning: '#FFD700', // Alert Yellow
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
