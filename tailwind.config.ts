import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto'", "Arial", "sans-serif"],
        mono: ["'Inter'", "monospace"],
      },
      colors: {
        cednetBlue: '#004D8C',
        cednetWhite: '#FFFFFF',
        cednetBlack: '#000000',
        cednetGray: '#D9D9D9',
        cednetText: '#000000',
        cednetButton: '#0074BD',
        cednetButtonHover: '#005F9D', 
        cednetIcons: '#000000', 
      },
    },
  },
  darkMode: "class",
 plugins: [nextui({
  themes: {
    light: {
      colors: {
        primary: "#D9D9D980",
        secondary: "#0074BDE6",
        background: "#004D8C",
      }
    },
    dark: {
      colors: {
        primary: "#1A202C",
        secondary: "#2D3748",
        background: "#171923",
      }
    }
  }
 })],
}
