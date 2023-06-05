import { lazy } from "react";

// component import
import AuthGuard from "../Auth/AuthGuard";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Loadable from "../components/Loadable";

const MyBooks = Loadable(lazy(() => import("../pages/Home/MyBooks")));
const SearchBook = Loadable(
  lazy(() => import("../pages/SearchBook/SearchBook")),
);
const SignIn = Loadable(lazy(() => import("../pages/SignIn/SignIn")));
const SignUp = Loadable(lazy(() => import("../pages/SignUp/SignUp")));

const MainRoutes = [
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <MyBooks />,
      },
      {
        path: "search",
        element: <SearchBook />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  // { path: "/session/signin", element: <SignIn /> },
  // { path: "/session/register", element: <Registration /> },
  // { path: "/session/404", element: <NotFound /> },
  // { path: "/", element: <NotFound to="dashboard/default" /> },
  // { path: "*", element: <NotFound /> }
];

export default MainRoutes;
