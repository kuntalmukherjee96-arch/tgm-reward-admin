/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tinitri: {
          primary: '#3b82f6', // Tinitri Blue
          secondary: '#1e40af', // Deep Blue
          accent: '#10b981', // Success Green
          warning: '#f59e0b', // Alert Yellow
          danger: '#ef4444', // Critical Red
          dark: '#0f172a', // Admin Background
          light: '#f8fafc', // User Background
          panel: '#1e293b' // Card/Panel Background
        }
      },
    },
  },
  plugins: [],
};