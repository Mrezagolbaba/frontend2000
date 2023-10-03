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
import Setting from "pages/setting";
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
import ComingSoon from "pages/ComingSoon";
import DashboardRouter from "./DashboardRouter";

export default function AppRouter() {
  return (
    <Router>
      <Refine
        dataProvider={dataProvider(
          process.env.REACT_APP_BASE_URL as string,
          request as any
        )}
        routerProvider={routerProvider}
        resources={[
          {
            name: "wallet",
            list: "/wallet",
            create: "/wallet/create",
          },
          {
            name: "transactions",
            list: "/transactions",
            create: "/wallets/create",
          },
        ]}
      >
        <Routes>
          <Route path="wallet">
            <Route index element={<WalletList />} />
            {/* <Route path="create" element={<Wallet />} /> */}
          </Route>
          <Route path="transactions">
            <Route index element={<TransactionList />} />
          </Route>
          {/* <Route path="categories">
            <Route index element={<Transactions />} />
            <Route path="show/:id" element={<Transactions />} />
          </Route> */}
        </Routes>
      </Refine>
      <Routes>
        {/* Define your routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-email" element={<LoginEmailPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/email-otp" element={<OtpEmail />} />
        <Route path="/mobile-otp" element={<OtpMobile />} />
        <Route path="/forget-password" element={<ForgetPasswordWithMobile />} />
        <Route
          path="/forget-password-with-email"
          element={<ForgetPasswordWithEmail />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<CoinPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute children={<Dashboard />} />}
        />
        {/* <Route
          path="/wallet"
          element={<ProtectedRoute children={<Wallet />} />}
        />
        <Route
          path="/transactions/:id"
          element={<ProtectedRoute children={<Transactions />} />}
        /> */}
        <Route
          path="/setting"
          element={<ProtectedRoute children={<Setting />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute children={<Orders />} />}
        />
        <Route
          path="/notification"
          element={<ProtectedRoute children={<Notifications />} />}
        />
        <Route
          path="/history"
          element={<ProtectedRoute children={<History />} />}
        />
        <Route
          path="/add-friends"
          element={<ProtectedRoute children={<AddFriends />} />}
        />
        <Route
          path="/transactions-invoice"
          element={<ProtectedRoute children={<Invoices />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path="/support"
          element={<ProtectedRoute children={<Support />} />}
        />
        <Route
          path="/fast-buy-sell"
          element={<ProtectedRoute children={<BuySell />} />}
        />
        <Route
          path="/information"
          element={<ProtectedRoute children={<Information />} />}
        />
        <Route
          path="/market"
          element={<ProtectedRoute children={<Market />} />}
        />
        // {/* Add a 404 route for pages that don't exist */}
        // {/* <Route path="*" element={<NotFoundPage />} /> */}
        //{" "}
        {/* {showAddToHomeSheet && <AddToHomeBottomSheet isOpen={true} onClose={handleCloseAddToHomeSheet} />} */}
        //{" "}
      </Routes>
    </Router>
  );
}
