import React, { lazy } from "react"; //  { useState }
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Authentication
const LoginPage = lazy(() => import("pages/auth/signin"));
const SignupPage = lazy(() => import("pages/auth/signup"));
const OtpEmail = lazy(() => import("pages/auth/otp/OtpEmail"));
const OtpMobile = lazy(() => import("pages/auth/otp/OtpMobile"));
const Information = lazy(() => import("pages/auth/information"));
const Forget = lazy(() => import("pages/auth/forget"));

//dashboard
const Dashboard = lazy(() => import("pages/dashboard"));

const Wallet = lazy(() => import("pages/wallet"));
const Transactions = lazy(() => import("pages/transactions"));
const Setting = lazy(() => import("pages/setting"));
const Orders = lazy(() => import("pages/orders"));
const Notifications = lazy(() => import("pages/notifications"));
const History = lazy(() => import("pages/history"));
const AddFriends = lazy(() => import("pages/add-friends"));
const Invoices = lazy(() => import("pages/invoices"));
const Profile = lazy(() => import("pages/profile"));
const Support = lazy(() => import("pages/support"));
const BuySell = lazy(() => import("pages/buySell"));
const Market = lazy(() => import("pages/market"));
const AppRouter: React.FC = () => {
  // const [showAddToHomeSheet, setShowAddToHomeSheet] = useState(isMobile && !window.matchMedia('(display-mode: standalone)').matches);

  // const handleCloseAddToHomeSheet = () => {
  //   setShowAddToHomeSheet(false);
  // };
  const user = true;
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/otpEmail" element={<OtpEmail />} />
        <Route path="/otpMobile" element={<OtpMobile />} />
        <Route path="/forget" element={<Forget />} />
        <Route
          path="/"
          element={<ProtectedRoute children={<Dashboard />} user={user} />}
        />
        <Route
          path="/wallet"
          element={<ProtectedRoute children={<Wallet />} user={user} />}
        />
        <Route
          path="/transactions/:id"
          element={<ProtectedRoute children={<Transactions />} user={user} />}
        />
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
