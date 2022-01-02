import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import Skull from "../assets/skull.gif";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835",
      contrastText: "#ffcc00",
    },
    secondary: {
      main: "#000",
      contrastText: "#ffcc00",
    },
    background: {
      default: "rgba(33,29,59,0.46)",
      paper: "rgba(33,29,59,0.46)",
      contrastText: "#fdd835",
    },
  },
  typography: {
    fontFamily: [
      "Raleway",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function AppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          "& > :not(style)": { my: 1 },
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <img src={Skull} alt="Logo" height="100" />;
        <Typography sx={{ color: "text.primary" }} variant="h3">
          Music Galore
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
