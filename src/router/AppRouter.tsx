import React from "react"; //  { useState }
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import NotFoundPage from './components/NotFoundPage';
import LoginPage from "../pages/auth/signin";
import SignupPage from "../pages/auth/signup";
import OtpEmail from "../pages/auth/otp/OtpEmail";
import OtpMobile from "../pages/auth/otp/OtpMobile";
import Dashboard from "../pages/dashboard";
import Wallet from "../pages/wallet";
import Transactions from "../pages/transactions";
import Setting from "../pages/setting";
import Orders from "../pages/orders";
import Notifications from "../pages/notifications";
import History from "../pages/history";
import AddFriends from "../pages/add-friends";
import Invoices from "../pages/invoices";
import Profile from "../pages/profile";
import Support from "../pages/support";
import BuySell from "../pages/buySell";
import Information from "../pages/auth/information";
import Forget from "../pages/auth/forget";
import ProtectedRoute from "./ProtectedRoute";
// import AddToHomeBottomSheet from './components/AddToHomeBottomSheet';
// import { isMobile } from 'react-device-detect';
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
          element={<ProtectedRoute children={<Wallet/>} user={user} />}
        />
        <Route
          path="/transactions/:id"
          element={<ProtectedRoute children={<Transactions/>} user={user} />}
        />
        <Route
          path="/setting"
          element={<ProtectedRoute children={<Setting/>} user={user} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute children={<Orders/>} user={user} />}
        />
        <Route
          path="/notification"
          element={<ProtectedRoute children={<Notifications/>} user={user} />}
        />
        <Route
          path="/history"
          element={<ProtectedRoute children={<History/>} user={user} />}
        />
        <Route
          path="/add-friends"
          element={<ProtectedRoute children={<AddFriends/>} user={user} />}
        />
        <Route
          path="/transactions-invoice"
          element={<ProtectedRoute children={<Invoices/>} user={user} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile/>} user={user} />}
        />  
        <Route 
          path="/support" 
          element={<ProtectedRoute children={<Support/>} user={user} />}
        />
        <Route
          path="/buy-sell"
          element={<ProtectedRoute children={<BuySell/>} user={user} />}
        />
        <Route
          path="/information"
          element={<ProtectedRoute children={<Information/>} user={user} />}
        />
        

        {/* Add a 404 route for pages that don't exist */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* {showAddToHomeSheet && <AddToHomeBottomSheet isOpen={true} onClose={handleCloseAddToHomeSheet} />} */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
