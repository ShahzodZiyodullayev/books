import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../../service/auth";
import { useDispatch } from "react-redux";
import {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} from "../../reducers/userReducer";
import { setSnack } from "../../reducers/snackbarReducer";
import "./style.css";

const Schema = Yup.object().shape({
  key: Yup.string().required("Key is required"),
  secret: Yup.string().required("Secret is required"),
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const handleClickShowKey = () => setShowKey((show: any) => !show);

  const handleMouseDownKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowSecret = () => setShowSecret((show: any) => !show);

  const handleMouseDownSecret = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <TabPanel value={0} index={0}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          key: "",
          secret: "",
        }}
        enableReinitialize
        validationSchema={Schema}
        onSubmit={async (values) => {
          dispatch(loginUserStart(true));
          authService
            .getUser({ url: "myself", method: "GET", body: values })
            .then((a: any) => {
              dispatch(loginUserFailure(false));
              if (a?.isOk) {
                dispatch(setSnack({ title: "Signed in", color: "success" }));
              } else {
                dispatch(
                  setSnack({
                    title: a?.response?.data?.message,
                    color: "error",
                  }),
                );
              }
              return a;
            })
            .then((a) => a?.data && dispatch(loginUserSuccess(a.data)));
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <Box>
                <FormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Key
                  </InputLabel>
                  <OutlinedInput
                    // id="outlined-adornment-password"
                    type={showKey ? "text" : "password"}
                    name="key"
                    value={values.key}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowKey}
                          onMouseDown={handleMouseDownKey}
                          edge="end"
                        >
                          {showKey ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Key"
                  />
                </FormControl>
                <ErrorMessage
                  name="key"
                  component="div"
                  className="errorMessage"
                />
              </Box>
              <Box>
                <FormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Secret
                  </InputLabel>
                  <OutlinedInput
                    // id="outlined-adornment-password"
                    type={showSecret ? "text" : "password"}
                    name="secret"
                    value={values.secret}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowSecret}
                          onMouseDown={handleMouseDownSecret}
                          edge="end"
                        >
                          {showSecret ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Secret"
                  />
                </FormControl>
                <ErrorMessage
                  name="secret"
                  component="div"
                  className="errorMessage"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  sx={{
                    height: "56px",
                    boxShadow: "none",
                  }}
                >
                  Sign in
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </TabPanel>
  );
};

export default SignIn;
