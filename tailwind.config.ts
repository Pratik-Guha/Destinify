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
        'black-100': '#121212',
      'primary-blue-100': '#2563eb', // Example
      'light-white': '#f9f9f9',
      },
    },
  },
   darkMode: "class",
  plugins: [],
} satisfies Config;
