// import { createTheme } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const journalTheme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
  },
});
