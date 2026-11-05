/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F9F6F0",
          surface: "#FFFFFF",
          subtle: "#F2ECE1",
          border: "#E2D8C3",
          deep: "#D9CCA8",
        },
        ink: {
          DEFAULT: "#222222",
          muted: "#6B6158",
          faint: "#8C8275",
        },
        paperDark: {
          DEFAULT: "#181614",
          surface: "#221F1B",
          subtle: "#2C2823",
          border: "#3B352E",
          deep: "#0E0D0C",
        },
        inkDark: {
          DEFAULT: "#EDE8DF",
          muted: "#A3998E",
          faint: "#70675C",
        },
      },
      fontFamily: {
        dm: ["DMSans_400Regular"],
        "dm-medium": ["DMSans_500Medium"],
        "dm-bold": ["DMSans_700Bold"],
      },
    },
  },
  plugins: [],
};
