import React, { lazy } from "react"; //  { useState }

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "pages/auth/signin";
import SignupPage from "pages/auth/signup";
import OtpEmail from "pages/auth/otp/OtpEmail";
import OtpMobile from "pages/auth/otp/OtpMobile";
import Forget from "pages/auth/forget";

import HomePage from "pages/Home";
import Dashboard from "pages/dashboard";
import { WalletList } from "pages/wallet";
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

const AppRouter: React.FC = () => {
  // const [showAddToHomeSheet, setShowAddToHomeSheet] = useState(isMobile && !window.matchMedia('(display-mode: standalone)').matches);

  // const handleCloseAddToHomeSheet = () => {
  //   setShowAddToHomeSheet(false);
  // };
  const user = true;

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
        <Route path="/register" element={<SignupPage />} />
        <Route path="/email-otp" element={<OtpEmail />} />
        <Route path="/mobile-otp" element={<OtpMobile />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<CoinPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute children={<Dashboard />} user={user} />}
        />
        {/* <Route
          path="/wallet"
          element={<ProtectedRoute children={<Wallet />} user={user} />}
        />
        <Route
          path="/transactions/:id"
          element={<ProtectedRoute children={<Transactions />} user={user} />}
        /> */}
        <Route
          path="/setting"
          element={<ProtectedRoute children={<Setting />} user={user} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute children={<Orders />} user={user} />}
        />
        <Route
          path="/notification"
          element={<ProtectedRoute children={<Notifications />} user={user} />}
        />
        <Route
          path="/history"
          element={<ProtectedRoute children={<History />} user={user} />}
        />
        <Route
          path="/add-friends"
          element={<ProtectedRoute children={<AddFriends />} user={user} />}
        />
        <Route
          path="/transactions-invoice"
          element={<ProtectedRoute children={<Invoices />} user={user} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} user={user} />}
        />
        <Route
          path="/support"
          element={<ProtectedRoute children={<Support />} user={user} />}
        />
        <Route
          path="/fast-buy-sell"
          element={<ProtectedRoute children={<BuySell />} user={user} />}
        />
        <Route
          path="/information"
          element={<ProtectedRoute children={<Information />} user={user} />}
        />
        <Route
          path="/market"
          element={<ProtectedRoute children={<Market />} user={user} />}
        />

        {/* Add a 404 route for pages that don't exist */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* {showAddToHomeSheet && <AddToHomeBottomSheet isOpen={true} onClose={handleCloseAddToHomeSheet} />} */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
