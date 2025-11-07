/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C4B5FD', // violet-300
        'primary-darker': '#8B5CF6', // violet-500
        'primary-darkest': '#6D28D9', // violet-700
        secondary: '#FEF3C7', // amber-100
        'secondary-darker': '#FCD34D', // amber-300
        'secondary-darkest': '#F59E0B', // amber-500
        accent: '#F472B6', // pink-400
        'accent-darker': '#DB2777', // pink-600
        'accent-darkest': '#9D174D', // pink-700
        'neutral-lightest': '#F9FAFB', // gray-50
        'neutral-light': '#E5E7EB', // gray-200
        'neutral-medium': '#9CA3AF', // gray-400
        'neutral-dark': '#4B5563', // gray-600
        'neutral-darkest': '#1F2937', // gray-800
        success: '#A7F3D0', // green-200
        error: '#FCA5A5', // red-300
        warning: '#FDE68A', // amber-200
        // It's good practice to also define dark mode versions if needed
        // For now, we'll rely on global CSS for dark mode body,
        // but specific components might need dark variants.
        // Example:
        // 'primary-dark': '#A78BFA', // A slightly desaturated/darker violet for dark backgrounds
      }
    },
  },
  plugins: [],
};
