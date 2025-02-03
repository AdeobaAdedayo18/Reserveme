import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

// Create a loading component for Suspense fallback
const Loading = () => <div>Loading...</div>;

// Lazy load all page components
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LocationDetail1 = lazy(() => import("./pages/LocationDetail"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Payment = lazy(() => import("./pages/Payment"));
const ReceiptPage = lazy(() => import("./pages/ReceiptPage"));
const ShowCase = lazy(() => import("./pages/ShowCase"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Test = lazy(() => import("./pages/test"));

// Create a wrapper component to handle Suspense
import { ComponentType } from "react";

const LazyLoader = ({
  lazyComponent: LazyComponent,
}: {
  lazyComponent: ComponentType;
}) => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LazyLoader lazyComponent={LoginPage} />,
  },
  {
    path: "/signup",
    element: <LazyLoader lazyComponent={SignupPage} />,
  },
  {
    path: "/",
    element: <LazyLoader lazyComponent={LandingPage} />,
  },
  {
    path: "/admin",
    element: <LazyLoader lazyComponent={AdminDashboard} />,
  },
  {
    path: "/locations",
    element: <LazyLoader lazyComponent={ShowCase} />,
  },
  {
    path: "/location/:spaceId",
    element: <LazyLoader lazyComponent={LocationDetail1} />,
  },
  {
    path: "/payment-confirmation/:spaceID",
    element: <LazyLoader lazyComponent={Payment} />,
  },
  {
    path: "/receipt/:bookingID",
    element: <LazyLoader lazyComponent={ReceiptPage} />,
  },
  {
    path: "/test",
    element: <LazyLoader lazyComponent={Test} />,
  },
]);
