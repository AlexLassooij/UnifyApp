import type { Config } from "tailwindcss";
import { fontFamily }  from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: [
          'Poppins',
          ...fontFamily.sans
        ],
        spartan: [
          'League Spartan',
          ...fontFamily.sans
        ]
      },
      colors: {
        // Configure your brand colors from CSS variables
        primary: 'var(--color-brand-primary)',    // #B3D1DF
        purple: {
          DEFAULT: 'var(--color-brand-purple)',
          light: 'var(--color-brand-purple-light)', // A brighter variant
        },
        secondary: 'var(--color-brand-secondary)', // #66757C
        accent: 'var(--color-brand-accent)',       // #A78BFA
        ocre: 'var(--color-brand-ocre)', // #FFC107
        
        // Text colors
        foreground: 'var(--color-text-default)',   // #191919
        'muted-foreground': 'var(--color-text-muted)', // #666666
        
        // Core UI colors derived from brand colors
        background: 'white',
        card: {
          DEFAULT: 'white',
          foreground: 'var(--color-text-default)'
        },
        popover: {
          DEFAULT: 'white',
          foreground: 'var(--color-text-default)'
        },
        muted: {
          DEFAULT: '#f3f3f3',
          foreground: 'var(--color-text-muted)'
        },
        destructive: {
          DEFAULT: '#ff0000',
          foreground: 'white'
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: 'var(--color-brand-accent)',
        
        // Additional semantic colors
        success: {
          DEFAULT: '#10B981',
          foreground: 'white'
        },
        warning: {
          DEFAULT: 'var(--color-brand-secondary-accent)', // #FFC107
          foreground: '#191919'
        },
        error: {
          DEFAULT: '#EF4444',
          foreground: 'white'
        },
        
        // Create aliases for backwards compatibility
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          accent: 'var(--color-brand-accent)',
          'secondary-accent': 'var(--color-brand-secondary-accent)',
        },
        text: {
          default: 'var(--color-text-default)',
          muted: 'var(--color-text-muted)',
        },
        
        // Chart colors
        chart: {
          '1': 'var(--color-brand-accent)',
          '2': 'var(--color-brand-primary)',
          '3': 'var(--color-brand-secondary)',
          '4': 'var(--color-brand-secondary-accent)',
          '5': '#94A3B8',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} as Config;