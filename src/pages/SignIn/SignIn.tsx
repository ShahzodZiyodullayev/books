import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import authService from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} from "../../reducers/userReducer";
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
  key: string;
  secret: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state: { auth: { isLoading: boolean } }) => state.auth,
  );
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [textFields, setTextFields] = useState<TextFields>({
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
      .getUser({ url: "myself", method: "GET", body: textFields })
      .then((a: any) => {
        dispatch(loginUserFailure(false));
        if (a?.isOk) {
          dispatch(setSnack({ title: "Signed in", color: "success" }));
        } else {
          dispatch(
            setSnack({ title: a?.response?.data?.message, color: "error" }),
          );
        }
        return a;
      })
      .then((a) => a?.data && dispatch(loginUserSuccess(a.data)));
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
    <TabPanel value={0} index={0}>
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
        loading={isLoading}
        variant="outlined"
        size="large"
        sx={{ width: "26.5ch", height: "56px" }}
      >
        <span>Sign In</span>
      </LoadingButton>
    </TabPanel>
  );
};

export default SignIn;
