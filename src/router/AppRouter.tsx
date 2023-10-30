import React, { lazy } from "react"; //  { useState }

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "pages/auth/signin";
import LoginEmailPage from "pages/auth/signin/EmailSignin";
import SignupPage from "pages/auth/signup";
import OtpEmail from "pages/auth/otp/OtpEmail";
import OtpMobile from "pages/auth/otp/OtpMobile";
import ForgetPasswordWithMobile from "pages/auth/reset-password/WithMobile";
import ForgetPasswordWithEmail from "pages/auth/reset-password/WithEmail";
import ResetPassword from "pages/auth/reset-password/ResetPassword";

import HomePage from "pages/Home";
import Dashboard from "pages/dashboard";
import { WalletList } from "pages/dashboard/wallet";
import { TransactionList } from "pages/transactions";
import Setting from "pages/dashboard/setting";
import Orders from "pages/orders";
import Notifications from "pages/notifications";
import History from "pages/history";
import AddFriends from "pages/add-friends";
import Invoices from "pages/invoices";
import Profile from "pages/profile";
import Support from "pages/support";
import BuySell from "pages/buySell";
import Information from "pages/auth/information";
import Market from "pages/market";
import request from "services/adapter";
import CoinPage from "pages/coins";
import DashboardRouter from "./DashboardRouter";
import ComingSoon from "pages/ComingSoon";

export default function AppRouter() {

  return useRoutes([
    {
      path: "/",
      // element: <HomePage />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "/login-email", element: <LoginEmailPage /> },
        { path: "register", element: <SignupPage /> },
        { path: "mobile-otp", element: <OtpMobile /> },
        { path: "email-otp", element: <OtpEmail /> },
        { path: "/forget-password", element: <ForgetPasswordWithMobile /> },
        {
          path: "/forget-password-with-email",
          element: <ForgetPasswordWithEmail />,
        },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "coins", element: <CoinPage /> },
        { path: "information", element: <Information /> },
        { path: "/coming-soon", element: <ComingSoon /> },
        DashboardRouter,
      ],
    },
  ]);
}
