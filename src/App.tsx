import { StyledEngineProvider, CssBaseline } from "@mui/material";
import AuthProvider from "./Auth/AuthProvider";
import Routes from "./routes";
import SnackbarComponent from "./components/SnackbarComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Comfortaa, sans-serif", // Comforta yazı tipi veya başka bir yazı tipi adı
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
        <SnackbarComponent />
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default App;
