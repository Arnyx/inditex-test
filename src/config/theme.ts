import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
      paper: "#fff",
    },
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
    success: {
      main: "#4CAF50",
      contrastText: "#fff",
    },
  },
  cssVariables: true,
});
