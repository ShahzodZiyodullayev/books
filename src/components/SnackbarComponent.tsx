// import { forwardRef, useEffect, useState } from "react";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { Snackbar } from "@mui/material";
// import { useSelector } from "react-redux";

// const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const SnackbarComponent = () => {
//   const { snackbar } = useSelector((state: any) => state);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (snackbar.title && snackbar.color) {
//       setOpen(true);
//     }
//   }, [snackbar]);

//   const handleClose = (
//     event?: React.SyntheticEvent | Event,
//     reason?: string,
//   ) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <div>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={snackbar.color}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.title}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default SnackbarComponent;

import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const { snackbar } = useSelector((state: any) => state);

  useEffect(() => {
    if (snackbar.title && snackbar.color) {
      enqueueSnackbar(snackbar.title, { variant: snackbar.color });
    }
  }, [snackbar]);

  return <React.Fragment></React.Fragment>;
}

export default function SnackbarComponent() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
