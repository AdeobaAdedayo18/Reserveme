import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import LocationDetail1 from "./pages/LocationDetail1";
import LoginPage from "./pages/LoginPage";
import Payment from "./pages/Payment";
import ReceiptPage from "./pages/ReceiptPage";
import ShowCase from "./pages/ShowCase";
import SignupPage from "./pages/SignupPage";
import Test from "./pages/test";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/locations",
    element: <ShowCase />,
  },
  {
    path: "/location/:spaceId",
    element: <LocationDetail1 />,
  },
  {
    path: "/payment-confirmation/:spaceID",
    element: <Payment />,
  },
  {
    path: "/receipt/:bookingID",
    element: <ReceiptPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);
