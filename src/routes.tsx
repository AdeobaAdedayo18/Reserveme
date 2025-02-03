import { lazy, Suspense } from "react";
import { Oval } from "react-loader-spinner";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LocationDetail1 from "./pages/LocationDetail";
import LoginPage from "./pages/LoginPage";
import Payment from "./pages/Payment";
import ShowCase from "./pages/ShowCase";
import SignupPage from "./pages/SignupPage";
import Test from "./pages/test";

const Loading = () => (
  <Oval
    height="60"
    width="60"
    // radius="9"
    color="black"
    secondaryColor="gray"
    ariaLabel="three-dots-loading"
    // wrapperStyle
    wrapperClass="flex justify-center items-center h-screen"
  />
);

// Lazy-load non-critical pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ReceiptPage = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/ReceiptPage")
);

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
    element: (
      <Suspense fallback={<Loading />}>
        <AdminDashboard />
      </Suspense>
    ),
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
    path: "/receipt/:bookingID",
    element: (
      <Suspense fallback={<Loading />}>
        <ReceiptPage />
      </Suspense>
    ),
  },

  {
    path: "/test",
    element: <Test />,
  },
]);
