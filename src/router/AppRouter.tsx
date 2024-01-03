import { useRoutes } from "react-router-dom";
import LoginPage from "pages/auth/signin";
import LoginEmailPage from "pages/auth/signin/EmailSignin";
import SignupPage from "pages/auth/signup";
import OtpEmail from "pages/auth/otp/OtpEmail";
import OtpMobile from "pages/auth/otp/OtpMobile";
import ForgetPasswordWithMobile from "pages/auth/reset-password/WithMobile";
import ForgetPasswordWithEmail from "pages/auth/reset-password/WithEmail";
import ResetPassword from "pages/auth/reset-password/ResetPassword";

import HomePage from "pages/Home";
import Information from "pages/auth/information";

import CoinPage from "pages/coins";
import DashboardRouter from "./DashboardRouter";
import ComingSoon from "pages/ComingSoon";
import ContactUs from "pages/contact-us";
import RulesPage from "pages/rules";

export default function AppRouter() {
  return useRoutes([
    {
      path: "/",
      // element: <HomePage />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "login-email", element: <LoginEmailPage /> },
        { path: "register", element: <SignupPage /> },
        { path: "mobile-otp", element: <OtpMobile /> },
        { path: "email-otp", element: <OtpEmail /> },
        { path: "forget-password", element: <ForgetPasswordWithMobile /> },
        {
          path: "forget-password-with-email",
          element: <ForgetPasswordWithEmail />,
        },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "coins", element: <CoinPage /> },
        { path: "information", element: <Information /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "rules", element: <RulesPage /> },
        DashboardRouter,
      ],
    },
  ]);
}
