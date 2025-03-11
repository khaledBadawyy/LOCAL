/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./newpage.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#23418F",
        secondary: "#23418F",
        third: "#585F74",
        fourth: "#666666",
        "secondary-500": "rgb(249, 251, 255)",
      },
    },
  },
  plugins: [],
};
