import { Navigate, useLocation, useRoutes } from "react-router-dom";
import Login from "pages/auth/signin";
import Register from "pages/auth/signup";
import OTP from "pages/auth/otp/index";
import ForgetPassword from "pages/auth/forget-password";
import ResetPassword from "pages/auth/forget-password/ResetPassword";

import HomePage from "pages/Home";
import NotFound from "pages/not-found";
import Information from "pages/auth/information";

import CoinPage from "pages/coins";
import DashboardRouter from "./DashboardRouter";
import ComingSoon from "pages/ComingSoon";
import ContactUs from "pages/contact-us";
import RulesPage from "pages/rules";
import AboutUs from "pages/about-us";
import { useEffect } from "react";
import { getTitlePage } from "helpers";
import AuthRouter from "./AuthRouter";
import ResponsePage from "pages/dashboard/wallet/Rial/Deposit/DirectDebit/ResponsePage";
import { useAddToHomeScreenPrompt } from "hooks/useAddToHomeScreenPrompt";
import toast from "react-hot-toast";
import { Button } from "reactstrap";
import { isIOS, isMobile, isTablet, isFirefox } from "react-device-detect";

export default function AppRouter() {
  const location = useLocation();
  const [prompt, promptToInstall] = useAddToHomeScreenPrompt();

  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  useEffect(() => {
    document.title = getTitlePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (
      (prompt && (isMobile || isTablet)) ||
      isFirefox ||
      (isIOS && !isInStandaloneMode())
    )
      toast(
        <div>
          <p>برای تجربه کاربری بهتر اپلیکیشن ما را نصب کنید</p>
          <Button color="primary" outline onClick={promptToInstall}>
            نصب
          </Button>
        </div>,
        { position: "bottom-center" },
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return useRoutes([
    {
      path: "/",
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <AuthRouter children={<Login />} /> },
        {
          path: "register",
          element: <AuthRouter children={<Register />} />,
        },
        { path: "otp", element: <AuthRouter children={<OTP />} /> },
        {
          path: "forget-password",
          element: <AuthRouter children={<ForgetPassword />} />,
        },
        {
          path: "reset-password",
          element: <AuthRouter children={<ResetPassword />} />,
        },
        {
          path: "information",
          element: <AuthRouter children={<Information />} />,
        },
        { path: "coins", element: <CoinPage /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "terms", element: <RulesPage /> },
        {
          path: "debit-subscription-finished",
          element: <ResponsePage />,
        },
        {
          path: "404",
          element: <NotFound />,
        },
        DashboardRouter,
        {
          path: "*",
          element: <Navigate to="/404" />,
        },
      ],
    },
  ]);
}
