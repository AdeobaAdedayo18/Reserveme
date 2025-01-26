import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShowCase from "./pages/ShowCase";
import LocationDetail from "./pages/LocationDetail";
import LocationDetail1 from "./pages/LocationDetail1";
import ReceiptPage from "./pages/ReceiptPage";
import ToastDemo, { StartPage } from "./pages/test";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ToastSimple from "./pages/test";

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
    path: "/receipt",
    element: <ReceiptPage />,
  },
  {
    path: "/test",
    element: <ToastDemo />,
  },
]);
