import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import NotFoundPage from './components/NotFoundPage';
import LoginPage from './auth/signin';
import SignupPage from './auth/signup';
import OtpEmail from './auth/otp/OtpEmail';
import OtpMobile from './auth/otp/OtpMobile';
import Dashboard from './dashboard';
import Wallet from './wallet';
import Transactions from './transactions';
import Setting from './setting';
import Orders from './orders';
import Notifications from './notifications';
import History from './history';
import AddFriends from './add-friends';
import Invoices from './invoices';
import Profile from './profile';
import Support from './support';
import BuySell from './buySell';

const AppRouter: React.FC = () => {
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


        {/* Add a 404 route for pages that don't exist */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
