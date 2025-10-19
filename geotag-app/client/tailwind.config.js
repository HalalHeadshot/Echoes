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
        lightMain2:'#d2d2d2ff',
        dlightMain2:'#343434ff',
        slightLightMain:'#f2f2f2ff',
        dslightLightMain:'#131313ff',
        borderColor:'#b5b5b5ff',
        dborderColor:'#414141ff',
        fadeColor:'#dededeff',
        dfadeColor:'#171717ff',
        txt:'black',
        dtxt:'white',
        lightTxt:'#252525ff',
        dlightTxt:'#d0d0d0ff',
        accentMain:'#2daadd',
        darkAccentMain:'#00364bff',
        orangeMain:'#FEAC5E',
        pinkMain:'#C779D0',
        cyanMain:'#4BC0C8',
        dorangeMain:'#fc9b41ff',
        dpinkMain:'#d557e3ff',
        dcyanMain:'#3ed8e3ff',
        lightAccentMain:'#c1dce6ff',
      },
       backgroundImage: {
    'gradient-main': 'linear-gradient(90deg, #fc9b41ff, #d557e3ff, #3ed8e3ff)',
  }
    },
  },
  plugins: [],
};
