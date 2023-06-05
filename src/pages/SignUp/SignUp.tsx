import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginUserFailure,
  loginUserStart,
  signUserUp,
} from "../../reducers/userReducer";
import authService from "../../service/auth";
import { setSnack } from "../../reducers/snackbarReducer";

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

interface TextFields {
  name: string;
  email: string;
  key: string;
  secret: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textFields, setTextFields] = useState<TextFields>({
    name: "",
    email: "",
    key: "",
    secret: "",
  });

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setTextFields((prevTextFields) => ({
      ...prevTextFields,
      [name]: value,
    }));
  };

  function handleClick() {
    dispatch(loginUserStart(true));
    authService
      .createNewUser({
        url: "signup",
        method: "POST",
        data: textFields,
      })
      .then((a: any) => {
        dispatch(loginUserFailure(false));
        if (a?.isOk) {
          dispatch(setSnack({ title: "Signed up", color: "success" }));
        } else {
          dispatch(
            setSnack({ title: a?.response?.data?.message, color: "error" }),
          );
        }
        return a;
      })
      .then((a: any) => dispatch(signUserUp(a.data)));
  }

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
      <TextField
        id="outlined-password-input"
        label="Name"
        type="text"
        name="name"
        autoComplete="current-password"
        value={textFields.name}
        onChange={handleTextFieldChange}
      />
      <TextField
        id="outlined-password-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="current-password"
        value={textFields.email}
        onChange={handleTextFieldChange}
      />
      <FormControl sx={{ width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Key</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showKey ? "text" : "password"}
          name="key"
          value={textFields.key}
          onChange={handleTextFieldChange}
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
      <FormControl sx={{ width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Secret</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showSecret ? "text" : "password"}
          name="secret"
          value={textFields.secret}
          onChange={handleTextFieldChange}
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
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        variant="outlined"
        size="large"
        sx={{ width: "26.5ch", height: "56px" }}
      >
        <span>Sign Up</span>
      </LoadingButton>
    </TabPanel>
  );
};

export default SignUp;
