module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "3/4vw": "75vw",
        "1/2vw": "50vw",
        "1/4vw": "25vw",
      },
      height: {
        "3/4vh": "75vh",
        "1/2vh": "50vh",
        "1/4vh": "25vh",
      },
      boxShadow: {
        'custom': '3px 3px 5px rgba(0, 0, 0, 0.4)',
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require("flowbite/plugin")],
};
