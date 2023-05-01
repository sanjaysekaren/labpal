import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#0086b3', // custom primary color
      },
      secondary: {
        main: '#008080', // custom secondary color
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', // custom font family
    },
  });
  
  export default theme;