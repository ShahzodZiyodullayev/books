import { StyledEngineProvider, CssBaseline } from "@mui/material";
import AuthProvider from "./Auth/AuthProvider";
import Routes from "./routes";
import SnackbarComponent from "./components/SnackbarComponent";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <AuthProvider>
        <Routes />
        <SnackbarComponent />
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default App;
