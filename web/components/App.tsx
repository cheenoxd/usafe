import { SignedInOrRedirect, SignedOut, SignedOutOrRedirect, Provider } from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate, Link } from "react-router";
import { api } from "../api";
import Index from "../routes/index";
import SignedInPage from "../routes/signed-in";
import SignInPage from "../routes/sign-in";
import SignUpPage from "../routes/sign-up";
import NewPerson from "../routes/new-person";
import FullAccount from "../routes/fullaccount";
import ResetPasswordPage from "../routes/reset-password";
import VerifyEmailPage from "../routes/verify-email";
import ChangePassword from "../routes/change-password";
import ForgotPassword from "../routes/forgot-password";
import "./App.css";
import Navbar from "../components/Navbar";
import AlertButton from "../components/AlertButton";
import { useLocation } from "react-router";
import LiveMap from "../routes/LiveMap";

const App = () => {
  useEffect(() => {
    document.title = `${process.env.GADGET_APP}`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect>
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="signed-in"
          element={
            <SignedInOrRedirect>
              <SignedInPage />
            </SignedInOrRedirect>
          }
        />

        <Route
          path="change-password"
          element={
            <SignedInOrRedirect>
              <ChangePassword />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SignedOutOrRedirect>
              <ForgotPassword />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-in"
          element={
            <SignedOutOrRedirect>
              <SignInPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-up"
          element={
            <SignedOutOrRedirect>
              <SignUpPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="new-person"
          element={
            <SignedOutOrRedirect>
              <NewPerson />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="full-account"
          element={
            <SignedOutOrRedirect>
              <FullAccount />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="reset-password"
          element={
            <ResetPasswordPage />
          }
        />
        <Route
          path="verify-email"
          element={
            <VerifyEmailPage />
          }
        />
      </Route>
    )
  );

  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Provider api={api} navigate={navigate} auth={window.gadgetConfig.authentication}>
      <Header />
      <div className="app">
        <div className="app-content">
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
};

const Header = () => {
  const location = useLocation();

  const getAuthLinks = () => {
    if (location.pathname === '/full-account') {
      return null;
    }

    if (location.pathname === '/') {
      return null;
    }
    if (location.pathname === '/sign-in') {
      return (
        <SignedOut>
          <Link to="/sign-up" style={{ color: "white", textDecoration: "none" }}>Sign up</Link>
        </SignedOut>
      );
    }
    if (location.pathname === '/sign-up') {
      return (
        <SignedOut>
          <Link to="/sign-in" style={{ color: "white", textDecoration: "none" }}>Sign in</Link>
        </SignedOut>
      );
    }
    return (
      <SignedOut>
        <Link to="/sign-in" style={{ color: "white", textDecoration: "none" }}>Sign in</Link>
        <Link to="/sign-up" style={{ color: "white", textDecoration: "none" }}>Sign up</Link>
      </SignedOut>
    );
  };

  return (
    <div style={{ background: "red" }} className="header">
      <a href="/" target="_self" rel="noreferrer" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "white" }}>uSafe</h1>
      </a>
      <div className="header-content">
        {getAuthLinks()}
        <Navbar />
      </div>
    </div>
  );
};
export default App;

