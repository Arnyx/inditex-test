import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f6f6",
    },
    primary: {
      main: "#000",
    },
  },
  cssVariables: true,
});
