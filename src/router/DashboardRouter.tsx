import ProtectedRoute from "./ProtectedRoute";
import Wallet from "pages/dashboard/wallet";
import Setting from "pages/dashboard/setting";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";
import Exchange from "pages/dashboard/exchange";
import Profile from "pages/dashboard/profile";
import Invoice from "pages/dashboard/invoice";
import Orders from "pages/dashboard/orders";
import Support from "pages/dashboard/support";
import Market from "pages/dashboard/market";
import History from "pages/dashboard/history";
import PaymentRecept from "pages/dashboard/paymentReceipt";
import SupportDetails from "pages/dashboard/support/detail";
import AddFriends from "pages/dashboard/add-friends";
import Deposit from "pages/dashboard/wallet/Deposit";
import Withdraw from "pages/dashboard/wallet/Withdraw";
import { Navigate } from "react-router-dom";

const DashboardRouter = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    {
      path: "",
      element: <ProtectedRoute children={<DashboardContent />} />,
    },
    {
      path: "profile",
      element: <ProtectedRoute children={<Profile />} />,
    },
    {
      path: "wallet",
      children: [
        {
          path: "",
          element: <ProtectedRoute children={<Wallet />} />,
        },
        {
          path: "deposit/:type",
          element: <ProtectedRoute children={<Deposit />} />,
        },
        {
          path: "withdraw/:type",
          element: <ProtectedRoute children={<Withdraw />} />,
        },
        {
          path: "deposit",
          element: <Navigate to="/dashboard/wallet/deposit/irt" />,
        },
        {
          path: "withdraw",
          element: <Navigate to="/dashboard/wallet/withdraw/irt" />,
        },
      ],
    },
    {
      path: "setting",
      element: <ProtectedRoute children={<Setting />} />,
    },
    {
      path: "exchange",
      element: <ProtectedRoute children={<Exchange />} />,
    },
    {
      path: "invoice/:id",
      element: <ProtectedRoute children={<Invoice />} />,
    },
    {
      path: "orders",
      element: <ProtectedRoute children={<Orders />} />,
    },
    {
      path: "support",
      element: <ProtectedRoute children={<Support />} />,
    },
    {
      path: "support/details/:id",
      element: <ProtectedRoute children={<SupportDetails />} />,
    },
    {
      path: "market",
      element: <ProtectedRoute children={<Market />} />,
    },
    {
      path: "history",
      element: <ProtectedRoute children={<History />} />,
    },
    {
      path: "payment-receipt",
      element: <ProtectedRoute children={<PaymentRecept />} />,
    },
    {
      path: "add-friends",
      element: <ProtectedRoute children={<AddFriends />} />,
    },
  ],
};

export default DashboardRouter;
