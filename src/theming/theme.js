import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#143959",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        h1 {
            color: #FFFFFF;
            text-align: center;
        }`,
    },
  },
});

export default theme;
