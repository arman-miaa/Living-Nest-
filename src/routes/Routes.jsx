import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
        element: <MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'logIn',
                element: <LogIn></LogIn>,
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>,
            },
    ],
  },
]);



export default router;
