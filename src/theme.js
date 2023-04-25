import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#FF8C00', // custom primary color
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