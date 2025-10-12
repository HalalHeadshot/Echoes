/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', //enables class-based dark mode

  theme: {
    extend: {
      colors: {
        main: 'white',
        dmain: 'black',
        lightMain:'#edededff',
        dlightMain:'#222222ff',
        borderColor:'#c6c6c6',
        dborderColor:'#414141ff',
        fadeColor:'#dededeff',
        dfadeColor:'#171717ff',
        txt:'black',
        dtxt:'white',
        lightTxt:'#252525ff',
        dlightTxt:'#d0d0d0ff',
        accentMain:'#2daadd',
        darkAccentMain:'#00364bff',
        lightAccentMain:'#c1dce6ff',
      },
    },
  },
  plugins: [],
};
