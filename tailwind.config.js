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
  },
  plugins: [require("flowbite/plugin")],
};
