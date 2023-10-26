// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: true,
// }
const theme = {
    config:{
        initialColorMode:"dark",
        useSystemColorMode:true,
    },
    // breakpoints,
    styles:{
        
    },
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Roboto', sans-serif`,
      },
};
// 3. extend the theme


export default extendTheme(theme)