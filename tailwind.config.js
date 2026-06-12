/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
