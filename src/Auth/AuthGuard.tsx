import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authenticated: boolean = useSelector(
    (state: any) => state.auth.loggedIn,
  );
  const { pathname } = useLocation();

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
