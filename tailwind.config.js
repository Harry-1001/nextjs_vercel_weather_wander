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
        sunny: 'sunshine 3s ease-in-out infinite',
        rainy: 'rainy 3s ease-in-out infinite',
        cloudy: 'cloudy 3s ease-in-out infinite',
        snowy: 'snowy 3s ease-in-out infinite',
      },
      keyframes: {
        sunshine: {
          '0%': { backgroundColor: '#FFEB3B' }, // 黄色
          '100%': { backgroundColor: '#FF9800' }, // オレンジ
        },
        rainy: {
          '0%': { backgroundColor: '#607d8b' }, // グレー
          '100%': { backgroundColor: '#1a237e' }, // 濃い青
        },
        cloudy: {
          '0%': { backgroundColor: '#bdbdbd' }, // ライトグレー
          '100%': { backgroundColor: '#424242' }, // ダークグレー
        },
        snowy: {
          '0%': { backgroundColor: '#ffffff' }, // 白
          '100%': { backgroundColor: '#cfd8dc' }, // 灰色
        },
      },
    },
  },
  plugins: [],
}

