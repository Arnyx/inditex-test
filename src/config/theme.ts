import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
  cssVariables: true,
});
