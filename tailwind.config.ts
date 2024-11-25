import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'valentino': {
          '50': '#f6f5f5',
          '100': '#e7e6e6',
          '200': '#d1d0d0',
          '300': '#b1b0af',
          '400': '#898787',
          '500': '#6e6c6c',
          '600': '#5e5d5c',
          '700': '#525151',
          '800': '#454545',
          '900': '#3d3c3c',
          '950': '#262626',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
