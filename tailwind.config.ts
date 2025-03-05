/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        sunny: "sunshine 3s infinite alternate ease-in-out",
        rainy: "rainy 3s infinite alternate ease-in-out",
        cloudy: "cloudy 3s infinite alternate ease-in-out",
        snowy: "snowy 3s infinite alternate ease-in-out",
      },
      keyframes: {
        sunshine: {
          "0%": { backgroundColor: "#FFEB3B" },
          "100%": { backgroundColor: "#FF9800" },
        },
        rainy: {
          "0%": { backgroundColor: "#607d8b" },
          "100%": { backgroundColor: "#1a237e" },
        },
        cloudy: {
          "0%": { backgroundColor: "#bdbdbd" },
          "100%": { backgroundColor: "#424242" },
        },
        snowy: {
          "0%": { backgroundColor: "#ffffff" },
          "100%": { backgroundColor: "#cfd8dc" },
        },
      },
    },
  },
  plugins: [],
};


