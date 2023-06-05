import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Back from "../../assets/back.jpg";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        p: 4,
      }}
    >
      <img
        src={require("../../assets/back.jpg")}
        alt="background"
        style={{
          objectFit: "cover",
          position: "absolute",
          width: "inherit",
          height: "inherit",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Grid
        item
        md={5}
        sm={7}
        xs={12}
        sx={{
          borderRadius: 4,
          boxShadow: "0 0 50px -10px #999",
          display: "flex",
          flexFlow: "column",
          background: "#E5E5E5",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Link
                  to="/signin"
                  style={{
                    width: "100%",
                    height: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Sign In
                </Link>
              }
              {...a11yProps(0)}
              sx={{ p: 0 }}
            />
            <Tab
              label={
                <Link
                  to="/signup"
                  style={{
                    width: "100%",
                    height: "100%",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Sign up
                </Link>
              }
              {...a11yProps(1)}
              sx={{ p: 0 }}
            />
          </Tabs>
        </Box>
        <Outlet />
      </Grid>
    </Grid>
  );
}
