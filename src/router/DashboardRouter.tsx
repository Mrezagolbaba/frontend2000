import ProtectedRoute from "./ProtectedRoute";
import { WalletList } from "pages/dashboard/wallet";
import Setting from "pages/dashboard/setting";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";
import BuySell from "pages/dashboard/buySell";
import Profile from "pages/dashboard/profile";
import Invoice from "pages/dashboard/invoice";
import Orders from "pages/dashboard/orders";
import { TransactionList } from "pages/dashboard/transactions";
import Support from "pages/dashboard/support";
import Market from "pages/dashboard/market";
import History from "pages/dashboard/history";
import PaymentRecipt from "pages/dashboard/payment-receipt";

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
      element: <ProtectedRoute children={<WalletList />} />,
    },
    {
      path: "setting",
      element: <ProtectedRoute children={<Setting />} />,
    },
    {
      path: "buy-sell",
      element: <ProtectedRoute children={<BuySell />} />,
    },
    {
      path: "invoice",
      element: <ProtectedRoute children={<Invoice />} />,
    },
    {
      path: "orders",
      element: <ProtectedRoute children={<Orders />} />,
    },
    {
      path: "transactions",
      element: <ProtectedRoute children={<TransactionList />} />,
    },
    {
      path: "support",
      element: <ProtectedRoute children={<Support />} />,
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
      path:"payment-receipt/:id",
      element:<ProtectedRoute children={<PaymentRecipt />} />
    }
  ],
};

export default DashboardRouter;
