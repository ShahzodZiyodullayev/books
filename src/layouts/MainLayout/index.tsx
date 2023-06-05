// material-ui
import { CssBaseline, Box } from "@mui/material";

// thirty-party
import { Outlet } from "react-router-dom";

// component import
import Header from "./Header/Header";

const MainLayout = () => {
  return (
    <Box minHeight="100vh">
      <CssBaseline />
      <Header />
      <Box
        sx={{
          // height: "100%",
          bgcolor: "#f2f4f5",
          display: "flex",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
