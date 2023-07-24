import React from "react"; //  { useState }
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import NotFoundPage from './components/NotFoundPage';
import LoginPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import OtpEmail from "./pages/auth/otp/OtpEmail";
import OtpMobile from "./pages/auth/otp/OtpMobile";
import Dashboard from "./pages/dashboard";
import Wallet from "./pages/wallet";
import Transactions from "./pages/transactions";
import Setting from "./pages/setting";
import Orders from "./pages/orders";
import Notifications from "./pages/notifications";
import History from "./pages/history";
import AddFriends from "./pages/add-friends";
import Invoices from "./pages/invoices";
import Profile from "./pages/profile";
import Support from "./pages/support";
import BuySell from "./pages/buySell";
import Information from "./pages/auth/information";
import Forget from "./pages/auth/forget";
// import AddToHomeBottomSheet from './components/AddToHomeBottomSheet';
// import { isMobile } from 'react-device-detect';
const AppRouter: React.FC = () => {
  // const [showAddToHomeSheet, setShowAddToHomeSheet] = useState(isMobile && !window.matchMedia('(display-mode: standalone)').matches);

  // const handleCloseAddToHomeSheet = () => {
  //   setShowAddToHomeSheet(false);
  // };
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/otpEmail" element={<OtpEmail />} />
        <Route path="/otpMobile" element={<OtpMobile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/history" element={<History />} />
        <Route path="/add-friends" element={<AddFriends />} />
        <Route path="/transactions-invoice" element={<Invoices />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/fast-buy-sell" element={<BuySell />} />
        <Route path="/information" element={<Information />} />
        <Route path="/forget" element={<Forget />} />

        {/* Add a 404 route for pages that don't exist */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* {showAddToHomeSheet && <AddToHomeBottomSheet isOpen={true} onClose={handleCloseAddToHomeSheet} />} */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
