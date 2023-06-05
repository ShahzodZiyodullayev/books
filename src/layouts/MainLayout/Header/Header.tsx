import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// material-ui
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Person, Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

// thirty-party
import Drawers from "./Drawer/Drawers";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../../service/auth";
import { loginUserOut, loginUserStart } from "../../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

// component import
// import useAuth from "../../../hooks/useAuth";

// static-data

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state: { auth: { user: any } }) => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [state, setState] = useState(false);
  const open = Boolean(anchorEl);
  const xs = useMediaQuery(theme.breakpoints.up("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isLg && isLg === true) {
      setState(false);
    }
  }, [isLg]);

  const LogoutFunc = () => {
    dispatch(loginUserOut());
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const handleCloseNavMenu = () => {
    setState(false);
  };

  return (
    <>
      <Drawers
        open={state}
        toggleDrawer={toggleDrawer}
        handleCloseNavMenu={handleCloseNavMenu}
        user={user}
      />
      <AppBar
        position="relative"
        sx={{
          boxShadow: "0 0 30px -10px #999",
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(15px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Grid>
              <Typography
                variant="h3"
                noWrap
                fontWeight={600}
                sx={{ mr: { xs: 2, md: 0 } }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    width: "max-content",
                  }}
                >
                  {xs ? "Books" : "B"}
                </Link>
              </Typography>
            </Grid>
            <Stack direction="row" spacing={4}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  (isPending ? "pending " : isActive ? "active " : "") +
                  "navlink"
                }
              >
                <Typography variant="button" color="inherit">
                  My books
                </Typography>
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive, isPending }) =>
                  (isPending ? "pending " : isActive ? "active " : "") +
                  "navlink"
                }
              >
                <Typography variant="button" color="inherit">
                  Search books
                </Typography>
              </NavLink>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ p: 0 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar>
                    {user && user.name ? user.name[0] : "User name"}
                  </Avatar>
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    minWidth: 200,
                    bgcolor: "#fff",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
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
                    <Avatar>
                      {user && user.name ? user.name[0] : "User name"}
                    </Avatar>
                    <Typography variant="body1" fontWeight={700} my={1}>
                      {user && user.name ? user.name : "User name"}
                    </Typography>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={LogoutFunc}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  logout
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
