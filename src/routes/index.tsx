/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import AccountLayout from "../layouts/account";
// import ProtectedRoute from "./ProtectedRoute"
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
// import Settings from "../pages/settings";
import Preferences from "../pages/preferences";
import Logout from "../pages/logout";
import Articles from "../pages/articles";
import Matches from "../pages/matches";
import ArticleDetails from "../pages/articles_details/ArticleDetails";
import MatchDetails from "../pages/match_details/MatchDetails";
import ChangePasswordIndex from "../pages/changepassword";
import NotFound from "../pages/NotFound";
import FavoritesIndex from "../pages/favorites";
import ArticleDetailsIndex from "../pages/articles_details";
import ProfileIndex from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";

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
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileIndex />
          </ProtectedRoute>
        ),
      },

      {
        path: "changePassword",
        element: (
          <ProtectedRoute>
            <ChangePasswordIndex />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "favorites",
    element: (
      <ProtectedRoute>
        <FavoritesIndex />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "news",
        children: [
          {
            path: ":articleID",
            element: <ArticleDetailsIndex />,
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
        path: "changePassword",
        element: <ChangePasswordIndex />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
