import { useLocation, useRoutes } from "react-router-dom";
import LoginPage from "pages/auth/signin";
import SignupPage from "pages/auth/signup";
import OTP from "pages/auth/otp/index";
import ForgetPassword from "pages/auth/forget-password";
import ResetPassword from "pages/auth/forget-password/ResetPassword";

import HomePage from "pages/Home";
import Information from "pages/auth/information";

import CoinPage from "pages/coins";
import DashboardRouter from "./DashboardRouter";
import ComingSoon from "pages/ComingSoon";
import ContactUs from "pages/contact-us";
import RulesPage from "pages/rules";
import AboutUs from "pages/about-us";
import { useEffect } from "react";
import { getTitlePage } from "helpers";

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitlePage(location.pathname);
  }, [location.pathname]);
  return useRoutes([
    {
      path: "/",
      // element: <HomePage />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <SignupPage /> },
        { path: "otp", element: <OTP /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "coins", element: <CoinPage /> },
        { path: "information", element: <Information /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "terms", element: <RulesPage /> },
        DashboardRouter,
      ],
    },
  ]);
}
