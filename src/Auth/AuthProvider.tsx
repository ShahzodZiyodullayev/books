import { useEffect, ReactNode } from "react";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { isUserLoggedIn } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface IsLoadingState {
  auth: { isLoading: boolean; user: any };
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading, user } = useSelector(
    (state: IsLoadingState) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          dispatch(isUserLoggedIn(true));
          navigate("/");
        } else {
          dispatch(isUserLoggedIn(false));
        }
      } catch (err) {
        dispatch(isUserLoggedIn(false));
      }
    })();
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
