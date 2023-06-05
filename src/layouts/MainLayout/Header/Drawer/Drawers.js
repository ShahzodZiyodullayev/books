// material-ui
import {
  SwipeableDrawer,
  Typography,
  Box,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Person, Logout } from "@mui/icons-material";

// thirty-party
import { Link, useLocation, useNavigate } from "react-router-dom";

// component import

// styles
import "./index.css";

// static-data

const Drawers = ({ open, toggleDrawer, user, handleCloseNavMenu }) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { logout } = useAuth();

  //   const LogoutFunc = async () => {
  //     try {
  //       await logout();
  //       if (location.pathname === "/") {
  //         navigate(0);
  //       } else {
  //         navigate("/");
  //       }
  //     } catch (error) {}
  //   };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <SwipeableDrawer
      container={container}
      variant="temporary"
      anchor={"right"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      className="linkBox"
      sx={{
        ".MuiDrawer-paper": {
          p: 3,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          width: "auto",
          minWidth: "40%",
        },
      }}
    >
      <Box>
        <MenuItem
          sx={{
            "&:hover": {
              background: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar>Sh</Avatar>
            <Typography variant="body1" fontWeight={700} my={1}>
              {user && user.name ? user.name : "User name"}
            </Typography>
          </Box>
        </MenuItem>
        <Link to="profile" style={{ textDecoration: "none", color: "#000" }}>
          <MenuItem onClick={handleCloseNavMenu}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            profile
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem
        // onClick={LogoutFunc}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          logout
        </MenuItem>
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawers;
