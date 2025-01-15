import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Apartments from "../pages/Apartments";
import Dashboard from "../Layouts/Dashboard";
import AdminMenu from "../pages/Dashboard/Menu/AdminMenu";
import MemberMenu from "../pages/Dashboard/Menu/MemberMenu";
import UserMenu from "../pages/Dashboard/Menu/UserMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "apartments",
        element: <Apartments></Apartments>,
      },
      {
        path: "logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },

  // dashboard
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
    // admin menu
      {
        path: 'admin',
        element: <AdminMenu/>,

      },

      // member menu
      {
        path: 'member',
        element: <MemberMenu/>,

      },

      // user menu
      {
        path: 'user',
        element: <UserMenu/>,

      },
    ],
  },
]);



export default router;
