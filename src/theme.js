// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: true,
// }
const breakpoints = {
    base: '0em', // 0px
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }
const theme = {
    config:{
        initialColorMode:"dark",
        useSystemColorMode:true,
    },
    breakpoints,
    styles:{
 
    },
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Roboto', sans-serif`,
      },
  
   
};
// 3. extend the theme


export default extendTheme(theme)