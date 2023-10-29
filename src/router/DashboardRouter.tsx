import ProtectedRoute from "./ProtectedRoute";
import { WalletList } from "pages/dashboard/wallet";
import DashboardContent from "pages/dashboard/DashboardContent";
import Dashboard from "pages/dashboard";
import BuySell from "pages/dashboard/buySell";

const DashboardRouter = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    {
      path: "",
      element: <ProtectedRoute children={<DashboardContent />} />,
    },
    {
      path: "wallet",
      element: <ProtectedRoute children={<WalletList />} />,
    },
    {
      path: "buy-sell",
      element: <ProtectedRoute children={<BuySell />} />,
    }
  ],
};

export default DashboardRouter;
