import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#143959",
    },
    primary: {
      main: "#F26457",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F2F2F2",
      contrastText: "#000000",
    },
    info: {
      main: "#3B8C75",
      contrastText: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        h1 {
            color: #FFFFFF;
            text-align: center;
        }
      `,
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      },
    },
  },
});

export default theme;
