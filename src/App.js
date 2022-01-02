import "./App.css";
import SiteLayout from "./components/SiteLayout";
import { Provider } from "react-redux";
import { store } from "./actions/store";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Theme Design by Suvraneel:
// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=0c0077&secondary.color=FDD835&secondary.text.color=0C031A
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
      default: "#060314",
      paper: "#060314",
      contrastText: "#fdd835",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
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

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="xl" sx={{ m: 4, width: "95%" }}>
        <ThemeProvider theme={theme}>
          <SiteLayout />
        </ThemeProvider>
      </Container>
    </Provider>
  );
}

export default App;
