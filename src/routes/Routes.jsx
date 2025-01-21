import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Apartments from "../pages/Apartments";
import Dashboard from "../Layouts/Dashboard";


import UserProfile from "../pages/Dashboard/User/UserProfile";
import PrivateRoute from "./PrivateRoute";
import UserAnnouncements from "../pages/Dashboard/User/UserAnnouncements";
import MemberProfile from "../pages/Dashboard/Member/MemberProfile";
import MemberRoute from "./MemberRoute";
import MakePayment from "../pages/Dashboard/Member/MakePayment";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import MemberAnnouncements from "../pages/Dashboard/Member/MemberAnnouncements";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageMember from "../pages/Dashboard/Admin/ManageMember";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import AgreementRequest from "../pages/Dashboard/Admin/AgreementRequest";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import UserRoute from "./UserRoute";
import Payment from "../pages/Dashboard/Member/Payment";
import Contact from "../pages/Contact";
import Statistics from "../pages/Dashboard/Statistics/Statistics";

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
      {
        path: 'contact',
        element: <Contact/>,
      },
    ],
  },

  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics/>,
    },
      // admin menu
      {
        path: "adminProfile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageMember",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageMember></ManageMember>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MakeAnnouncement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "agreementRequests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AgreementRequest></AgreementRequest>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCoupons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCoupons></ManageCoupons>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // member menu
      {
        // index: true,
        path: 'memberProfile',
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MemberProfile></MemberProfile>
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "makePayment",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MakePayment></MakePayment>
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <Payment></Payment>
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <PaymentHistory></PaymentHistory>
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "memberAnnouncement",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MemberAnnouncements></MemberAnnouncements>
            </MemberRoute>
          </PrivateRoute>
        ),
      },

      // user menu
      {
        path: "userProfile",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UserProfile></UserProfile>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "userAnouncements",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UserAnnouncements></UserAnnouncements>
            </UserRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
