/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import AccountLayout from "../layouts/account";
// import ProtectedRoute from "./ProtectedRoute"
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import Settings from "../pages/settings";
import Preferences from "../pages/preferences";
import Logout from "../pages/logout";
import Articles from "../pages/articles";
import Matches from "../pages/matches";
import ArticleContainer from "../pages/articles/ArticleContainer";
import ArticleDetails from "../pages/articles_details/ArticleDetails";
import MatchesContainer from "../pages/matches/MatcheContainer";
import MatchDetails from "../pages/match_details/MatchDetails";
import ArticleDetailsContainer from "../pages/articles_details/ArticleDetailsContainer";
import NewPreferences from "../pages/preferences/NewPreferences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="account" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "account",
    element: <AccountLayout />,
    children: [
      {
        path: "news",
        children: [
          { index: true, element: <Articles /> },
          {
            path: ":articleID",
            children: [{ index: true, element: <ArticleDetails /> }],
          },
        ],
      },
      {
        path: "matches",
        children: [
          { index: true, element: <Matches /> },
          {
            path: ":matchID",
            children: [{ index: true, element: <MatchDetails /> }],
          },
        ],
      },
      {
        path: "preferences",
        element: <Preferences />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
