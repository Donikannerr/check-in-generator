import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import CheckInGenerator from "./components/CheckInGenerator";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4081",
    },
    secondary: {
      main: "#7c4dff",
    },
  },
  typography: {
    h5: {
      fontWeight: "bold",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CheckInGenerator />
    </ThemeProvider>
  );
};

export default App;
