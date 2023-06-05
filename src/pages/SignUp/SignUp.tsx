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
import { useDispatch } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  loginUserFailure,
  loginUserStart,
  signUserUp,
} from "../../reducers/userReducer";
import authService from "../../service/auth";
import { setSnack } from "../../reducers/snackbarReducer";
import "./style.css";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
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

const SignUp = () => {
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
    <TabPanel value={1} index={1}>
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
            .createNewUser({
              url: "signup",
              method: "POST",
              data: values,
            })
            .then((a: any) => {
              dispatch(loginUserFailure(false));
              if (a?.isOk) {
                dispatch(setSnack({ title: "Signed up", color: "success" }));
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
            .then((a: any) => dispatch(signUserUp(a.data)));
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={3} direction="column">
              <Box>
                <FormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Name"
                  />
                </FormControl>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="errorMessage"
                />
              </Box>
              <Box>
                <FormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                  />
                </FormControl>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="errorMessage"
                />
              </Box>
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
                  Sign up
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </TabPanel>
  );
};

export default SignUp;
