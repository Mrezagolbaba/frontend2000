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
import ResponsePage from "pages/dashboard/wallet/Rial/Deposit/DirectDebit/ResponsePage";

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
      element: <ProtectedRoute children={<Wallet />} />,
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
    {
      path: "debit-subscription-finished",
      element: <ResponsePage />,
    },
  ],
};

export default DashboardRouter;
