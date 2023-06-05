import { Box } from "@mui/material";
import Lottie from "react-lottie";
import data from "../assets/loader.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
};

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: "#fff",
      }}
    >
      <Lottie
        options={defaultOptions}
        width="10%"
        style={{ pointerEvents: "none" }}
      />
    </Box>
  );
};

export default Loader;
