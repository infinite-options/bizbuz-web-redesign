import { createTheme } from "@mui/material";
import "@fontsource/fira-sans-condensed";
import "@fontsource/fira-sans";
import "@fontsource-variable/inter";

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
    buttonAlternative: {
      main: "#F2F2F2",
      contrastText: "#3B8C75",
    },
  },
  typography: {
    h1: {
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: 32,
      fontWeight: 900,
      fontKerning: "none",
    },
    h2: {
      fontFamily: "'Fira Sans Condensed', sans-serif",
      fontSize: 24,
      fontWeight: 600,
      fontKerning: "none",
    },
    h3: {
      fontFamily: "'Fira Sans Condensed', sans-serif",
      fontSize: 18,
      fontWeight: 600,
      fontKerning: "none",
      color: "white",
    },
    body1: {
      fontFamily: "'Inter Variable', sans-serif",
      fontSize: 12,
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        h1 {
            color: #FFFFFF;
        }
        h2 {
          color: #FFFFFF;
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter Variable', sans-serif",
          height: "56px",
          borderRadius: "10px",
          textTransform: "none",
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter Variable', sans-serif",
          height: "36px",
          borderRadius: "8px",
          textTransform: "none",
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#3B8C75",
          color: "#FFFFFF",
          borderRadius: "10px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: "8px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#143959",
          borderRadius: "10px",
        },
        paper: {
          backgroundColor: "#143959",
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#143959",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
        "&.Mui-disabled": {
          color: "#000000",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "#FFFFFF",
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    // MuiPickersToolbar: {
    //   styleOverrides: {
    //     "&.Mui-selected": {
    //       color: "#F26457",
    //     },
    //   },
    // },
  },
});

export default theme;
